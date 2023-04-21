let loginURL = "http://localhost:2750/users/login";

let login = document.querySelector("#login_form");

login.addEventListener("submit", loginFun);

async function loginFun(event) {
  event.preventDefault();
  try {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let userObj = {
      email,
      password,
    };

    let loginReq = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (loginReq.ok == true) {
      let res = await loginReq.json();
      console.log(res);
      localStorage.setItem("accesstokenUser", res.token);
      localStorage.setItem("loginname", res.name.split(" ")[0]);
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
