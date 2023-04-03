const mealURL = "https://vast-gold-chinchilla-gown.cyclic.app/meals";

let accesstoken = localStorage.getItem("accesstokenadmin") || null;

let cartData = JSON.parse(localStorage.getItem("cartItem")) || [];

let loggedUserName = localStorage.getItem("loginname") || "";

let products = document.querySelector(".products");

let arr = [];

async function getData() {
  let res = await fetch(mealURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `${accesstoken}`,
    },
  });
  let data = await res.json();
  arr = data;
  renderData(data);
}

getData();

function renderData(allMeal) {
  products.innerHTML = "";

  allMeal.forEach((elem,index) => {
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

function addCart(elem, index) {
  if(loggedUserName == ""){    
    alert("Please login First");
    window.location.href = "signin.html";
    return;
  }
  let res = cartData.find(function (item) {
    if (item.image === elem.image) {
      return true;
    }
  });

  if (!res == true) {
    cartData.push(elem);
    localStorage.setItem("cartItem", JSON.stringify(cartData));
  } else {
    alert("Item already exist in the cart");
  }
}

function search() {
  let input = document.querySelector("#search").value;
  let searchData = arr.filter(function (elem) {
    return elem.name.toLowerCase().includes(input.toLowerCase());
  });
  renderData(searchData);
}

//logged name
// let accData = JSON.parse(localStorage.getItem("accdata")) || [];
// console.log(accData)

// if(accData[0] != undefined) {
//   document.querySelector("#logged").textContent = `HI! ${accData[0].fname}`;
// }