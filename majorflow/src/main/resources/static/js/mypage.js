const urlLogout = "http://localhost:8080/user/logout";
const urlLectures = "http://localhost:8080/lectures";
const urlMypage = "http://localhost:8080/user";

document.querySelector(".progressBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.add("hidden");
  document.querySelector(".progressBox").classList.remove("hidden");
});

document.querySelector(".gradeBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.remove("hidden");
  document.querySelector(".progressBox").classList.add("hidden");
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
    const progressContainer = document.querySelector(".progress-container");
    const progressTitle = document.createElement("div");

    const progressBox = document.createElement("div");

    progressBox.classList.add("wbox", "progressBox");
    progressTitle.classList.add("progressTitle");

    progressTitle.textContent = user.userId + "님의 진도율";

    progressContainer.appendChild(progressBox);
    progressBox.appendChild(progressTitle);

    items.forEach((item) => {
      const progressInfoBox = document.createElement("div");
      const progressTitleBox = document.createElement("div");
      const progressSubjectName = document.createElement("div");
      const progressSubjectInfo = document.createElement("div");
      const progressInfo1 = document.createElement("div");

      const progressInfoStudent1 = document.createElement("div");
      const progressInfoGraph1 = document.createElement("div");
      const progressInfoGraphColor1 = document.createElement("div");
      // 두 번째 progressInfo 생성
      const progressInfo2 = document.createElement("div");
      const progressInfoStudent2 = document.createElement("div");

      const progressInfoGraph2 = document.createElement("div");
      const progressInfoGraphColor2 = document.createElement("div");

      progressInfoBox.classList.add("progressInfoBox");
      progressTitleBox.classList.add("progressTitleBox");
      progressSubjectName.classList.add("progressSubjectName");
      progressSubjectInfo.classList.add("progressSubjectInfo");
      progressInfo1.classList.add("progressInfo");
      progressInfoStudent1.classList.add("progressInfoStudent");

      progressInfoGraph1.classList.add("progressInfoGraph");
      progressInfoGraphColor1.classList.add("progressInfoGraphColor");
      progressInfoGraphColor1.id = "myProgressBar";
      progressInfo2.classList.add("progressInfo");
      progressInfoStudent2.classList.add("progressInfoStudent");
      progressInfoGraph2.classList.add("progressInfoGraph");
      progressInfoGraphColor2.classList.add("progressInfoGraphColor");

      progressSubjectName.textContent = item.lectureName;
      progressSubjectInfo.textContent = item.teacherName;

      progressInfoStudent1.innerHTML =
        '나의 진도율 <span id="myProgress">0</span>%';
      progressInfoStudent2.innerHTML =
        '수강생 평균 진도율 <span id="averageProgress">0</span>%';
      progressInfoGraphColor2.id = "averageProgressBar";

      progressInfoBox.appendChild(progressTitleBox);
      progressBox.appendChild(progressInfoBox);
      progressTitleBox.appendChild(progressSubjectName);
      progressTitleBox.appendChild(progressSubjectInfo);

      progressInfo1.appendChild(progressInfoStudent1);
      progressInfoGraph1.appendChild(progressInfoGraphColor1);
      progressInfo1.appendChild(progressInfoGraph1);
      progressInfoBox.appendChild(progressInfo1);
      progressInfo2.appendChild(progressInfoStudent2);
      progressInfoGraph2.appendChild(progressInfoGraphColor2);
      progressInfo2.appendChild(progressInfoGraph2);
      progressInfoBox.appendChild(progressInfo2);

      // 강의 진도율 데이터 설정
      let myProgress = 75; // 나의 진도율 (예: 75%)
      let averageProgress = 60; // 수강생 평균 진도율 (예: 60%)

      // 진도율 텍스트 업데이트
      document.getElementById("myProgress").textContent = myProgress;
      document.getElementById("averageProgress").textContent = averageProgress;

      // 진도율 그래프 업데이트
      document.getElementById("myProgressBar").style.width = myProgress + "%";
      document.getElementById("averageProgressBar").style.width =
        averageProgress + "%";
    });
  }
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
