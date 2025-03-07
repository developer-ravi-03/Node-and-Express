const express = require("express")

const bodyParser = require("body-parser")

const app = express()

app.use((req,res,next)=>{
  console.log("First dummy middleware",req.url,req.method);
  next()
})

app.use((req,res,next)=>{
  console.log("second dummy middleware",req.url,req.method);
  next()
})

// app.use((req,res,next)=>{
//   console.log("Third dummy middleware",req.url,req.method);
//   res.send("<h1>Welcome to complete coding</h1>")
// })

app.get("/",(req,res,next)=>{
  console.log("handling/for get",req.url,req.method);
  res.send(`<h1>Welcome to complete coding</h1>`)
})

app.get("/contact-us",(req,res,next)=>{
  console.log("handling /contact-us for get",req.url,req.method);
  res.send(`
    <h1>Please give your details</h1>
    <form action="/contact-us" method="POST">
    <input type="text" name="username" placeholder="Enter username"><br>
    <input type="email" name="email" placeholder="Enter email"><br>
    <button type="submit">Submit</button>
    `)
})

app.post("/contact-us",(req,res,next)=>{
  console.log("first handling",req.url,req.method,req.body);
  next()
})

app.use(bodyParser.urlencoded())

app.post("/contact-us",(req,res,next)=>{
  console.log("handling /contact-us for POST",req.url,req.method,req.body);
  res.send(`<h1>Thanks for your details</h1>`)
})

const PORT=3000
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
  
})