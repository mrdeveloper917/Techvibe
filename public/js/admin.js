const API = "http://localhost:5000/api/products";

/* ============================
   ADD PRODUCT
============================ */
async function addProduct() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const categoryInput = document.getElementById("category");
  const brandInput = document.getElementById("brand");

  if (
    !nameInput.value ||
    !priceInput.value ||
    !categoryInput.value ||
    !brandInput.value
  ) {
    alert("Please fill all fields");
    return;
  }

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    category: categoryInput.value.toLowerCase(),
    brand: brandInput.value.toLowerCase(),
    rating: 4.5
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  alert("✅ Product Added Successfully");

  nameInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  brandInput.value = "";

  loadProducts();
}

/* ============================
   LOAD ALL PRODUCTS
============================ */
async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.name} - ₹${p.price}
      <button onclick="deleteProduct(${p.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

/* ============================
   DELETE PRODUCT
============================ */
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

/* ============================
   INIT
============================ */
loadProducts();
