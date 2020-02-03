const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  console.log("basic index");
  res.render("index");
});

module.exports = router;
