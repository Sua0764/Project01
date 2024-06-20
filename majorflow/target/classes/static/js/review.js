const urlLogout = "http://localhost:8080/user/logout";

document.querySelector(".reviewBtn").addEventListener("click", () => {
  document.querySelector(".review").classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const reviewWriteBtn = document.querySelector(".reviewWriteBtn");
  const reviewModal = document.getElementById("reviewModal");
  const reviewModalCloseBtn = document.querySelector(".reviewModalCloseBtn");
  const reviewWriteBtn2 = document.querySelector(".reviewWriteBtn2");
  const starRating = document.querySelectorAll(".reviewWriteStar");
  let selectedRating = 1;

  reviewWriteBtn.addEventListener("click", () => {
    reviewModal.style.display = "block";
  });

  reviewModalCloseBtn.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === reviewModal) {
      reviewModal.style.display = "none";
    }
  });

  starRating.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1;
      starRating.forEach((s, i) => {
        if (i < selectedRating) {
          s.classList.add("on");
        } else {
          s.classList.remove("on");
        }
      });
    });
  });

  reviewWriteBtn2.addEventListener("click", () => {
    const reviewContent = document.querySelector(".star_box").value;
    if (!reviewContent) {
      alert("리뷰 내용을 작성해주세요.");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    const reviewContainer = document.querySelector(".reviewBox6");
    const newReview = document.createElement("div");
    newReview.classList.add("reviewBox7");
    newReview.innerHTML = `
      <div class="reviewBox7Grid">
        <div>
          <div class="reviewBox7Grid-1">닉네임</div>
        </div>
        <div>
          <div class="reviewBox7Grid-4">${"★".repeat(
            selectedRating
          )}${"☆".repeat(5 - selectedRating)}</div>
          <div class="reviewBox7Grid-3">${formattedDate}</div>
        </div>
      </div>
      <div class="reviewBox8">${reviewContent}</div>
      <div class="reviewBox9Grid">
        <div class="reviewBox9Grid-2">
          <div class="reviewBox9Grid-1">좋아요 <span class="likeCount">0</span>개</div>
        </div>
        <div class="reviewBox9Grid-2">
          <img src="/img/하트.png" width="25" height="25" class="likeBtn"/>
          <div class="reviewBox9Grid-1">좋아요</div>
        </div>
      </div>
    `;

    reviewContainer.appendChild(newReview);

    // 좋아요 버튼 클릭 이벤트 추가
    const likeBtn = newReview.querySelector(".likeBtn");
    const likeCount = newReview.querySelector(".likeCount");
    likeBtn.addEventListener("click", () => {
      let count = parseInt(likeCount.textContent, 10);
      likeCount.textContent = count + 1;
    });

    reviewModal.style.display = "none";
    document.querySelector(".star_box").value = "";
    starRating.forEach((s) => s.classList.remove("on"));
    selectedRating = 1;
    starRating[0].classList.add("on");
  });
});

function displayReview(reviewData) {
  console.log(reviewData.length);
  if (reviewData.length > 0) {
  }
}

document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));

    // 클릭된 div에 active 클래스 추가
    div.classList.add("active");
  });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        const userId = response.data.userId;
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");
      } else {
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러발생: ", error);
    });
}

document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
  if (confirm("로그아웃하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (response.status == 200) {
          alert("로그아웃 되었습니다");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  }
});

sessionCurrent();
