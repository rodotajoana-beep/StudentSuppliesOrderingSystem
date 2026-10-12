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
    alert("Cart coming next! Product id: " + id);
}

renderProducts();