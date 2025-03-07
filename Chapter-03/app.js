const http = require('http');

// function requestHandler(req, res) {
//   console.log(req);
  
// }

// http.createServer(requestHandler)

//2nd way
// http.createServer(function(req, res) {
//   console.log(req);
  
// })

//3rd way
const server = http.createServer((req, res) =>{
  console.log(req);  
  // process.exit();//exit the loop of server 
})

const PORT = 3000;
server.listen(PORT,()=>{
  console.log(`Server is running on address  http://localhost:${PORT}`);
});
