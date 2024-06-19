document.addEventListener("DOMContentLoaded", function () {
  const cartBtns = document.querySelectorAll(".cartEnrollBtn");

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lectureInfo = this.closest(".lectureEnrollInfo");
      const lectureName =
        lectureInfo.querySelector(".lectureEnrollname").innerText;
      const teacherName =
        lectureInfo.querySelector(".teacherEnrollname").innerText;
      const hobbyCheckbox = lectureInfo.querySelector(".hobbyCheckbox");
      const examCheckbox = lectureInfo.querySelector(".examCheckbox");

      const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

      if (hobbyCheckbox.checked) {
        cartItems.push({
          lectureName: lectureName,
          teacherName: teacherName,
          type: "취미반",
          price: 160000,
        });
      }

      if (examCheckbox.checked) {
        cartItems.push({
          lectureName: lectureName,
          teacherName: teacherName,
          type: "입시반",
          price: 200000,
        });
      }

      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("선택한 항목이 장바구니에 담겼습니다.");
    });
  });

  const hobbyCheckboxes = document.querySelectorAll(".hobbyCheckbox");
  const examCheckboxes = document.querySelectorAll(".examCheckbox");

  hobbyCheckboxes.forEach((hobbyCheckbox, index) => {
    hobbyCheckbox.addEventListener("change", function () {
      if (this.checked) {
        examCheckboxes[index].checked = false;
      }
    });
  });

  examCheckboxes.forEach((examCheckbox, index) => {
    examCheckbox.addEventListener("change", function () {
      if (this.checked) {
        hobbyCheckboxes[index].checked = false;
      }
    });
  });
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
      console.log("로그인 안됨");
    });
}

const urlLogout = "http://localhost:8080/user/logout";

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
