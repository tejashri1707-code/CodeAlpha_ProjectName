const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

const db = new sqlite3.Database("database.db");

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
);
db.run(
  "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, price INTEGER)"
);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing data");
  }
app.post("/order", (req, res) => {
  const { product, price } = req.body;

  if (!product || !price) {
    return res.status(400).send("Order data missing");
  }

  db.run(
    "INSERT INTO orders (product, price) VALUES (?, ?)",
    [product, price],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Order failed");
      }
      res.send("Order placed successfully");
    }
  );
});

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("DB error");
      }
      res.send("User registered successfully");
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

