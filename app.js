const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", async (req, res) => {
  res.render("index");
});
app.get("/about", async (req, res) => {
      res.render("about");
});
app.get("/project", async (req, res) => {
      res.render("project");
});
app.get("/register", async (req, res) => {
      res.render("register");
});
app.get("/login", async (req, res) => {
      res.render("login");
});
app.get("/add-category", async (req, res) => {
      res.render("add-category");
});

app.get("/add-post", async (req, res) => {
      res.render("add-post");
});


const port = 3000;
app.listen(port, () => {
  console.log(`sever ${port} portunda çalışmaya başladı`);
});
