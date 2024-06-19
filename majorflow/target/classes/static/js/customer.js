const btns = document.querySelectorAll(".noticeBox3-2");
const urlLogout = "http://localhost:8080/user/logout";

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const noticeBox2Item = btn.parentNode;
    const isActive = noticeBox2Item.classList.contains("active");

    removeActiveClasses();

    if (!isActive) {
      noticeBox2Item.classList.add("active");
    }
  });
});

function removeActiveClasses() {
  btns.forEach((btn) => {
    btn.parentNode.classList.remove("active");
  });
}

document.querySelector(".noticeBox6").addEventListener("click", () => {
  document.querySelector(".noticeWriteBox").classList.remove("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});

document.querySelector(".noticeBtn").addEventListener("click", () => {
  document.querySelector(".noticeBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});

document.querySelector(".customerInquiryBtn").addEventListener("click", () => {
  document.querySelector(".customerInquiryBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});

document.querySelector(".customerInquiryBox6").addEventListener("click", () => {
  document.querySelector(".inquiryBox1-1").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
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
