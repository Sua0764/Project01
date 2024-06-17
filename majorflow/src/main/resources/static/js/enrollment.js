const urlLogout = "http://localhost:8080/user/logout";

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
