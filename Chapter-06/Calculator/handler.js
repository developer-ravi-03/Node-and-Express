const { sumRequestHandler } = require("./sum");

const requesthandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
  </head>
  <body>
    <h1>Welcome to calculator</h1>
    <a href="/calculator">Go to calculator</a>
  </body>
</html>`);

    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>calculator</title>
  </head>
  <body>
    <h1>Welcome to calculator</h1>
    <form action="/calculate-result" method="POST">
      <input type="text" placeholder="first number" name="first">
      <input type="text" placeholder="second number" name="second">
      <input type="submit" value="Sum">
    </form>
  </body>
</html>`);

    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404</title>
  </head>
  <body>
    <h1>404 Page Does not exist</h1>
    <a href="/">Go to home page</a>
  </body>
</html>`);

  return res.end();
};

exports.requesthandler = requesthandler;
