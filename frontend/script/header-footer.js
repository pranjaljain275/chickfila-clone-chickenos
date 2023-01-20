let header = document.querySelector("header");

header.innerHTML = `
<div class="top">
  <p>
    We are investigating suspicious activity on some customer accounts. We
    are committed to protecting customers data and are working quickly to
    resolve the issue. Learn more.
  </p>
  <i class="fa-sharp fa-solid fa-xmark"></i>
</div>

<div class="navbar">
  <div>
    <a href="index.html"
      ><img src="images/CHICKENOS logo.jpeg" alt=""
    /></a>
    <p><i class="fa fa-location-dot"></i>Find a restaurant</p>
  </div>

  <div>
    <h2>
      Menu
      <div class="dropdown">
        <h2><a href="breakfast.html">Breakfast</a></h2>
        <h2><a>Entrées</a></h2>
        <h2><a>Salads</a></h2>
        <h2><a>Sides</a></h2>
        <h2><a>Kid's Meals</a></h2>
        <h2><a>Treats</a></h2>
        <h2><a>Drinks</a></h2>
        <h2><a>Dipping Sauces and Dressings</a></h2>
        <h2><a>Catering</a></h2>
      </div>
    </h2>

    <h2>
      Stories
      <div class="dropdown">
        <h2><a>Food</a></h2>
        <h2><a>Lifestyle</a></h2>
        <h2><a>Inside Chick-fil-A</a></h2>
        <h2><a>News</a></h2>
      </div>
    </h2>

    <h2>
      About
      <div class="dropdown">
        <h2><a>Who We Are</a></h2>
        <h2><a>Great Food</a></h2>
        <h2><a>Giving Back</a></h2>
        <h2><a>History</a></h2>
        <h2><a>S. Truett Cathy Brands</a></h2>
      </div>
    </h2>

    <h2>
      Careers
      <div class="dropdown">
        <h2><a>Who We Are</a></h2>
        <h2><a>Great Food</a></h2>
        <h2><a>Giving Back</a></h2>
        <h2><a>History</a></h2>
        <h2><a>S. Truett Cathy Brands</a></h2>
      </div>
    </h2>
  </div>

  <div>
    <p><a id="signname" href="signup.html">Sign Up</a></p>
    <p><a id="signname" href="emplogin.html">Employeer Login</a></p>
    <button id="cart">Order food</button>
    <p><i class="fa-solid fa-magnifying-glass"></i></p>
  </div>
</div>
`;

let footer = document.querySelector("footer");

footer.innerHTML = `
<div class="footimg">
  <img
    src="https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/Footer%20Images/footer-burger-phone-desktop-new-3.jpg"
    alt=""
  />
</div>
<div class="zindex">
  <img src="images/CHICKENOS logo.jpeg" alt="" />
  <p>
    Join Chick-fil-A One®. Earn points with every qualifying purchase.
    Redeem available rewards of your choice.
  </p>
  <p>
    The Chick-fil-A App is not presently accepted at Chick-fil-A
    Express™ and Chick-fil-A licensed locations such as those in
    airports and college campuses. These locations are operated by
    professional third-party food contractors and their operating
    systems do not currently offer guests the ability to earn points or
    redeem rewards through the Chick-fil-A App.
  </p>
  <button>Learn More</button>
  <h2>Already have an account?<a href="signin.html">Sign-in</a></h2>
</div>

<div class="footcontent">
  <div class="f1">
    <div class="f2">
      <h2>Nutrition & Allergens</h2>
      <h2>Customer Support</h2>
      <h2>Careers</h2>
      <h2>Franchising</h2>
      <h2>Merchandise</h2>
      <h2>Press Room</h2>
    </div>
    <div class="f2">
      <h2>Do business with us</h2>
      <h2>Terms and Conditions of Use</h2>
      <h2>Privacy Policy</h2>
      <h2>California Privacy Notice</h2>
      <h2>Cookie and Internet-Based Advertising Policy</h2>
    </div>
    <div class="f2">
      <h2>Do Not Sell Or Share My Personal Information</h2>
      <h2>Cookie Preference Center</h2>
      <h2>Accessibility</h2>
      <h2>Locations listing</h2>
      <h2>Legal</h2>
    </div>
    <div class="f2">
      <h2>© 2022 CFA Properties, Inc. All rights reserved.</h2>
    </div>
  </div>

  <div>
    <i class="fa-brands fa-facebook"></i>
    <i class="fa-brands fa-instagram"></i>
    <i class="fa-brands fa-twitter"></i>
    <i class="fa-brands fa-youtube"></i>
    <i class="fa-brands fa-linkedin"></i>
  </div>
</div>
`;

// close topbar
document.querySelector(".top>i").addEventListener("click", () => {
  let topbar = document.querySelector(".top");
  topbar.style.display = "none";
});

// Sign username
let username = localStorage.getItem("name") || "Sign Up";
let signuser = document.getElementById("signname");
signuser.innerText = username;

// Cart Page
let cartPage = document.getElementById("cart");
cartPage.addEventListener("click", ()=> {
  window.location.href = "cart.html";
})