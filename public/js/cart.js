const API = "http://localhost:5000/api/cart";

async function loadCart() {
  try {
    const res = await fetch(API);
    const cart = await res.json();

    const container = document.getElementById("cartItems");
    const itemCount = document.getElementById("itemCount");
    const totalPrice = document.getElementById("totalPrice");
    const totalPriceFinal = document.getElementById("totalPriceFinal");

    container.innerHTML = "";

    /* EMPTY CART UI */
    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add items to see them here</p>
          <a href="products.html" class="shop-btn">Shop Now</a>
        </div>
      `;

      itemCount.innerText = 0;
      totalPrice.innerText = 0;
      if (totalPriceFinal) totalPriceFinal.innerText = 0;
      return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;

      container.innerHTML += `
        <div class="cart-item">
          <img src="assets/images/banner.png" alt="${item.name}">

          <div class="cart-details">
            <h4>${item.name}</h4>
            <p class="price">₹${item.price}</p>

            <div class="qty-controls">
              <button 
                ${item.qty === 1 ? "disabled" : ""}
                onclick="updateQty(${item.id}, ${item.qty - 1})">
                −
              </button>

              <span>${item.qty}</span>

              <button onclick="updateQty(${item.id}, ${item.qty + 1})">
                +
              </button>
            </div>

            <button class="remove-btn" onclick="removeItem(${item.id})">
              Remove
            </button>
          </div>
        </div>
      `;
    });

    itemCount.innerText = count;
    totalPrice.innerText = total;
    if (totalPriceFinal) totalPriceFinal.innerText = total;

  } catch (err) {
    console.error("Cart load failed", err);
  }
}

/* UPDATE QUANTITY */
async function updateQty(id, qty) {
  if (qty < 1) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  });

  loadCart();
}

/* REMOVE ITEM */
async function removeItem(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadCart();
}

/* INIT */
loadCart();
