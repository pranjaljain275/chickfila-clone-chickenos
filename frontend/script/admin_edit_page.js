function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let accesstokenAdmin = localStorage.getItem("accesstokenadmin");
let dataId = localStorage.getItem("editId") || null;
// console.log(dataId)

if (dataId == null) {
  let edit_form = document.querySelector(".form_of_editing");
  edit_form.innerHTML = "";
  let edit_btn = document.querySelector("#edit_bar");
  edit_btn.innerHTML = `
     <div id="add_bar">ADD DATA TO WEBSITE </div>
   `;
  let add_form = document.querySelector(".form_of_editing");
  add_form.innerHTML = `
   <form id="edit_form">
   <div id="inside_form">
     <div class="comp_data" id="comp_nme">
       <label for="compmyName">Product Name : </label>
       <input
         type="text"
         id="company_name"
         placeholder="Enter product name here..."
         required
       />
     </div>
     <div class="comp_data" id="comp_lgo">
       <label for="companylogo">URL of Image : </label>
       <input
         type="text"
         id="company-logo"
         placeholder="Enter URL of image here..."
         required
       />
     </div>
     <div class="comp_data" id="job_rle">
       <label for="jobrole">Quantity : </label>
       <input
         type="text"
         id="company_job_role"
         placeholder="Enter Quantity here..."
         required
       />
     </div>
     <div class="comp_data" id="job_rle">
       <label for="jobrole">Price : </label>
       <input
         type="text"
         id="company_price"
         placeholder="Enter Price here..."
         required
       />
     </div>
   </div>
   <div class="submit_btn">
     <div class="cancel_btn">
       <button id="cancel"><a href="dashboard.html"> Cancel</a></button>
     </div>
     <div class="save_btn">
       <button id="save">Save</button>
     </div>
   </div>
 </form>
   `;
  let save_add_btn = document.querySelector("#save");
  save_add_btn.addEventListener("click", (event) => {
    event.preventDefault();
    let product_name = document.querySelector("#company_name");
    let prod_logo = document.querySelector("#company-logo");
    let quantity = document.querySelector("#company_job_role");
    let price = document.querySelector("#company_price");
    let obj = {
      name: product_name.value,
      image: prod_logo.value,
      quantity: quantity.value,
      price: price.value,
    };
    addtoserver(obj);
  });
}

async function addtoserver(obj) {
  try {
    let add_data = await fetch("http://localhost:2750/meals/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accesstokenAdmin}`,
      },
      body: JSON.stringify(obj),
    });
    if (add_data.ok) {
      alert("Data Added Successfully");
      window.location.href = "dashboard.html";
    } else {
      alert("Data not added.\nPlease Try Again");
    }
  } catch (error) {
    alert("Bad Request");
  }
}
window.addEventListener("load", () => {
  if (dataId != null) {
    editData(dataId);
    let edit_strt_btn = document.querySelector("#edit_pge_btn");
    setTimeout(() => {
      edit_strt_btn.innerText = "Start Editing";
    }, 1000);
    edit_strt_btn.innerText = "Fetching Data...";
  }
});

async function editData(id) {
  try {
    let edit_data = await fetch(`http://localhost:2750/meals/${id}`);
    if (edit_data.ok) {
      let temp = await edit_data.json();
      // console.log(temp);
      showdata(temp[0]);
    } else {
      alert("something went wrong");
    }
  } catch (error) {
    alert("edit data");
  }
}

function showdata(data) {
  // console.log(data);
  let cname = document.querySelector("#company_name");
  cname.value = data["name"];
  cname.readOnly = true;
  let clogo = document.querySelector("#company-logo");
  clogo.value = data["image"];
  clogo.readOnly = true;
  let crole = document.querySelector("#company_job_role");
  crole.value = data["quantity"];
  crole.readOnly = true;
  let cprice = document.querySelector("#company_price");
  cprice.value = data["price"];
  cprice.readOnly = true;
}

let temp_data = document.querySelector("#edit_pge_btn");
if (dataId != null) {
  temp_data.addEventListener("click", (event) => {
    temp_data.innerText = "Editing In Process...";
    let cname = document.querySelector("#company_name");
    cname.readOnly = false;
    let clogo = document.querySelector("#company-logo");
    clogo.readOnly = false;
    let crole = document.querySelector("#company_job_role");
    crole.readOnly = false;
    let cprice = document.querySelector("#company_price");
    cprice.readOnly = false;
  });
}

