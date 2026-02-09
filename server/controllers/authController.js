const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ id: Date.now(), name, email, password });

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "User registered successfully" });
};
