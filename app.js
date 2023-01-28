let removeButtons = document.querySelectorAll(".btn-danger");
let quantityInputs = document.querySelectorAll(".cart-quantity-input");
let addToCartButtons = document.querySelectorAll(".shop-item-button");
let purchaseButton = document.querySelector(".btn-purchase");

function removeHandler(e) {
  let clickedButton = e.target;
  clickedButton.parentElement.parentElement.remove();
}

function updateCartTotal() {
  let cartTotal = document.querySelector(".cart-total-price");
  let total = 0;
  let cartItems = document.querySelector(".cart-items");
  let cartRows = cartItems.getElementsByClassName("cart-row");
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let cartElement = cartRow.querySelector(".cart-price");
    let quantityElement = cartRow.querySelector(".cart-quantity-input");
    let price = cartElement.innerText.replace("$", "");
    let quantity = quantityElement.value;
    total += price * quantity;
    total = Math.round(total * 100) / 100;
  }
  cartTotal.innerHTML = `$${total}`;
}

function quantityChanged(number) {
  let input = number.target;
  if (isNaN(input.value) || input.value < 1) {
    input.value = 1;
  }
  updateCartTotal();
}

function addItemToCart(title, price, img) {
  let cartRow = document.createElement("div");
  let cartItems = document.querySelector(".cart-items");
  cartRow.classList.add("cart-row");
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("已經在購物車裡面囉");
      return;
    }
  }
  let cartRowContent = `
  <div class="cart-item cart-column">
    <img
      class="cart-item-image"
      src="${img}"
      width="100"
      height="100"
    />
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.querySelector(".btn-danger").addEventListener("click", removeHandler);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", updateCartTotal);
}

function addToCart(e) {
  let title =
    e.target.parentElement.parentElement.querySelector(
      ".shop-item-title"
    ).innerText;
  // console.log(title);
  let price =
    e.target.parentElement.querySelector(".shop-item-price").innerText;
  // console.log(price);
  let img =
    e.target.parentElement.parentElement.querySelector(".shop-item-image").src;
  // console.log(img);
  addItemToCart(title, price, img);
}

function purchase() {
  let cartItems = document.querySelector(".cart-items");
  if (!cartItems.hasChildNodes()) {
    return alert("您沒有選購商品QQ");
  } else {
    alert("謝謝您的購買!!");
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
  }

  // console.log(cartItems.firstChild);
  updateCartTotal();
}

removeButtons.forEach((button) => {
  button.addEventListener("click", removeHandler);
  button.addEventListener("click", updateCartTotal);
});
quantityInputs.forEach((inputs) => {
  inputs.addEventListener("change", quantityChanged);
});
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
  button.addEventListener("click", updateCartTotal);
});
purchaseButton.addEventListener("click", purchase);
// console.log(cartTotal);
// console.log(price);
