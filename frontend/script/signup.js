let registerURL = "https://vast-gold-chinchilla-gown.cyclic.app/users/signup";

let signup = document.querySelector("#signup_form");

signup.addEventListener("submit", signupFun);

// Register
async function signupFun(event) {
  event.preventDefault();
  try {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let password = document.querySelector("#password").value;

    let userObj = {
      name,
      email,
      phone,
      password,
    };
    
    let registerReq = await fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    // console.log(registerReq);
    if (registerReq.ok == true) {
      alert("User Registered");
      window.location.href = "signin.html";
    } else {
      alert("Bad Request");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again later");
  }
}
