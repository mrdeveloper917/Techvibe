const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/products.json");

/* GET ALL PRODUCTS */
router.get("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath));
  res.json(products);
});

/* GET PRODUCT BY ID */
router.get("/:id", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath));
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

/* ADD PRODUCT (ADMIN) */
router.post("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath));

  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

  res.json(newProduct);
});

/* DELETE PRODUCT */
router.delete("/:id", (req, res) => {
  let products = JSON.parse(fs.readFileSync(filePath));
  products = products.filter(p => p.id != req.params.id);

  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.json({ message: "Deleted" });
});

module.exports = router;
