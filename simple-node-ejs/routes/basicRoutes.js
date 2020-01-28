const express = require("express");
const path = require("path");
const router = express.Router();

// temp user array
const users = [];

router.get("/", (req, res, next) => {
  console.log("home route");
  res.render("form", {
    pageTitle: "Add a new user"
  });
});

router.post("/", (req, res, next) => {
  console.log("posted to root");
  const user = req.body.name;
  users.push(user);
  console.log(`users: ${users}`);
  res.status(302).redirect("/users");
});

router.get("/users", (req, res, next) => {
  console.log(`users: ${users}`);
  console.log("users route");
  res.render("users", {
    pageTitle: "Current Users",
    hasUser: users.length > 0 ? true : false,
    users: users
  });
});

module.exports = router;
