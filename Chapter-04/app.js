const http = require('http');

const server = http.createServer((req, res) =>{
  console.log(req.url, req.method, req.headers); 

  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete coding</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    return res.end()

  } else if(req.url === '/products'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Product Page</title></head>');
    res.write('<body><h1>This is product page</h1></body>');
    res.write('</html>');
    return res.end()

  }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Not any url</title></head>');
    res.write('<body><h1>Like share and subscribe</h1></body>');
    res.write('</html>');
    res.end()



 
})

const PORT = 3000;
server.listen(PORT,()=>{
  console.log(`Server is running on address  http://localhost:${PORT}`);
});
