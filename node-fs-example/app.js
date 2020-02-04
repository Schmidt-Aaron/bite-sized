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
const dogController = require("./controllers/dog");
app.use("/", basicRoutes);

app.post("/dogs", dogController.postDogs);
app.get("/dogs", dogController.getDogs);

// set up 404 catch-all
const errorController = require("./controllers/error");
app.use(errorController.is404);

app.listen(PORT, console.log(`App running on ${PORT}`));
