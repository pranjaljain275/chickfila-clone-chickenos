const cartURL = "http://localhost:2750/cart/";

let allCartData=[];
let totalPrice;
let totalItem;

let accesstokenUser = localStorage.getItem("accesstokenUser") || null;

// Get cart data
let getCartData = async () => {
  let res = await fetch(cartURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accesstokenUser}`,
    },
  });
  if (res.ok == true) {
    let data = await res.json();
    allCartData = [...data];
    // console.log(allCartData);

    totalPrice = data.reduce((acc, elem) => {
      return acc + +elem.price;
    }, 0);
    document.querySelector("#amount").textContent = totalPrice;
    localStorage.setItem("amount", totalPrice);
    totalItem = +data.length;
    document.querySelector("#totalItem").textContent = totalItem;

    renderCartMeal(data);
    // return data;
  }
};
getCartData();

// Render cart Data
function renderCartMeal(cartData) {
  document.querySelector("#container").innerHTML = null;

  cartData.forEach((elem, index) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", elem.image);

    let name = document.createElement("h2");
    name.textContent = elem.name;

    let quantity = document.createElement("div");
    quantity.setAttribute("id", "quant");

    let numQuant = document.createElement("h2");
    numQuant.textContent = elem.quant;

    let minusBtn = document.createElement("span");
    minusBtn.textContent = " - ";
    minusBtn.addEventListener("click", function () {
      if (numQuant.textContent > 1) {
        numQuant.textContent = +numQuant.textContent - 1;
      }
      price.textContent = numQuant.textContent * elem.price;
      totalPrice = totalPrice - elem.price;
      document.querySelector("#amount").textContent = totalPrice;
      localStorage.setItem("amount", totalPrice);
    });

    let plusBtn = document.createElement("span");
    plusBtn.textContent = " + ";
    plusBtn.addEventListener("click", function () {
      numQuant.textContent = +numQuant.textContent + 1;
      price.textContent = numQuant.textContent * elem.price;
      totalPrice = totalPrice + elem.price;
      document.querySelector("#amount").textContent = totalPrice;
      localStorage.setItem("amount", totalPrice);
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

// delete cart data
let deleteCartData = async (elem) => {
  let res = await fetch(`${cartURL}/${elem._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accesstokenUser}`,
    },
  });
  let msg = res.text();
  return msg;
};

// delete item in cart
function deleteCart(elem, price, index) {
  deleteCartData(elem).then((data)=>{
    console.log(data);
  });
  let dataAfterDelete = allCartData.filter((el)=>{
    return el._id != elem._id;
  });
  allCartData=dataAfterDelete;

  totalPrice = allCartData.reduce((acc, e) => {
    return acc + +e.price;
  }, 0); 
  document.querySelector("#amount").textContent = totalPrice;
  localStorage.setItem("amount", totalPrice);

  totalItem=allCartData.length;
  document.querySelector("#totalItem").textContent = totalItem;

  renderCartMeal(allCartData);
}

document.getElementById("checkout").addEventListener("click", () => {
  window.location.href = "payment.html";
});
