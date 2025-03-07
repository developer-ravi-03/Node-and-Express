//core module
// const http = require("http");

//External module
const express = require('express')

//Local module
const RequestHandler = require("./form");

const app=express();

// app.use((req,res,next)=>{
//   console.log("Came in first middleware", req.url,req.method);
//   next()
// })

// app.use((req,res,next)=>{
//   console.log("Came in second middleware", req.url,req.method);
//   res.send("<p>welcome to first express chapter</p>")
// })

// const server = http.createServer(app);

app.get("/",(req,res,next)=>{
  console.log("Came in first middleware", req.url,req.method);
  // res.send("<p>came from first middleware</p>")
  next()
})

app.post("/submit-details",(req,res,next)=>{
  console.log("Came in second middleware", req.url,req.method);
  res.send("<p>welcome to first express chapter</p>")
})



app.use("/",(req,res,next)=>{
  console.log("Came in first middleware", req.url,req.method);
  
  res.send("<p>came from another middleware</p>")
  // next()
})



const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
