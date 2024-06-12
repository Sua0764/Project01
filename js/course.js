document.querySelector(".tasteCourseBtn").addEventListener("click", () => {
  document.querySelector(".tasteCourseBox").classList.remove("hidden");
  document.querySelector(".allCourseBox").classList.add("hidden");
  document.querySelector(".coursePriceGuideBox").classList.add("hidden");
  document.querySelector(".allCourseDetailBox").classList.add("hidden");
});

document.querySelector(".allCourseBtn").addEventListener("click", () => {
  document.querySelector(".allCourseBox").classList.remove("hidden");
  document.querySelector(".tasteCourseBox").classList.add("hidden");
  document.querySelector(".coursePriceGuideBox").classList.add("hidden");
});

document.querySelector(".coursePriceGuideBtn").addEventListener("click", () => {
  document.querySelector(".coursePriceGuideBox").classList.remove("hidden");
  document.querySelector(".tasteCourseBox").classList.add("hidden");
  document.querySelector(".allCourseBox").classList.add("hidden");
  document.querySelector(".allCourseDetailBox").classList.add("hidden");
});

document.querySelector(".allCourseClickImg").addEventListener("click", () => {
  document.querySelector(".allCourseDetailBox").classList.remove("hidden");
  document.querySelector(".tasteCourseBox").classList.add("hidden");
  document.querySelector(".allCourseBox").classList.add("hidden");
  document.querySelector(".tasteCourseBox").classList.add("hidden");
});
