let cart = 0;

function addToCart() {
  cart++;
  document.getElementById("cartCount").innerText = cart;
}

function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};
