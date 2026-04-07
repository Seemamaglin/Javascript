const PRODUCTS = [
  { id: 1,  name: "Wireless Headphones", category: "Electronics", price: 4999, desc: "Over-ear wireless headphones with active noise cancellation and deep bass.", img: "images/headphone.webp" },
  { id: 2,  name: "Mechanical Keyboard", category: "Electronics", price: 7499, desc: "Compact TKL mechanical keyboard with RGB backlight and tactile switches.", img: "images/Mech-keyboard.webp" },
  { id: 3,  name: "White T-Shirt",       category: "Clothing",    price: 699,  desc: "Classic white 100% cotton T-shirt, soft fabric, available in multiple sizes.", img: "images/white t-shirt.jfif" },
  { id: 4,  name: "Running Shoes",       category: "Clothing",    price: 2999, desc: "Lightweight running shoes with cushioned sole and breathable mesh upper.", img: "images/shoes-men.jfif" },
  { id: 5,  name: "Psychology of Money", category: "Books",       price: 599,  desc: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.", img: "images/book.webp" },
  { id: 6,  name: "The Secret",          category: "Books",       price: 799,  desc: "A self-help book by Rhonda Byrne based on the law of attraction.", img: "images/the-secret.jfif" },
  { id: 7,  name: "Desk Lamp",           category: "Home",        price: 1299, desc: "LED desk lamp with adjustable brightness and flexible neck for focused lighting.", img: "images/lamp.jfif" },
  { id: 8,  name: "Ceramic Mug",         category: "Home",        price: 449,  desc: "Handcrafted 350ml ceramic mug, microwave and dishwasher safe.", img: "images/mug.jfif" },
  { id: 9,  name: "USB-C Hub",           category: "Electronics", price: 3499, desc: "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader and fast charging.", img: "images/usb.jfif" },
  { id: 10, name: "Hoodie",              category: "Clothing",    price: 1599, desc: "Cozy fleece pullover hoodie, warm and comfortable for all seasons.", img: "images/hoodie.jfif" },
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cartItems");
const productList = document.getElementById("products");

/* ---------------- PRODUCTS ---------------- */

function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        productDiv.innerHTML = `
            <img src="${product.img}" class="product-img">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p>Price: ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

displayProducts(PRODUCTS);

/* ---------------- CART ---------------- */

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.count, 0);
    document.getElementById("cartCount").textContent = total;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    cartList.innerHTML = "";

    cart.forEach(p => {
        const cartDiv = document.createElement("div");
        cartDiv.className = "cart-item";

        cartDiv.innerHTML = `
            <div class="cart-item">
                <div>${p.name}</div>
                <div>₹${p.price * p.count}</div>

                <div>
                    <button onclick="updateQty(${p.id}, ${p.count - 1})">-</button>
                    <span>${p.count}</span>
                    <button onclick="updateQty(${p.id}, ${p.count + 1})">+</button>
                    <button class="remove-btn" onclick="removeItem(${p.id})">Remove</button>
                </div>
            </div>
        `;
        
        cartList.appendChild(cartDiv);
    });
}
function updateQty(id, count) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    if (count <= 0) {
        cart = cart.filter(p => p.id !== id);
    } else {
        item.count = count;
    }

    saveCart();
    displayCart();
    updateCartCount();
}
function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
    displayCart();
    updateCartCount();
}
function addToCart(id) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.count++;
    } else {
        const product = PRODUCTS.find(p => p.id === id);
        cart.push({ ...product, count: 1 }); // ✅ keep name, price, img
    }

    saveCart();
    displayCart();
    updateCartCount();
}


function displayCartSummary() {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = subtotal + tax - discount;
    
    document.getElementById("cartSummary").innerHTML = `
    <p>Subtotal: ₹${subtotal}</p>
    <p>Tax (5%): ₹${tax}</p>
    <p>Discount: ₹${discount}</p>
    <h3>Total: ₹${total}</h3>
  `;
}
//calculate pricing
function calculateSubtotal() {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.count;
});

return subtotal;
}

//tax=5%
function calculateTax(subtotal) {
  return subtotal * 0.05;
}

//10% discount if total>=2000
function calculateDiscount(subtotal) {
  if (subtotal >= 2000) {
    return subtotal * 0.10;
  }
  return 0;
}

function calculateDiscount(subtotal) {
  if (subtotal >= 2000) {
    return subtotal * 0.10;
  }
  return 0;
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);

  return subtotal + tax - discount;
}
function closeCart(){
    document.getElementById("cartSidebar").classList.remove("open");
}    

displayCart();
updateCartCount();