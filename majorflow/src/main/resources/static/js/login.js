const urlLogin = "http://localhost:8080/user/login";
//const urlSignup = "http://localhost:8080/majorflow/signup.html"
let userId = "";
let password = "";

document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  userId = e.target.value;
});

document.querySelector("#password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector(".sign-inBx").addEventListener("click", () => {
  //event.preventDefault();
  const data = {
    userId: userId,
    password: password,
  };

  axios
    .post(urlLogin, data, { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      sessionCurrent();
      alert("로그인이 완료되었습니다");
      window.location.href = "about.html";
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
      alert("아이디 혹은 비밀번호가 잘못되었습니다");
    });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터:", response);
      if (response.status == 200) {
        console.log("세션 유지");
      }
    })
    .catch((error) => {
      console.log("에러 발생:", error);
    });
}

sessionCurrent();
