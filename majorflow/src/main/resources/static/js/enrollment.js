document.addEventListener("DOMContentLoaded", function () {
  const cartBtns = document.querySelectorAll(".cartEnrollBtn");

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lectureInfo = this.closest(".lectureEnrollInfo");
      const lectureName = lectureInfo.querySelector(".lectureEnrollname").innerText;
      const teacherName = lectureInfo.querySelector(".teacherEnrollname").innerText;
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
