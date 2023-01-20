let emploginURL = "http://localhost:275/employees/login";

let emplogin = document.querySelector("#emp_login_form");

emplogin.addEventListener("submit", emploginFun);

async function emploginFun(event) {
  event.preventDefault();
  try {
    let empId = document.querySelector("#empId").value;
    let password = document.querySelector("#password").value;

    let userObj = {
      empId,
      password,
    };

    let loginReq = await fetch(emploginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (loginReq.ok == true) {
      let res = await loginReq.json();
      let token = res.empToken;
      localStorage.setItem("accesstokenAdmin", token);
      alert("Login Succesfull");
      window.location.href = "index.html";
    } else {
      alert("User not found");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again later");
  }
}
