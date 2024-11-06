let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let cartCount = document.querySelector("#cart-count");
let searchInput = document.querySelector("#search-input");
let productBoxes = document.querySelectorAll(".product-box");

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart functionality
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', removeCartItem);
    }

    const quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }

    const addCartButtons = document.getElementsByClassName("add-cart");
    for (let button of addCartButtons) {
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName("btn-checkout")[0].addEventListener("click", checkoutButtonClicked);

    // Search functionality
    searchInput.addEventListener("input", searchProducts);
}

// Search products
function searchProducts() {
    const query = searchInput.value.toLowerCase();
    productBoxes.forEach(box => {
        const title = box.querySelector(".product-title").innerText.toLowerCase();
        box.style.display = title.includes(query) ? "block" : "none";
    });
}

// Checkout Button
function checkoutButtonClicked() {
    const totalPrice = document.getElementsByClassName('total-price')[0].innerText.replace("R", "");
    if (totalPrice == 0) {
        alert("Your cart is empty");
    } else {
        localStorage.setItem('totalAmount', totalPrice); // Store total in local storage
        window.location.href = "checkout.html"; // Navigate to Checkout.html
    }
}

// Remove items from cart
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    updateCartCount();
}

// Quantity changes
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addCartClicked(event) {
    const button = event.target;
    const shopProduct = button.parentElement;
    const title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    const price = shopProduct.getElementsByClassName("price")[0].innerText;
    const productImg = shopProduct.getElementsByClassName("product-img")[0].src;

    if (isItemInCart(title)) {
        alert("You have already added this product to the cart. Please increase the quantity instead.");
        return;
    }

    addProductToCart(title, price, productImg);
    updateTotal();
    updateCartCount();
}

function isItemInCart(title) {
    const cartItems = document.getElementsByClassName("cart-content")[0];
    const cartItemsNames = cartItems.getElementsByClassName("product-title");

    for (let name of cartItemsNames) {
        if (name.innerText === title) {
            return true;
        }
    }
    return false;

}

function addProductToCart(title, price, productImg) {
    const cartItems = document.getElementsByClassName("cart-content")[0];
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    const cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Update Total
function updateTotal() {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let cartBox of cartBoxes) {
        const priceElement = cartBox.getElementsByClassName("cart-price")[0];
        const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        const price = parseFloat(priceElement.innerText.replace("R", ""));
        const quantity = quantityElement.value;
        total += (price * quantity);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "R" + total;
}

function updateCartCount() {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');
    let itemCount = 0;

    for (let cartBox of cartBoxes) {
        const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        itemCount += parseInt(quantityElement.value);
    }

    cartCount.innerText = itemCount;
}
