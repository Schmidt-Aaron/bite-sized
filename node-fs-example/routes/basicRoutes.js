const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("basic index");
  res.render("index");
});

router.post("/", (req, res) => {
  console.log("form submitted");
  console.log(`${req.body.name} is a ${req.body.breed}`);
  res.redirect("/");
});

module.exports = router;
