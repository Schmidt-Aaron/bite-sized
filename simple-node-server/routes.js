const routeHandler = (req, res) => {
  const { url, method } = req;

  // handle root requests
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Simple Node Server</title></head>");
    res.write("<body>");
    res.write("<h1>Welcome to a Simple Node Server!</h1>");
    res.write(
      '<form method="POST" action="/create-user" ><label for="name">UserName</label>     <input type="text" id="name" name="name" /><button type="submit">Submit</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  // handle /users requests
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Simple Node Server</title></head>");
    res.write("<body>");
    res.write("<h1>Active Users</h1>");
    res.write(
      `<op>
        <li>johnny</li>
        <li>billy</li>
        <li>anne</li>
        <li>madison</li>
        <li>lily</li>
        <li>jessica</li>
      </op>`
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  // deal with form submission
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const name = parsedBody.split("=")[1];
      console.log(name);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

module.exports = routeHandler;
