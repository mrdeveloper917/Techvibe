const fs = require("fs");
const path = require("path");

const cartFile = path.join(__dirname, "../data/cart.json");

/* GET CART COUNT */
exports.getCartCount = (req, res) => {
  const cart = JSON.parse(fs.readFileSync(cartFile));
  let count = 0;

  cart.forEach(item => {
    count += item.qty;
  });

  res.json({ count });
};
