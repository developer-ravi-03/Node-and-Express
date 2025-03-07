const http = require("http");
const RequestHandler = require("./form");

const server = http.createServer(RequestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address  http://localhost:${PORT}`);
});
