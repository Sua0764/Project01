document.querySelector(".progressBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.add("hidden");
  document.querySelector(".progressBox").classList.remove("hidden");
});

document.querySelector(".gradeBtn").addEventListener("click", () => {
  document.querySelector(".gradeBox").classList.remove("hidden");
  document.querySelector(".progressBox").classList.add("hidden");
});
