const btns = document.querySelectorAll(".noticeBox3-2");

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