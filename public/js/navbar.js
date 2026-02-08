const CART_COUNT_API = "http://localhost:5000/api/cart/count";

/* LOAD CART COUNT */
async function loadCartCount() {
  try {
    const res = await fetch(CART_COUNT_API);
    const data = await res.json();
    document.getElementById("cartCount").innerText = data.count;
  } catch (err) {
    console.error("Failed to load cart count");
  }
}

/* SEARCH REDIRECT */
function navSearch(value) {
  if (value.length > 2) {
    window.location.href = `products.html?search=${value}`;
  }
}

/* MOBILE MENU */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

/* INIT */
loadCartCount();
