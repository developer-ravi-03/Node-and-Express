const http = require("http");

//syntax error
const testingSyntax = require("./syntax");

//runtime error
const runtime = require("./runtime");

//logical error
const logical = require("./logical");


const RequestHandler = require("./form");

const server = http.createServer(RequestHandler);

// const server = http.createServer((req, res) => {
//   console.log(req);
//   // testingSyntax();
//   // runtime();

//   logical();
// });

const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
