const urlSignup = "http://localhost:8080/user/signup";

function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      console.log(data);

      var roadAddr = data.roadAddress;
      var jibunAddr = data.jibunAddress;

      document.getElementById("zonecode").value = data.zonecode;
      if (roadAddr !== "") {
        document.getElementById("roadAddress").value = roadAddr;
      } else if (jibunAddr !== "") {
        document.getElementById("roadAddress").value = jibunAddr;
      }
    },
  }).open();
}

function registerAddr() {
  var zonecode = document.getElementById("zonecode").value;
  var roadAddress = document.getElementById("roadAddress").value;
  var roadAddressDetail = document.getElementById("roadAddressDetail").value;

  if (zonecode && roadAddress && roadAddressDetail) {
    alert(
      "주소가 등록되었습니다:\n" +
        "우편번호: " +
        zonecode +
        "\n" +
        "도로명주소: " +
        roadAddress +
        "\n" +
        "상세주소: " +
        roadAddressDetail
    );
  } else {
    alert("모든 주소 정보를 입력해 주세요.");
  }
}

async function checkDuplicateId() {
  const userId = document.getElementById("userId").value;
  try {
    const response = await axios.post("http://localhost:3000/check-id", {
      userId,
    });
    const exists = response.data.exists;
    const resultElement = document.getElementById("duplicate-check-result");
    if (exists) {
      resultElement.innerText = "이미 사용 중인 아이디입니다.";
      resultElement.style.color = "red";
    } else {
      resultElement.innerText = "사용 가능한 아이디입니다.";
      resultElement.style.color = "green";
    }
  } catch (error) {
    console.error("Error checking ID:", error);
  }
}
