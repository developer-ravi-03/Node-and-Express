const sumRequestHandler = (req, res) => {
  console.log("In Sum Request Handler", req.url);
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });

  req.on("end", () => {
    const bodystr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodystr);
    const bodyObject = Object.fromEntries(params);
    console.log(bodyObject);

    const result = Number(bodyObject.first) + Number(bodyObject.second);
    console.log(result);
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>result</title>
  </head>
  <body>
    <h1>Your sum is ${result}</h1>
    
  </body>
</html>`);

    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
