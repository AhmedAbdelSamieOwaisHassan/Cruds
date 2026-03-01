let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
console.log(title, price, taxes, ads, discount, total, count, category, submit);

// get total

function getTotal() {
  //   console.log("done");
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;

    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#421313";
  }
}

// createProdect
let dataArr = [];

if (localStorage.Product != null) {
  dataArr = JSON.parse(localStorage.Product);
} else {
  let dataArr = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //   count
  // clean date
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count <= 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          dataArr.push(newpro);
        }
      } else {
        dataArr.push(newpro);
      }
    } else {
      dataArr[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
      total.style.background = "#421313";
    }

    // SaveData as a LocaleStorge
    localStorage.setItem("Product", JSON.stringify(dataArr));
    console.log(dataArr);
    clearData();
    ShowData();
  }
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  //   total.style.background = "#421313";
}

// read
// show data in table desplay

function ShowData() {
  getTotal();
  let table = "";
  document.getElementById("tbody").innerHTML = "";

  for (let i = 0; i < dataArr.length; i++) {
    table += `<tr>
              <td>${i + 1}</td>
              <td>${dataArr[i].title}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].taxes}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].category}</td>
              <td><button onclick="updeateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
    console.log(table);
  }
  document.getElementById("tbody").innerHTML = table;
  // Button Delete All
  let btndelete = document.getElementById("DeleteAll");
  if (dataArr.length > 0) {
    btndelete.innerHTML = `
    <button onclick="DeleteAll()" >DleteAll(${dataArr.length})</button>
  
  `;
  } else {
    btndelete.innerHTML = "";
  }
}

ShowData();
// Count

// Delete
// Button Delete All
function deleteData(i) {
  dataArr.splice(i, 1);
  localStorage.Product = JSON.stringify(dataArr);
  ShowData();

  console.log(i);
}

function DeleteAll() {
  localStorage.clear();
  dataArr.splice(0);
  ShowData();
}

// Update
function updeateData(i) {
  //   console.log(i);
  title.value = dataArr[i].title;
  price.value = dataArr[i].price;
  taxes.value = dataArr[i].taxes;
  ads.value = dataArr[i].ads;
  discount.value = dataArr[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataArr[i].category;
  submit.innerHTML = "Update";

  mood = "update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let searchMood = "title";

function getSearchMood(id) {
  //   console.log(id);
  let search = document.getElementById("search");
  if (id === "SearchTitle") {
    searchMood = "title";
    // search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    // search.placeholder = "Search By Category";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  search.value = "";
  ShowData();
  console.log(searchMood);
}

// search function
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataArr.length; i++) {
    // title search
    if (searchMood == "title") {
      if (dataArr[i].title.includes(value.toLowerCase())) {
        // console.log(i);
        table += `<tr>
              <td>${i}</td>
              <td>${dataArr[i].title}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].taxes}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].category}</td>
              <td><button onclick="updeateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
    //   category search
    else {
      if (dataArr[i].category.includes(value.toLowerCase())) {
        // console.log(i);
        table += `<tr>
              <td>${i}</td>
              <td>${dataArr[i].title}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].taxes}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].category}</td>
              <td><button onclick="updeateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean date
