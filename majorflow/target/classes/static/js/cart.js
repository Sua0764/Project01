const urlLogout = "http://localhost:8080/user/logout";
const urlCart = "http://localhost:8080/cart/user/" + userId;
//const urlPost = "http://localhost:8080/cart/user/" + userId;

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 200) {
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (cartItems) {
          displayCart(cartItems, userId);
          const data = cartItems.map((game) => {
            return {
              game: game,
              user: { userId: userId, authority: { authorityName: authority } },
            };
          });
          document
            .querySelector(".purchaseBtn")
            .addEventListener("click", () => {
              if (confirm("진짜 구매하시겠습니까?")) {
                axios
                  .post(url, data, { withCredentials: true })
                  .then((response) => {
                    console.log("데이터: ", response.data);
                    localStorage.removeItem(userId);
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log("에러 발생: ", error);
                  });
              }
            });
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
      alert("로그인해주세요.");
    });
}

function displayCart(lectures, userId) {
  const cartBox = document.querySelector(".cartBox");
  let totalPrice = 0;

  lectures.forEach((data, index) => {
    // 태그 요소 생성
    const cartBox1 = document.createElement("div");
    const cartBox2 = document.createElement("div");
    const cartLine = document.createElement("div");
    const cartBox3 = document.createElement("div");
    const cartDeleteBtn = document.createElement("div");

    // 클래스 이름 생성
    cartBox1.classList.add(".cartBox1");
    cartBox2.classList.add(".cartBox2");
    cartLine.classList.add(".cartLine");
    cartBox3.classList.add(".cartBox3");
    cartDeleteBtn.classList.add(".cartDeleteBtn");

    // 태그 속성 추가
    cartBox2.textContent = data.lectureName;
    cartBox3.textContent = "160,000";
    cartDeleteBtn.textContent = "삭제하기";

    // appendChild 부모자식 위치 설정
    cartBox.appendChild(cartBox1);
    cartBox1.appendChild(cartBox2);
    cartBox1.appendChild(cartBox3);

    totalPrice += "100,000";
    //totalPrice += data.price;

    deleteBtn.addEventListener("click", () => {
      if (confirm("장바구니에서 삭제하시겠습니까?")) {
        games.splice(index, 1);
        localStorage.setItem(userId, JSON.stringify(games));
        displayCart(games, userId);
      }
    });
  });
  document.querySelector(".totalprice").textContent = "총 " + totalPrice + "원";
}

// 페이지 로딩시에 즉시 세션여부 확인
sessionCurrent();

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
