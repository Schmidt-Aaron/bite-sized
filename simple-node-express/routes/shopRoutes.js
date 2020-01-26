const express = require("express");

const router = express.Router();

router.use("/", (req, res) => {
  res.send("hello from the shop route!");
});

module.exports = router;
