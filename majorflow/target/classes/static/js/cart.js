document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cartBox1");
      cartItemDiv.innerHTML = `
        <div class="cartBox2">${item.lectureName}</div>
        <div class="cartBoxLine"></div>
        <div class="cartBox3">${item.teacherName}</div>
        <div class="cartBox3">${item.type}</div>
        <div class="cartBox3">${item.price.toLocaleString()}원</div>
        <div class="cartBoxRemove" data-index="${index}">삭제</div>
      `;
      cartItemsContainer.appendChild(cartItemDiv);
    });
    updateTotalPrice();
  }

  function updateTotalPrice() {
    const totalPriceContainer = document.getElementById("totalPriceContainer");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceContainer.textContent = `총 가격: ${totalPrice.toLocaleString()}원`;
  }

  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("cartBoxRemove")) {
      const index = event.target.dataset.index;
      cartItems.splice(index, 1);
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCartItems();
    }
  });

  renderCartItems();

  window.addEventListener("beforeunload", function () {
    sessionStorage.removeItem("cartItems");
  });
});

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