let save_data = document.querySelector("#save");
if (dataId != null) {
  save_data.addEventListener("click", (event) => {
    let temp_data = document.querySelector("#edit_pge_btn");
    temp_data.innerText = "Start Editing";
    event.preventDefault();
    let data = {};
    let cname = document.querySelector("#company_name");
    data["name"] = cname.value;
    let clogo = document.querySelector("#company-logo");
    data["image"] = clogo.value;
    let crole = document.querySelector("#company_job_role");
    data["quantity"] = crole.value;
    let cprice = document.querySelector("#company_price");
    data["price"] = cprice.value;
    cname.readOnly = true;
    clogo.readOnly = true;
    crole.readOnly = true;
    cprice.readOnly = true;
    finalData(data);
  });
}

async function finalData(obj) {
  try {
    let edit_fetch = await fetch(`http://localhost:2750/meals/${dataId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accesstokenAdmin}`,
      },
      body: JSON.stringify(obj),
    });
    if (edit_fetch.ok) {
      alert("Data edited and saved succefully!");
    } else {
      alert("Edited data not saved.");
    }
  } catch (error) {
    alert("Bad Request");
  }
}
// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// let accesstokenAdmin = localStorage.getItem("accesstokenadmin");
// let dataId = localStorage.getItem("editId") || null;

// if (dataId == null) {
//   let edit_form = document.querySelector(".form_of_editing");
//   edit_form.innerHTML = "";
//   let edit_btn = document.querySelector("#edit_bar");
//   edit_btn.innerHTML = `
//      <div id="add_bar">ADD DATA TO WEBSITE </div>
//    `;
//   let add_form = document.querySelector(".form_of_editing");
//   add_form.innerHTML = `
//    <form id="edit_form">
//    <div id="inside_form">
//      <div class="comp_data" id="comp_nme">
//        <label for="compmyName">Product Name : </label>
//        <input
//          type="text"
//          id="company_name"
//          placeholder="Enter product name here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="comp_lgo">
//        <label for="companylogo">URL of Image : </label>
//        <input
//          type="text"
//          id="company-logo"
//          placeholder="Enter URL of image here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="job_rle">
//        <label for="jobrole">Quantity : </label>
//        <input
//          type="text"
//          id="company_job_role"
//          placeholder="Enter Quantity here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="job_rle">
//        <label for="jobrole">Price : </label>
//        <input
//          type="text"
//          id="company_price"
//          placeholder="Enter Price here..."
//          required
//        />
//      </div>
//    </div>
//    <div class="submit_btn">
//      <div class="cancel_btn">
//        <button id="cancel"><a href="dashboard.html"> Cancel</a></button>
//      </div>
//      <div class="save_btn">
//        <button id="save">Save</button>
//      </div>
//    </div>
//  </form>
//    `;
//   let save_add_btn = document.querySelector("#save");
//   save_add_btn.addEventListener("click", (event) => {
//     event.preventDefault();
//     let product_name = document.querySelector("#company_name");
//     let prod_logo = document.querySelector("#company-logo");
//     let quantity = document.querySelector("#company_job_role");
//     let price = document.querySelector("#company_price");
//     let obj = {
//       name: product_name.value,
//       image: prod_logo.value,
//       quantity: quantity.value,
//       price: price.value,
//     };
//     addtoserver(obj);
//   });
// }

// async function addtoserver(obj) {
//   try {
//     let add_data = await fetch("http://localhost:2750/meals/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${accesstokenAdmin}`,
//       },
//       body: JSON.stringify(obj),
//     });
//     if (add_data.ok) {
//       alert("Data Added Successfully");
//       window.location.href = "dashboard.html";
//     } else {
//       alert("Data not added.\nPlease Try Again");
//     }
//   } catch (error) {
//     alert("Bad Request");
//   }
// }
// window.addEventListener("load", () => {
//   if (dataId != null) {
//     editData(dataId);
//     let edit_strt_btn = document.querySelector("#edit_pge_btn");
//     setTimeout(() => {
//       edit_strt_btn.innerText = "Start Editing";
//     }, 1000);
//     edit_strt_btn.innerText = "Fetching Data...";
//   }
// });

