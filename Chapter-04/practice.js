const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>Home Page</h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if(req.url === "/men"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>Men Page</h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if(req.url === "/women"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>Women Page</h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if(req.url === "/cart"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>Cart Page</h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }


  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice set</title>
</head>
<body>
  <ul>
    <li><a href="/home">home</a></li>
    <li><a href="/men">Men</a></li>
    <li><a href="/women">Women</a></li>
    <li><a href="/cart">Cart</a></li>
  </ul>
</body>
</html>
    `);
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address  http://localhost:${PORT}`);
});
