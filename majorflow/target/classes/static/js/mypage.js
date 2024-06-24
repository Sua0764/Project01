const urlLogout = "http://localhost:8080/user/logout";
const urlLectures = "http://localhost:8080/lectures";
const urlMypage = "http://localhost:8080/user";

document.querySelector(".progressBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.add("hidden");
  document.querySelector(".progressBox").classList.remove("hidden");
});

document.querySelector(".myLectureBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.remove("hidden");
  document.querySelector(".progressBox").classList.add("hidden");
  StudyMylectures();
});

sessionCurrent();

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
      if (response.status === 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");

        const userInfo = response.data;
        const userId = response.data.userId;
        const userNickname = response.data.nickname;
        console.log(userInfo);

        let purchasedItems = JSON.parse(
          localStorage.getItem(userId + "_purchased")
        );

        if (purchasedItems && purchasedItems.length > 0) {
          displayMylectures(purchasedItems, userInfo);
        } else {
          document.querySelector(".progress-container").classList.add("noInfo");
          document.querySelector(".progress-container").textContent =
            "구매한 항목이 없습니다.";
        }
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });

  function displayMylectures(items, user) {
    //const progressContainer = document.querySelector(".progress-container");
    const progressTitle = document.createElement("div");
    const progressBox = document.querySelector(".progressBox");

    progressTitle.classList.add("progressTitle");
    progressTitle.textContent = user.userId + "님의 수강신청 현황";
    progressBox.appendChild(progressTitle);

    items.forEach((item) => {
      const progressInfoBox = document.createElement("div");
      const progressTitleBox = document.createElement("div");
      const progressSubjectName = document.createElement("div");
      const progressSubjectInfo = document.createElement("div");
      const progressInfo1 = document.createElement("div");

      progressInfoBox.classList.add("progressInfoBox");
      progressTitleBox.classList.add("progressTitleBox");
      progressSubjectName.classList.add("progressSubjectName");
      progressSubjectInfo.classList.add("progressSubjectInfo");
      progressInfo1.classList.add("progressInfo");

      progressSubjectName.textContent = item.lectureName;
      progressSubjectInfo.textContent = item.teacherName;

      progressInfoBox.appendChild(progressTitleBox);
      progressBox.appendChild(progressInfoBox);
      progressTitleBox.appendChild(progressSubjectName);
      progressTitleBox.appendChild(progressSubjectInfo);

      progressInfoBox.appendChild(progressInfo1);
    });
  }
}

function StudyMylectures(items, user) {
  const progressContainer = document.querySelector(".progress-container");
  const progressTitle = document.createElement("div");

  const progressBox = document.createElement("div");

  progressBox.classList.add("wbox", "progressBox");
  progressTitle.classList.add("progressTitle");

  progressTitle.textContent = user.userId + "님의 강의실";

  progressContainer.appendChild(progressBox);
  progressBox.appendChild(progressTitle);

  items.forEach((item) => {
    const progressInfoBox = document.createElement("div");
    const progressTitleBox = document.createElement("div");
    const progressSubjectName = document.createElement("div");
    const progressSubjectInfo = document.createElement("div");
    const progressInfo1 = document.createElement("div");

    progressInfoBox.classList.add("progressInfoBox");
    progressTitleBox.classList.add("progressTitleBox");
    progressSubjectName.classList.add("progressSubjectName");
    progressSubjectInfo.classList.add("progressSubjectInfo");
    progressInfo1.classList.add("progressInfo");

    progressSubjectName.textContent = item.lectureName;
    progressSubjectInfo.textContent = item.teacherName;

    progressInfoBox.appendChild(progressTitleBox);
    progressBox.appendChild(progressInfoBox);
    progressTitleBox.appendChild(progressSubjectName);
    progressTitleBox.appendChild(progressSubjectInfo);

    progressInfoBox.appendChild(progressInfo1);
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
