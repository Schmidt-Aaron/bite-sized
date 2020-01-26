const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.get("/", shopRoutes);

app.get("/admin", adminRoutes);

// handle all http requests not covered above with a 404
app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

// start server and listen
app.listen(port, () => console.log(`Server listening on ${port}`));
