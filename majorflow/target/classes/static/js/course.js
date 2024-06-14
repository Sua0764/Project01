const urlLectures = "http://localhost:8080/lectures";
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get("lectureId");
// console.log("Lecture ID: ", id);
// const urlLecture = "http://localhost:8080/lectures/" + id;

axios
  .get(urlLectures)
  .then((response) => {
    console.log("응답 Response: ", response);
    displayLectures(response.data);
  })
  .catch((error) => {
    console.log("에러발생: ", error);
  });

function displayLectures(lectureData) {
  console.log(lectureData.length);
  if (lectureData.length > 0) {
    const allCourse = document.querySelector(".allCourse");
    lectureData.forEach((data) => {
      const allCourseClick = document.createElement("div");
      allCourseClick.classList.add("allCourseClick");
      const allCourseClickImg = document.createElement("div");
      allCourseClickImg.classList.add("allCourseClickImg");

      allCourseClick.appendChild(allCourseClickImg);
      const lectureName = document.createElement("p");
      lectureName.textContent = data.lectureName;

      allCourseClick.appendChild(lectureName);
      allCourse.appendChild(allCourseClick);

      allCourseClickImg.addEventListener("click", () => {
        const urlLecture = "http://localhost:8080/lectures/" + data.lectureId;

        //window.location.href = "course.html?lectureId=" + data.lectureId;
        axios
          .get(urlLecture)
          .then((response) => {
            console.log("데이터: ", response.data);
            displayLecture(response.data);

            if (response.status == 200) {
              document
                .querySelector(".allCourseDetailBox")
                .classList.remove("hidden");
              document.querySelector(".tasteCourseBox").classList.add("hidden");
              document.querySelector(".allCourseBox").classList.add("hidden");
            }
          })
          .catch((error) => {
            console.log("에러 발생: ", error);
          });
      });
    });
  }
}

function displayLecture(data) {
  const allCourseDetailBox = document.querySelector(".allCourseDetailBox");

  const detailedBox2 = document.querySelector(".detailedBox2");

  const backBtn = document.createElement("div");
  const detailedBox = document.createElement("div");
  const detailedBox2Img = document.createElement("div");
  const detailedBox2Text = document.createElement("div");
  const detailedBox2Text2 = document.createElement("div");

  backBtn.classList.add("backBtn");
  detailedBox.classList.add("detailedBox");
  detailedBox2.classList.add("detailedBox2");
  detailedBox2Img.classList.add("detailedBox2Img");
  detailedBox2Text.classList.add("detaildBox2Text");
  detailedBox2Text2.classList.add("detaildBox2Text2");

  //이미지 속성 추가 필요
  detailedBox.textContent = data.lectureName;

  allCourseDetailBox.appendChild(backBtn);
  allCourseDetailBox.appendChild(detailedBox);
  allCourseDetailBox.appendChild(detailedBox2);
  detailedBox2.appendChild(detailedBox2Img);
  detailedBox2.appendChild(detailedBox2Text);
  detailedBox2.appendChild(detailedBox2Text2);

  backBtn.addEventListener("click", () => {
    window.location.href = "course.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tasteCourseBtn = document.querySelector(".tasteCourseBtn");
  const allCourseBtn = document.querySelector(".allCourseBtn");
  const coursePriceGuideBtn = document.querySelector(".coursePriceGuideBtn");

  if (tasteCourseBtn) {
    tasteCourseBtn.addEventListener("click", () => {
      document.querySelector(".tasteCourseBox").classList.remove("hidden");
      document.querySelector(".allCourseBox").classList.add("hidden");
      document.querySelector(".coursePriceGuideBox").classList.add("hidden");
      document.querySelector(".allCourseDetailBox").classList.add("hidden");
    });
  } else {
    console.error("tasteCourseBtn not found");
  }

  if (allCourseBtn) {
    allCourseBtn.addEventListener("click", () => {
      document.querySelector(".allCourseBox").classList.remove("hidden");
      document.querySelector(".tasteCourseBox").classList.add("hidden");
      document.querySelector(".coursePriceGuideBox").classList.add("hidden");
    });
  } else {
    console.error("allCourseBtn not found");
  }

  if (coursePriceGuideBtn) {
    coursePriceGuideBtn.addEventListener("click", () => {
      document.querySelector(".coursePriceGuideBox").classList.remove("hidden");
      document.querySelector(".tasteCourseBox").classList.add("hidden");
      document.querySelector(".allCourseBox").classList.add("hidden");
      document.querySelector(".allCourseDetailBox").classList.add("hidden");
    });
  } else {
    console.error("coursePriceGuideBtn not found");
  }
});
