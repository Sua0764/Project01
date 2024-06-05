document.querySelector(".teacherBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.remove("hidden");
  document.querySelector(".historyBox").classList.add("hidden");
});

document.querySelector(".historyBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.add("hidden");
  document.querySelector(".historyBox").classList.remove("hidden");
});

document.querySelector(".teacherInfo").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.add("hidden");
  document.querySelector("singleTeacherBox").classList.remove("hidden");
});