// async function editData(id) {
//   try {
//     let edit_data = await fetch(`http://localhost:2750/meals/${id}`);
//     if (edit_data.ok) {
//       let temp = await edit_data.json();
//       showdata(temp);
//     } else {
//     }
//   } catch (error) {
//     alert("edit data");
//   }
// }

// function showdata(data) {
//   let cname = document.querySelector("#company_name");
//   cname.value = data["name"];
//   cname.readOnly = true;
//   let clogo = document.querySelector("#company-logo");
//   clogo.value = data["image"];
//   clogo.readOnly = true;
//   let crole = document.querySelector("#company_job_role");
//   crole.value = data["quantity"];
//   crole.readOnly = true;
//   let cprice = document.querySelector("#company_price");
//   cprice.value = data["price"];
//   cprice.readOnly = true;
// }

// let temp_data = document.querySelector("#edit_pge_btn");
// if (dataId != null) {
//   temp_data.addEventListener("click", (event) => {
//     temp_data.innerText = "Editing In Process...";
//     let cname = document.querySelector("#company_name");
//     cname.readOnly = false;
//     let clogo = document.querySelector("#company-logo");
//     clogo.readOnly = false;
//     let crole = document.querySelector("#company_job_role");
//     crole.readOnly = false;
//     let cprice = document.querySelector("#company_price");
//     cprice.readOnly = false;
//   });
// }

// let save_data = document.querySelector("#save");
// if (dataId != null) {
//   save_data.addEventListener("click", (event) => {
//     let temp_data = document.querySelector("#edit_pge_btn");
//     temp_data.innerText = "Start Editing";
//     event.preventDefault();
//     let data = {};
//     let cname = document.querySelector("#company_name");
//     data["name"] = cname.value;
//     let clogo = document.querySelector("#company-logo");
//     data["image"] = clogo.value;
//     let crole = document.querySelector("#company_job_role");
//     data["quantity"] = crole.value;
//     let cprice = document.querySelector("#company_price");
//     data["price"] = cprice.value;
//     cname.readOnly = true;
//     clogo.readOnly = true;
//     crole.readOnly = true;
//     cprice.readOnly = true;
//     finalData(data);
//   });
// }

// async function finalData(obj) {
//   try {
//     let edit_fetch = await fetch(`http://localhost:2750/meals/${dataId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${accesstokenAdmin}`,
//       },
//       body: JSON.stringify(obj),
//     });
//     if (edit_fetch.ok) {
//       alert("Data edited and saved succefully!");
//     } else {
//       alert("Edited data not saved.");
//     }
//   } catch (error) {
//     alert("Bad Request");
//   }
// }
// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// let accesstokenAdmin = localStorage.getItem("accesstokenadmin");
// let dataId = localStorage.getItem("editId") || null;

// if (dataId == null) {
//   let edit_form = document.querySelector(".form_of_editing");
//   edit_form.innerHTML = "";
//   let edit_btn = document.querySelector("#edit_bar");
//   edit_btn.innerHTML = `
//      <div id="add_bar">ADD DATA TO WEBSITE </div>
//    `;
//   let add_form = document.querySelector(".form_of_editing");
//   add_form.innerHTML = `
//    <form id="edit_form">
//    <div id="inside_form">
//      <div class="comp_data" id="comp_nme">
//        <label for="compmyName">Product Name : </label>
//        <input
//          type="text"
//          id="company_name"
//          placeholder="Enter product name here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="comp_lgo">
//        <label for="companylogo">URL of Image : </label>
//        <input
//          type="text"
//          id="company-logo"
//          placeholder="Enter URL of image here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="job_rle">
//        <label for="jobrole">Quantity : </label>
//        <input
//          type="text"
//          id="company_job_role"
//          placeholder="Enter Quantity here..."
//          required
//        />
//      </div>
//      <div class="comp_data" id="job_rle">
//        <label for="jobrole">Price : </label>
//        <input
//          type="text"
//          id="company_price"
//          placeholder="Enter Price here..."
//          required
//        />
//      </div>
//    </div>
//    <div class="submit_btn">
//      <div class="cancel_btn">
//        <button id="cancel"><a href="dashboard.html"> Cancel</a></button>
//      </div>
//      <div class="save_btn">
//        <button id="save">Save</button>
//      </div>
//    </div>
//  </form>
//    `;
//   let save_add_btn = document.querySelector("#save");
//   save_add_btn.addEventListener("click", (event) => {
//     event.preventDefault();
//     let product_name = document.querySelector("#company_name");
//     let prod_logo = document.querySelector("#company-logo");
//     let quantity = document.querySelector("#company_job_role");
//     let price = document.querySelector("#company_price");
//     let obj = {
//       name: product_name.value,
//       image: prod_logo.value,
//       quantity: quantity.value,
//       price: price.value,
//     };
//     addtoserver(obj);
//   });
// }

