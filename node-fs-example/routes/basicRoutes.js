const express = require("express");
const router = express.Router();

// serve index page
router.get("/", (req, res) => {
  console.log("basic index");
  res.render("index");
});

module.exports = router;
