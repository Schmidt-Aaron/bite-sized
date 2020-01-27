const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const path = require("path");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.get("/", shopRoutes);

app.get("/add-product", adminRoutes);

// handle all http requests not covered above with a 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

// start server and listen
app.listen(port, () => console.log(`Server listening on ${port}`));
