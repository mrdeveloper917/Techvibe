const API = "http://localhost:5000/api/products";

fetch(API)
  .then((res) => res.json())
  .then((products) => {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    products.forEach((p) => {
      grid.innerHTML += `
        <a href="product-details.html?id=${p.id}">
          <div class="product-card"
            data-title="${p.name.toLowerCase()}"
            data-price="${p.price}"
            data-category="${p.category}"
            data-brand="${p.brand}"
            data-rating="${p.rating}">
            <img src="assets/images/banner.png">
            <h3>${p.name}</h3>
            <p class="rating">⭐ ${p.rating}</p>
            <p class="price">₹${p.price}</p>
            <button onclick="addToCart(${p.id}); event.preventDefault();">
              Add to Cart
            </button>
          </div>
        </a>
      `;
    });
  });

const CART_API = "http://localhost:5000/api/cart";

async function addToCart(product) {
  try {
    console.log("Sending to backend:", product); // debug

    const res = await fetch(CART_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      })
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Cart error:", err);
      return;
    }

    alert("Product added to cart");

  } catch (error) {
    console.error("Add to cart failed", error);
  }
}
