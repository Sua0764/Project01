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

        const userData = response.data;
        const usernickname = userData.nickname;

        const gradeTitle = document.querySelector(".gradeTitle");
        gradeTitle.textContent = usernickname + "님의 성적현황";

        const progressTitle = document.querySelector(".progressTitle");
        progressTitle.textContent = usernickname + "님의 진도율";
      } else {
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("로그인 안됨");
    });
}

axios
  .get(urlLectures)
  .then((response) => {
    const lectureName = response.data.lectureName;
    document.querySelector(".progressSubjectName").innerText = lectureName;
  })
  .catch((error) => {
    console.error("강의 데이터 가져오기 실패:", error);
  });

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

/* 나의 진도율 */
// progressBox 생성
const progressBox = document.createElement("div");
progressBox.classList.add("wbox", "progressBox");

// progressTitle 생성 및 추가
const progressTitle = document.createElement("div");
progressTitle.classList.add("progressTitle");
progressTitle.innerText = "조수아님의 진도율";
progressBox.appendChild(progressTitle);

// progressTitleBox 생성
const progressTitleBox = document.createElement("div");
progressTitleBox.classList.add("progressTitleBox");

// progressSubjectName 생성 및 추가
const progressSubjectName = document.createElement("div");
progressSubjectName.classList.add("progressSubjectName");
progressSubjectName.innerText = "Text";
progressTitleBox.appendChild(progressSubjectName);

// progressSubjectInfo 생성 및 추가
const progressSubjectInfo = document.createElement("div");
progressSubjectInfo.classList.add("progressSubjectInfo");
progressSubjectInfo.innerText = "Text";
progressTitleBox.appendChild(progressSubjectInfo);

progressBox.appendChild(progressTitleBox);

// progressInfoBox 생성
const progressInfoBox = document.createElement("div");
progressInfoBox.classList.add("progressInfoBox");

// 첫 번째 progressInfo 생성
const progressInfo1 = document.createElement("div");
progressInfo1.classList.add("progressInfo");

const progressInfoStudent1 = document.createElement("div");
progressInfoStudent1.classList.add("progressInfoStudent");
progressInfoStudent1.innerHTML = '나의 진도율 <span id="myProgress">0</span>%';
progressInfo1.appendChild(progressInfoStudent1);

const progressInfoGraph1 = document.createElement("div");
progressInfoGraph1.classList.add("progressInfoGraph");

const progressInfoGraphColor1 = document.createElement("div");
progressInfoGraphColor1.classList.add("progressInfoGraphColor");
progressInfoGraphColor1.id = "myProgressBar";
progressInfoGraph1.appendChild(progressInfoGraphColor1);

progressInfo1.appendChild(progressInfoGraph1);
progressInfoBox.appendChild(progressInfo1);

// 두 번째 progressInfo 생성
const progressInfo2 = document.createElement("div");
progressInfo2.classList.add("progressInfo");

const progressInfoStudent2 = document.createElement("div");
progressInfoStudent2.classList.add("progressInfoStudent");
progressInfoStudent2.innerHTML =
  '수강생 평균 진도율 <span id="averageProgress">0</span>%';
progressInfo2.appendChild(progressInfoStudent2);

const progressInfoGraph2 = document.createElement("div");
progressInfoGraph2.classList.add("progressInfoGraph");

const progressInfoGraphColor2 = document.createElement("div");
progressInfoGraphColor2.classList.add("progressInfoGraphColor");
progressInfoGraphColor2.id = "averageProgressBar";
progressInfoGraph2.appendChild(progressInfoGraphColor2);

progressInfo2.appendChild(progressInfoGraph2);
progressInfoBox.appendChild(progressInfo2);

progressBox.appendChild(progressInfoBox);

// progressBox를 HTML에 추가
document.getElementById("progress-container").appendChild(progressBox);
axios
  .get("/user/current")
  .then((response) => {
    const userData = response.data;
    const userName = userData.userId;
  })
  .catch((error) => {
    console.error("사용자 데이터 가져오기 실패:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  // 강의 진도율 데이터를 설정합니다.
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
