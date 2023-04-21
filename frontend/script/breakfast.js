const mealURL = "http://localhost:2750/meals";
const cartURL = "http://localhost:2750/cart/";

let accesstokenAdmin = localStorage.getItem("accesstokenadmin") || null;
let accesstokenUser = localStorage.getItem("accesstokenUser") || null;

// let cartData = JSON.parse(localStorage.getItem("cartItem")) || [];

let loggedUserName = localStorage.getItem("loginname") || "";

let products = document.querySelector(".products");

let arr = [];

// Get Meal Data
async function getMealData() {
  let res = await fetch(mealURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok == true) {
    let data = await res.json();
    arr = data;
    renderData(data);
  }
}
getMealData();

// Render Meal data
function renderData(allMeal) {
  products.innerHTML = "";

  allMeal.forEach((elem, index) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", elem.image);

    let name = document.createElement("h2");
    name.textContent = elem.name;

    let quantity = document.createElement("p");
    quantity.textContent = elem.quantity;

    let price = document.createElement("p");
    price.textContent = `Rs ${elem.price}`;

    let orderbtn = document.createElement("button");
    orderbtn.textContent = "Order now";
    orderbtn.addEventListener("click", function () {
      addCart(elem, index);
    });

    div.append(image, name, quantity, price, orderbtn);

    products.append(div);
  });
}

// Add cart data
let addCartData = async (elem) => {
  let res = await fetch(`${cartURL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accesstokenUser}`,
    },
    body: JSON.stringify(elem),
  });

  if (res.ok == true) {
    alert("Item Added to the cart");
  }
};

// Get cart data
let getCartData = async () => {
  let res = await fetch(cartURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accesstokenUser}`,
    },
  });
  let data = await res.json();
  return data;
};

function addCart(elem, index) {
  if (loggedUserName == "") {
    alert("Please login First");
    window.location.href = "signin.html";
    return;
  }

  getCartData().then((data) => {
    let res = data.find(function (item) {
      if (item.image === elem.image) {
        return true;
      }
    });
    
    if (!res == true) {
      addCartData(elem);
    } else {
      alert("Item already exist in the cart");
    }
  });
}

// Search Meal
function search() {
  let input = document.querySelector("#search").value;
  let searchData = arr.filter(function (elem) {
    return elem.name.toLowerCase().includes(input.toLowerCase());
  });
  renderData(searchData);
}
