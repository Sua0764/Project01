const urlLogout = "http://localhost:8080/user/logout";
const urlTeacher = "";

//연혁 hidden,
//강사진 unhidden

document.querySelector(".teacherBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.remove("hidden");
  document.querySelector(".historyBox").classList.add("hidden");
  document.querySelector(".singleTeacherBox").classList.add("hidden");
  axios
    .get("http://localhost:8080/teacher/all")
    .then((response) => {
      console.log("데이터: ", response);
      displayTeachers(response.data);
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});

function displayTeachers(teacherData) {
  console.log(teacherData.length);
  if (teacherData.length > 0) {
    const teacher = document.querySelector(".teacher");
    teacherData.forEach((data) => {
      const teacherInfo = document.createElement("div");
      teacherInfo.classList.add("teacherInfo");

      const teacherPicture = document.createElement("div");
      teacherPicture.classList.add("teacherPicture");

      const teacherImg = document.createElement("img");
      teacherImg.src = teacherData.img;

      const teacherPictureColor = document.createElement("div");
      teacherPictureColor.classList.add("teacherPictureColor");

      const teacherName = document.createElement("div");
      teacherName.classList.add("teacherName");
      teacherName.textContent = data.teacherName;

      const teacherSubject = document.createElement("div");
      teacherSubject.classList.add("teacherSubject");

      teacher.appendChild(teacherInfo);
      teacherInfo.appendChild(teacherPicture);
      teacherInfo.appendChild(teacherName);
      teacherInfo.appendChild(teacherSubject);
      teacherPicture.appendChild(teacherImg);
      teacherPicture.appendChild(teacherPictureColor);

      teacherInfo.addEventListener("click", () => {
        document.querySelector(".teacherBox").classList.add("hidden");
        document.querySelector(".singleTeacherBox").classList.remove("hidden");
        axios
          .get("http://localhost:8080/teacher/get" + data.teacherId)
          .then((response) => {
            console.log("데이터 : ", response.data);
            //displayTeacher(response.data);
          })
          .catch((error) => {
            console.log("에러발생 : ", error);
          });
      });
    });
  }
}

function displayTeacher(data) {}

//강사진 hidden,
//연혁 unhidden

document.querySelector(".historyBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.add("hidden");
  document.querySelector(".historyBox").classList.remove("hidden");
  document.querySelector(".singleTeacherBox").classList.add("hidden");
});

document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));

    // 클릭된 div에 active 클래스 추가
    div.classList.add("active");
  });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        const userId = response.data.userId;
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");
      } else {
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
}

document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
  if (confirm("로그아웃하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (response.status == 200) {
          alert("로그아웃 되었습니다");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  }
});

sessionCurrent();
