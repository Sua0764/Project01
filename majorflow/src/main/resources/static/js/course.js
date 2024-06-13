const urlLectures = "http://localhost:8080/user/lectures";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Lecture ID: ", id);

const urlLecture = "http://localhost:8080/user/lecture" + id;

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
      // allCourseClickImg.addEventListener("click", () => {
      //   document
      //     .querySelector(".allCourseDetailBox")
      //     .classList.remove("hidden");
      //   document.querySelector(".tasteCourseBox").classList.add("hidden");
      //   document.querySelector(".allCourseBox").classList.add("hidden");
      //   document.querySelector(".tasteCourseBox").classList.add("hidden");
      // });

      allCourseClick.appendChild(allCourseClickImg);
      const lectureName = document.createElement("p");
      lectureName.textContent = data.lectureName;

      allCourseClick.appendChild(lectureName);
      allCourse.appendChild(allCourseClick);
    });
  }
}

document.querySelector(".allCourseClickImg").addEventListener("click", () => {
  axios
    .get(urlLecture)
    .then((response) => {
      console.log("데이터: ", response.data);
      displayLecture(response.data);
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});

function displayLecture() {
  const detailedBox2 = document.querySelector(".detailedBox2");

  const detailedBox2Img = document.createElement("div");
  const detailedBox2Text = document.createElement("div");
  const detailedBox2Text2 = document.createElement("div");

  detailedBox2Img.classList.add("detailedBox2Img");
  detailedBox2Text.classList.add("detaildBox2Text");
  detailedBox2Text2.classList.add("detaildBox2Text2");

  //이미지 속성 추가 필요

  detailedBox2.appendChild(detailedBox2Img);
  detailedBox2.appendChild(detailedBox2Text);
  detailedBox2.appendChild(detailedBox2Text2);
}

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
