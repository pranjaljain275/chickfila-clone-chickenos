let paymentTotal = localStorage.getItem("amount") || 0;
document.querySelector("#paymenttotal").textContent = paymentTotal;

// payment
document.querySelector("#pay").addEventListener("click", sendOtpFunc);

let otp = document.querySelector(".otp");

function sendOtpFunc() {
  let cardnum = document.getElementById("cardnum").value;
  let cvv = document.getElementById("cvv").value;
  let date = document.getElementById("date").value;

  if (cardnum == "1234123412341234" && cvv == "123" && date == "05/1999") {
    otp.classList.add("active"); // popup show otp
  } else {
    alert("Wrong Detail");
  }
}
// popup-close button
otp = document.querySelector(".otp");
document.querySelector(".close").addEventListener("click", function () {
  otp.classList.remove("active");
});

// enter otp
let cartData = JSON.parse(localStorage.getItem("cartItem")) || [];

document.querySelector("form").addEventListener("submit", enterOtpFunc);

function enterOtpFunc(event) {
  event.preventDefault();

  let otpassword = document.getElementById("onetime").value;

  if (otpassword == "1234") {
    alert("Payment successful: !Order Placed.");
    otp = document.querySelector(".otp");
    cartData = null;
    localStorage.setItem("cartItem", JSON.stringify(cartData));
    setTimeout(()=>{
      window.location.href = "index.html";
    },1500)
  } else {
    alert("Wrong otp");
  }
}