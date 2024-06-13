document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.querySelector(".menuBtn");
  var menu = document.querySelector(".menu");
  var closeBtn = document.querySelector(".closeBtn");

  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  // Optional: Close the menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove("active");
    }
  });

  document.querySelector(".closeBtn").addEventListener("click", () => {
    menu.classList.remove("active");
  });
});
