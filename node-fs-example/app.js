const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");

const PORT = process.env.PORT || 3000;

// spin up express
const app = express();

// declare favicon middleware first
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// use pug as view engine
app.set("views", "./views");
app.set("view engine", "pug");

// set public file directory
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
const basicRoutes = require("./routes/basicRoutes");
app.use("/", basicRoutes);

app.listen(PORT, console.log(`App running on ${PORT}`));
