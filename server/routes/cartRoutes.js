const express = require("express");
const fs = require("fs");
const path = require("path");
const cartController = require("../controllers/cartController");

const router = express.Router();
const cartFile = path.join(__dirname, "../data/cart.json");

/* GET CART */
router.get("/", (req, res) => {
  const cart = require("../data/cart.json");
  res.json(cart);
});

/* CART COUNT */
router.get("/count", cartController.getCartCount);

/* ADD TO CART */
router.post("/", (req, res) => {
  const { id, name, price } = req.body;

  /* 🔥 VALIDATION */
  if (!id || !name || !price) {
    return res.status(400).json({
      error: "Invalid product data"
    });
  }

  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, "../data/cart.json");

  let cart = JSON.parse(fs.readFileSync(file));

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  fs.writeFileSync(file, JSON.stringify(cart, null, 2));
  res.json(cart);
});


/* UPDATE QUANTITY */
router.put("/:id", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, "../data/cart.json");

  let cart = JSON.parse(fs.readFileSync(file));
  const item = cart.find(i => i.id == req.params.id);
  if (item) item.qty = req.body.qty;

  fs.writeFileSync(file, JSON.stringify(cart, null, 2));
  res.json(cart);
});

/* REMOVE ITEM */
router.delete("/:id", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, "../data/cart.json");

  let cart = JSON.parse(fs.readFileSync(file));
  cart = cart.filter(i => i.id != req.params.id);

  fs.writeFileSync(file, JSON.stringify(cart, null, 2));
  res.json(cart);
})
module.exports = router;
