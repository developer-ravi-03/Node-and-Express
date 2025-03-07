const sumRequestHandler = (req, res) => {
  console.log("1. In Sum Request Handler", req.url);
  const body = [];
  let result;
  req.on("data", (chunks) => {
    body.push(chunks);
    console.log("2. chunk came");
  });

  req.on("end", () => {
    console.log("3. End event");
    const bodystr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodystr);
    const bodyObject = Object.fromEntries(params);
    console.log(bodyObject);

    result = Number(bodyObject.first) + Number(bodyObject.second);
    console.log(result);
  });

  console.log("4. sending responce");
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
};

exports.sumRequestHandler = sumRequestHandler;
