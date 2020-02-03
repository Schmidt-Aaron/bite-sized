const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

// use pug as view engine
app.set("views", "./views");
app.set("view engine", "pug");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
const basicRoutes = require("./routes/basicRoutes");
app.use("/", basicRoutes);

app.listen(PORT, console.log(`App running on ${PORT}`));
