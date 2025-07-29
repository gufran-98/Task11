// فلترة الأزرار
  function filterProducts(category) {
    let products = document.getElementsByClassName('box_main');
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      if (category === 'all' || product.classList.contains(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  }


window.onload = function () {
  loadCartFromStorage();
};
// اضافة عناصر للسلة 
  let total = 0;
  function addToCartSimple(el) {
    let product = el.closest(".box_main");
    let name = product.dataset.name;
    let price = parseFloat(product.dataset.price);
    let img = product.dataset.img;

     let item = createCartItem(name, price, img);
    document.querySelector(".cart-items-container").appendChild(item);

    total += price;
    document.getElementById("total-price").textContent = "Total: " + total + " LE";
     saveItemToStorage(name, price, img);
  

  }
    // انشاء عنصر جديد
function createCartItem(name, price, img) {

    let item = document.createElement("div");

    item.className = "d-flex align-items-center gap-2 mb-2 border-bottom pb-2";

    item.innerHTML = `
      <img src="${img}" width="90" height="90" alt="${name}">
      <div>
        <p class="m-0 fw-bold">${name}</p>
        <p class="m-0">${price} LE</p>
      </div>
    `;
    return item;
}
 

  // حفظ المنتجات في local storge
function saveItemToStorage(name, price, img) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
// عند الضغط على تحميل الصفحة
function loadCartFromStorage() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    let element = createCartItem(item.name, item.price, item.img);
    document.querySelector(".cart-items-container").appendChild(element);

    total += item.price;
  }
// عرض  السعر النهائي في السلة
  document.getElementById("total-price").textContent = "Total: " + total + " LE";
}

// عرض اسم وسعر المنتج في المودل
  function showProductInModal(el) {
    let product = el.closest(".box_main");
    let name = product.dataset.name;
    let price = product.dataset.price;

   
    document.getElementById("modalProductName").textContent = name;
    document.getElementById("modalProductPrice").textContent = price;

    document.getElementById("priceInput").value = price;
  }

// اظهار تفاصيل الطلب داخل المودل
  let form=document.getElementById("purchaseForm");

  form.onsubmit= function(event){
    event.preventDefault();


  let name= form.username.value;
  let address= form.address.value;
  let phone= form.phone.value;
  let price= form.price.value;

document.getElementById("modalProductName").textContent = `!Thank you ${name} for your order`;
  document.getElementById("modalProductPrice").innerHTML = 
  `Order Price: ${price} LE.<br> Delivery Address: ${address}.<br> We will contact you at: ${phone}`;
  };


// وضع السعر في حقل الإدخال داخل المودال
document.getElementById("buy-now").addEventListener("click", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let totalText = document.getElementById("total-price").textContent;
  document.getElementById("priceInput").value = total;

  let modalName = document.getElementById("modalProductName");
  let modalPrice = document.getElementById("modalProductPrice");

  if (cartItems.length >= 2) {
    modalName.textContent = "";     
    modalPrice.innerHTML = "";     
  } else {
    modalName.textContent = "Product Name";
    modalPrice.innerHTML = `Price: ${total} LE`;
  }
});

//  زر تفريغ السلة

  function clearCart() {
     let cartItems = document.querySelector(".cart-items-container"); 
    cartItems.innerHTML = "";

    total = 0; 
    document.getElementById("total-price").textContent = "Total: 0 LE"; 
  }
  
 


   








