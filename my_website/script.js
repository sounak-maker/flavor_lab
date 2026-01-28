/* =====================
   CART DATA
===================== */
let cart = {};

/* =====================
   ADD ITEM TO CART
===================== */
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = {
            price: price,
            qty: 1
        };
    }
    updateCart();
}

/* =====================
   CHANGE QUANTITY
===================== */
function changeQty(item, change) {
    if (!cart[item]) return;

    cart[item].qty += change;

    if (cart[item].qty <= 0) {
        delete cart[item];
    }

    updateCart();
}

/* =====================
   UPDATE CART UI
===================== */
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    const emptyMsg = document.getElementById("emptyCartMsg");

    cartItems.innerHTML = "";
    let total = 0;

    const items = Object.keys(cart);

    if (items.length === 0) {
        emptyMsg.style.display = "block";
        totalAmount.innerText = "₹0";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    for (let item of items) {
        const itemTotal = cart[item].price * cart[item].qty;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item}</span>

                <div class="qty-control">
                    <button onclick="changeQty('${item}', -1)">−</button>
                    <strong>${cart[item].qty}</strong>
                    <button onclick="changeQty('${item}', 1)">+</button>
                </div>

                <span>₹${itemTotal}</span>
            </div>
        `;
    }

    totalAmount.innerText = `₹${total}`;
}


/* =====================
   PLACE ORDER (WHATSAPP)
===================== */
function placeOrder() {
    const tableNo = document.getElementById("tableNo").value.trim();

    if (!tableNo) {
        alert("Please enter table number");
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Please add items to cart");
        return;
    }

    let message = `🧾 New Order\n📍 Table No: ${tableNo}\n\n`;
    let total = 0;

    for (let item in cart) {
        const itemTotal = cart[item].price * cart[item].qty;
        total += itemTotal;
        message += `${item} × ${cart[item].qty} = ₹${itemTotal}\n`;
    }

    message += `\n💰 Total: ₹${total}`;

    const phone = "919547404085"; // replace with real number

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}
