document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.querySelector(".menuBtn");
  var menu = document.querySelector(".menu");
  var closeBtn = document.querySelector(".closeBtn");

  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove("active");
    }
  });

  document.querySelector(".closeBtn").addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const coursePriceGuideBtn = document.querySelector(".coursePriceGuideBtn");

  if (coursePriceGuideBtn) {
    coursePriceGuideBtn.addEventListener("click", () => {
      window.location.href = "course.html";
    });
  } else {
    console.error("coursePriceGuideBtn not found");
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const coursePriceGuideBtn = document.querySelector(".coursePriceGuideBtn");

//   if (coursePriceGuideBtn) {
//     coursePriceGuideBtn.addEventListener("click", () => {
//       // 클래스 조작
//       document.querySelector(".coursePriceGuideBox").classList.remove("hidden");
//       document.querySelector(".tasteCourseBox").classList.add("hidden");
//       document.querySelector(".allCourseBox").classList.add("hidden");
//       document.querySelector(".allCourseDetailBox").classList.add("hidden");

//       // 상태를 localStorage에 저장
//       localStorage.setItem("coursePriceGuideVisible", "true");

//       // 페이지 이동
//       window.location.href = "course.html";
//     });
//   } else {
//     console.error("coursePriceGuideBtn not found");
//   }
// });