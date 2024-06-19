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

axios
  .get("/user/current")
  .then((response) => {
    const userData = response.data;
    const userName = userData.userId;

    const progressTitle = document.querySelector(".progressTitle");

    progressTitle.textContent = `${userName}님의 진도율`;
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

/* DOMContentLoaded 이벤트 */
document.addEventListener("DOMContentLoaded", function () {
  sessionCurrent();
  getLectureData();
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
      console.log("로그인 안됨");
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