// async function addtoserver(obj) {
//   try {
//     let add_data = await fetch("http://localhost:2750/meals/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${accesstokenAdmin}`,
//       },
//       body: JSON.stringify(obj),
//     });
//     if (add_data.ok) {
//       alert("Data Added Successfully");
//       window.location.href = "dashboard.html";
//     } else {
//       alert("Data not added.\nPlease Try Again");
//     }
//   } catch (error) {
//     alert("Bad Request");
//   }
// }
// window.addEventListener("load", () => {
//   if (dataId != null) {
//     editData(dataId);
//     let edit_strt_btn = document.querySelector("#edit_pge_btn");
//     setTimeout(() => {
//       edit_strt_btn.innerText = "Start Editing";
//     }, 1000);
//     edit_strt_btn.innerText = "Fetching Data...";
//   }
// });

// async function editData(id) {
//   try {
//     let edit_data = await fetch(`http://localhost:2750/meals/${id}`);
//     if (edit_data.ok) {
//       let temp = await edit_data.json();
//       showdata(temp);
//     } else {
//     }
//   } catch (error) {
//     alert("edit data");
//   }
// }

// function showdata(data) {
//   let cname = document.querySelector("#company_name");
//   cname.value = data["name"];
//   cname.readOnly = true;
//   let clogo = document.querySelector("#company-logo");
//   clogo.value = data["image"];
//   clogo.readOnly = true;
//   let crole = document.querySelector("#company_job_role");
//   crole.value = data["quantity"];
//   crole.readOnly = true;
//   let cprice = document.querySelector("#company_price");
//   cprice.value = data["price"];
//   cprice.readOnly = true;
// }

// let temp_data = document.querySelector("#edit_pge_btn");
// if (dataId != null) {
//   temp_data.addEventListener("click", (event) => {
//     temp_data.innerText = "Editing In Process...";
//     let cname = document.querySelector("#company_name");
//     cname.readOnly = false;
//     let clogo = document.querySelector("#company-logo");
//     clogo.readOnly = false;
//     let crole = document.querySelector("#company_job_role");
//     crole.readOnly = false;
//     let cprice = document.querySelector("#company_price");
//     cprice.readOnly = false;
//   });
// }

// let save_data = document.querySelector("#save");
// if (dataId != null) {
//   save_data.addEventListener("click", (event) => {
//     let temp_data = document.querySelector("#edit_pge_btn");
//     temp_data.innerText = "Start Editing";
//     event.preventDefault();
//     let data = {};
//     let cname = document.querySelector("#company_name");
//     data["name"] = cname.value;
//     let clogo = document.querySelector("#company-logo");
//     data["image"] = clogo.value;
//     let crole = document.querySelector("#company_job_role");
//     data["quantity"] = crole.value;
//     let cprice = document.querySelector("#company_price");
//     data["price"] = cprice.value;
//     cname.readOnly = true;
//     clogo.readOnly = true;
//     crole.readOnly = true;
//     cprice.readOnly = true;
//     finalData(data);
//   });
// }

// async function finalData(obj) {
//   try {
//     let edit_fetch = await fetch(`http://localhost:2750/meals/${dataId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${accesstokenAdmin}`,
//       },
//       body: JSON.stringify(obj),
//     });
//     if (edit_fetch.ok) {
//       alert("Data edited and saved succefully!");
//     } else {
//       alert("Edited data not saved.");
//     }
//   } catch (error) {
//     alert("Bad Request");
//   }
// }