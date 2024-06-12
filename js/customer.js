document.querySelector(".noticeBox4").addEventListener("click", () => {
  document.querySelector(".noticeWriteBox").classList.remove("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".noticePopupBox").classList.add("hidden");
  document.querySelector(".inquiryBox").classList.add("hidden");
});

document.querySelector(".noticeClick").addEventListener("click", () => {
  document.querySelector(".noticePopupBox").classList.remove("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".inquiryBox").classList.add("hidden");
});

document.querySelector(".noticeBtn").addEventListener("click", () => {
  document.querySelector(".noticeBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".noticePopupBox").classList.add("hidden");
  document.querySelector(".inquiryBox").classList.add("hidden");
});

document.querySelector(".customerInquiryBtn").addEventListener("click", () => {
  document.querySelector(".inquiryBox").classList.remove("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".noticePopupBox").classList.add("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
});
