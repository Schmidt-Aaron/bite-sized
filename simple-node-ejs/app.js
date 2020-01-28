const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const basicRoutes = require("./routes/basicRoutes");

const app = express();

// set up view dir + view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up public dir for static assets
// app.use(express.static());

// set up basic route handler
app.use("/", basicRoutes);

// handle all http requests not covered above with a 404
app.use((req, res, next) => {
  res.status(404).render("not-found", { pageTitle: "Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
