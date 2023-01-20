let cartData = JSON.parse(localStorage.getItem("cartItem")) || [];

let totalPrice = cartData.reduce((acc, elem) => {
  return acc + +elem.price;
}, 0);
document.querySelector("#amount").textContent = totalPrice;
localStorage.setItem("amount", totalPrice);

let totalItem = +cartData.length;
document.querySelector("#totalItem").textContent = totalItem;
// document.querySelector(".itemCart").textContent = totalItem;

function mealData(cartData) {
  document.querySelector("#container").innerHTML = null;

  cartData.forEach((elem, index) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", elem.image);
    
    let name = document.createElement("h2");
    name.textContent = elem.name;
    
    let quantity = document.createElement("div");
    quantity.setAttribute("id", "quant");

    let minusBtn = document.createElement("span");
    minusBtn.textContent = " - ";
    minusBtn.addEventListener("click", function () {
      numQuant.textContent = +numQuant.textContent - 1;
      price.textContent = numQuant.textContent * elem.price;
      if (numQuant.textContent == 0) {
        cartData.splice(index, 1);
        localStorage.setItem("cartItem", JSON.stringify(cartData));
        mealData(cartData);
        totalItem--;
        document.querySelector("#totalItem").textContent = totalItem;
        document.querySelector(".itemCart").textContent = totalItem;
      }
      totalPrice = totalPrice - elem.price;
      document.querySelector("#amount").textContent = totalPrice;
    });

    let numQuant = document.createElement("h2");
    numQuant.textContent = "1";

    let plusBtn = document.createElement("span");
    plusBtn.textContent = " + ";
    plusBtn.addEventListener("click", function () {
      numQuant.textContent = +numQuant.textContent + 1;
      price.textContent = numQuant.textContent * elem.price;
      totalPrice = totalPrice + elem.price;
      document.querySelector("#amount").textContent = totalPrice;
    });

    quantity.append(minusBtn, numQuant, plusBtn);

    let price = document.createElement("p");
    price.textContent = elem.price;

    let addbtn = document.createElement("button");
    addbtn.textContent = "Remove";
    addbtn.addEventListener("click", function () {
      deleteCart(elem, price.textContent, index);
    });

    div.append(image, name, quantity, price, addbtn);

    document.getElementById("container").append(div);
  });
}
mealData(cartData);

// delete item in cart
function deleteCart(elem, price, index) {
  cartData.splice(index, 1);
  localStorage.setItem("cartItem", JSON.stringify(cartData));

  totalPrice = totalPrice - Number(price);
  document.querySelector("#amount").textContent = totalPrice;

  totalItem--;
  document.querySelector("#totalItem").textContent = totalItem;
//   document.querySelector(".itemCart").textContent = totalItem;

  mealData(cartData);
}

// document.getElementById("checkout").addEventListener("click", () => {
//   window.location.href = "payment.html";
// });

//logged name
let accData = JSON.parse(localStorage.getItem("accdata")) || [];
console.log(accData);

if (accData[0] != undefined) {
  document.querySelector("#logged").textContent = `HI! ${accData[0].fname}`;
}