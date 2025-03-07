const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
  console.log(req.url, req.method, req.headers); 

  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete coding</title></head>');
    res.write('<body><h1>Enter your details</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter username"><br><br>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" name="gender" id="male" value="male"')
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" name="gender" id="female" value="female"');
    res.write('<br><button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</body>')
    res.write('</html>');
    return res.end()

  }else if(req.url.toLowerCase() === '/submit-details' && req.method === 'POST'){
    fs.writeFileSync('user.txt', 'Ravi Kumar');
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Not any url</title></head>');
  res.write('<body><h1>Like share and subscribe</h1></body>');
  res.write('</html>');
  res.end(); 
});

const PORT = 3000;
server.listen(PORT,()=>{
  console.log(`Server is running on address  http://localhost:${PORT}`);
});
