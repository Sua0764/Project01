const urlLogout = "http://localhost:8080/user/logout";
const urlLectures = "http://localhost:8080/lectures";
//const urlEnroll = "http://localhost:8080/cart/add/" + userId + lectureId;

axios
  .get(urlLectures)
  .then((response) => {
    console.log("데이터: ", response.data);
    displayLectures(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displayLectures(lectureData) {
  if (lectureData.length > 0) {
    const enrollment = document.querySelector(".enrollment");

    lectureData.forEach((data) => {
      const lectureEnrollment = document.createElement("div");

      const lectureEnrollimg = document.createElement("div");
      const lectureEnrollInfo = document.createElement("div");
      const cartEnrollBtn = document.createElement("div");
      const lectureEnrollname = document.createElement("div");
      const teacherEnrollname = document.createElement("div");
      const enrollPrice = document.createElement("div");
      const enrollPrice2 = document.createElement("div");
      const enrollPrice1Div = document.createElement("div");
      const enrollPrice1Div2 = document.createElement("div");
      const enrollPrice2Div = document.createElement("div");
      const enrollPrice2Div2 = document.createElement("div");

      lectureEnrollment.classList.add("lectureEnrollment");
      lectureEnrollimg.classList.add("lectureEnrollimg");
      lectureEnrollInfo.classList.add("lectureEnrollInfo");
      cartEnrollBtn.classList.add("cartEnrollBtn");
      lectureEnrollname.classList.add("lectureEnrollname");
      teacherEnrollname.classList.add("teacherEnrollname");
      enrollPrice.classList.add("enrollPrice");
      enrollPrice2.classList.add("enrollPrice");

      //이미지 속성 추가 필요
      cartEnrollBtn.textContent = "장바구니 담기";
      lectureEnrollname.textContent = data.lectureName;
      teacherEnrollname.textContent = data.teacherName;
      enrollPrice1Div.textContent = "취미반";
      enrollPrice1Div2.textContent = "160,000";
      enrollPrice2Div.textContent = "입시반";
      enrollPrice2Div2.textContent = "200,000";

      enrollment.appendChild(lectureEnrollment);
      lectureEnrollment.appendChild(lectureEnrollimg);
      lectureEnrollment.appendChild(lectureEnrollInfo);
      lectureEnrollInfo.appendChild(cartEnrollBtn);
      lectureEnrollInfo.appendChild(lectureEnrollname);
      lectureEnrollInfo.appendChild(teacherEnrollname);
      lectureEnrollInfo.appendChild(enrollPrice);
      lectureEnrollInfo.appendChild(enrollPrice2);
      enrollPrice.appendChild(enrollPrice1Div);
      enrollPrice.appendChild(enrollPrice1Div2);
      enrollPrice2.appendChild(enrollPrice2Div);
      enrollPrice2.appendChild(enrollPrice2Div2);

      cartEnrollBtn.addEventListener("click", () => {
        console.log("장바구니 담기 버튼 클릭: ", data);
        //enrollLecture(data);
      });
    });
  }
}

// function enrollLecture(data) {
//   axios
//     .post(urlEnroll, data, { withCredentials: true })
//     .then((response) => {
//       console.log("데이터: ", response);
//     })
//     .catch((error) => {
//       console.log("에러 발생: ", error);
//       alert("로그인해주세요.");
//     });
// }

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("세션 데이터: ", response);
      if (response.status == 200) {
        console.log("세션 유지");
        const userId = response.data.userId;
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");
      } else {
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log("로그인 안됨");
      document.querySelector(".menuLoginBtn").classList.remove("hidden");
      document.querySelector(".menuLogoutBtn").classList.add("hidden");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
    if (confirm("로그아웃하시겠습니까?")) {
      axios
        .post(urlLogout, {}, { withCredentials: true })
        .then((response) => {
          console.log("로그아웃 응답 데이터: ", response);
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
});
