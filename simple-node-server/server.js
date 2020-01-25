// bring in node http module
const http = require("http");
const routes = require("./routes");

// set up our server and set it to listen on port 3000
const server = http.createServer(routes, console.log("server is running"));

server.listen(3000);
