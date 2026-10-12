const products = [
    { id: 1, name: "Ballpen", price: 12 },
    { id: 2, name: "Pencil", price: 10 },
    { id: 3, name: "Notebook", price: 35 },
    { id: 4, name: "Yellow Pad", price: 45 },
    { id: 5, name: "Eraser", price: 8 },
    { id: 6, name: "Ruler", price: 15 }
];

function renderProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach(function (product) {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML =
            "<span>" + product.name + " - ₱" + product.price.toFixed(2) + "</span>" +
            '<button onclick="addToCart(' + product.id + ')">Add to Cart</button>';
        list.appendChild(item);
    });
}

function addToCart(id) {
    const product = products.find(function (p) {
        return p.id === id;
    });

    const existing = cart.find(function (item) {
        return item.id === id;
    });

    if (existing) {
        existing.quantity = existing.quantity + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
}

function increaseQty(id) {
    const item = cart.find(function (i) {
        return i.id === id;
    });
    item.quantity = item.quantity + 1;
    renderCart();
}

function decreaseQty(id) {
    const item = cart.find(function (i) {
        return i.id === id;
    });
    item.quantity = item.quantity - 1;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(function (i) {
        return i.id !== id;
    });
    renderCart();
}

function getTotal() {
    return cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);
}

function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        renderSummary();
        return;
    }

    cart.forEach(function (item) {
        const subtotal = item.price * item.quantity;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML =
            "<strong>" + item.name + "</strong><br>" +
            "Price: ₱" + item.price.toFixed(2) + "<br>" +
            "Quantity: " + item.quantity + "<br>" +
            "Subtotal: ₱" + subtotal.toFixed(2) + "<br>" +
            '<button onclick="decreaseQty(' + item.id + ')">-</button> ' +
            '<button onclick="increaseQty(' + item.id + ')">+</button> ' +
            '<button onclick="removeItem(' + item.id + ')">Remove</button>';
        cartDiv.appendChild(row);
    });

    renderSummary();
}

function renderSummary() {
    const summaryDiv = document.getElementById("summary");
    const totalItems = cart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    summaryDiv.innerHTML =
        "<p>Total items: " + totalItems + "</p>" +
        "<p><strong>Total Amount: ₱" + getTotal().toFixed(2) + "</strong></p>";
}
function confirmPayment() {
    const input = document.getElementById("amount-paid");
    const errorEl = document.getElementById("payment-error");
    const raw = input.value.trim();
    errorEl.textContent = "";

    if (cart.length === 0) {
        errorEl.textContent = "Your cart is empty. Add items before paying.";
        return;
    }

    if (raw === "") {
        errorEl.textContent = "Please enter the amount paid.";
        return;
    }

    const paid = Number(raw);

    if (!isFinite(paid)) {
        errorEl.textContent = "Invalid amount. Please enter a valid number.";
        return;
    }

    if (paid < 0) {
        errorEl.textContent = "Payment cannot be negative.";
        return;
    }

    const total = getTotal();

    if (paid < total) {
        errorEl.textContent =
            "Insufficient payment. You still need ₱" + (total - paid).toFixed(2) + " more.";
        return;
    }

    const change = paid - total;
    showReceipt(paid, total, change);

    input.disabled = true;
    document.getElementById("confirm-btn").disabled = true;
}

function showReceipt(paid, total, change) {
    const receiptDiv = document.getElementById("receipt");
    const refNumber = "TXN-" + Date.now();
    const dateTime = new Date().toLocaleString();

    let rows = "";
    cart.forEach(function (item) {
        rows +=
            "<tr>" +
            "<td>" + item.name + "</td>" +
            "<td>" + item.quantity + "</td>" +
            "<td>₱" + item.price.toFixed(2) + "</td>" +
            "<td>₱" + (item.price * item.quantity).toFixed(2) + "</td>" +
            "</tr>";
    });

    receiptDiv.innerHTML =
        "<p><strong>Reference No.:</strong> " + refNumber + "</p>" +
        "<p><strong>Date/Time:</strong> " + dateTime + "</p>" +
        "<table class='receipt-table'>" +
        "<tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr>" +
        rows +
        "</table>" +
        "<p><strong>Total Amount Due:</strong> ₱" + total.toFixed(2) + "</p>" +
        "<p><strong>Amount Paid:</strong> ₱" + paid.toFixed(2) + "</p>" +
        "<p><strong>Change:</strong> ₱" + change.toFixed(2) + "</p>" +
        "<p class='success'>Payment confirmed. Thank you for your purchase!</p>" +
        '<button onclick="newTransaction()">New Transaction</button>';
}

function clearReceipt() {
    document.getElementById("receipt").innerHTML = "<p>No receipt yet.</p>";
}

function newTransaction() {
    cart = [];
    const input = document.getElementById("amount-paid");
    input.value = "";
    input.disabled = false;
    document.getElementById("confirm-btn").disabled = false;
    document.getElementById("payment-error").textContent = "";
    clearReceipt();
    renderCart();
}

let cart = [];
renderProducts();
renderCart();
clearReceipt();