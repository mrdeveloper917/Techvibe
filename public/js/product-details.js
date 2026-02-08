const API = "http://localhost:5000/api/products";
const id = new URLSearchParams(window.location.search).get("id");

let currentProduct = null;

/* FETCH PRODUCT BY ID */
fetch(`${API}/${id}`)
  .then(res => res.json())
  .then(product => {
    currentProduct = product;

    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = product.price;
    document.getElementById("productRating").innerText = product.rating;

    // Specs (dummy mapping by category)
    const specs = document.getElementById("productSpecs");
    specs.innerHTML = "";

    if (product.category === "laptop") {
      specs.innerHTML += "<li>Intel Core i7 Processor</li>";
      specs.innerHTML += "<li>16GB RAM</li>";
      specs.innerHTML += "<li>512GB SSD</li>";
      specs.innerHTML += "<li>Dedicated Graphics</li>";
    } else if (product.category === "mobile") {
      specs.innerHTML += "<li>6.6\" AMOLED Display</li>";
      specs.innerHTML += "<li>5000mAh Battery</li>";
      specs.innerHTML += "<li>5G Support</li>";
    } else {
      specs.innerHTML += "<li>High Quality Build</li>";
      specs.innerHTML += "<li>Best in Class Performance</li>";
    }
  });

/* IMAGE CHANGE */
function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

/* ADD TO CART */
const CART_API = "http://localhost:5000/api/cart";

function addToCart() {
  const product = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price
  };

  fetch(CART_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
  .then(() => {
    alert("✅ Added to cart");
    loadCartCount();
  });
}
