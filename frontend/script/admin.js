let loginURL = "http://localhost:275/employees/login";

let login = document.querySelector("#emploginform");

login.addEventListener("submit", loginFun);

async function loginFun(event) {
  event.preventDefault();
  try {
    let emplyid = document.querySelector("#emplyid").value;
    let password = document.querySelector("#password").value;

    let userObj = {
      emplyid,
      password,
    };

    localStorage.setItem("emploginname", userObj.emplyid);

    let emploginReq = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (emploginReq.ok == true) {
      let res = await emploginReq.json();
      let token = res.empToken;
      localStorage.setItem("accesstokenadmin", token);
      alert("Login Succesfull");
      window.location.href = "dashboard.html";
    } else {
      alert("User not found");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again later");
  }
}
