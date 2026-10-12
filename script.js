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

let cart = [];
renderProducts();
renderCart();