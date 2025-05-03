//core module
const path = require("path");

//external module
const express = require("express");
const { mongoose } = require("mongoose");
const { pageNotFound } = require("./controller/errors");
const DB_Path =
  "mongodb+srv://root:root@completecoding.w0wmg.mongodb.net/Todo?retryWrites=true&w=majority&appName=CompleteCoding";

//local modules

const app = express();
app.use(express.urlencoded());
//serving css file
app.use(express.static(path.join(rootdir, "public")));

//error page
app.use(pageNotFound);

const PORT = 3001;

mongoose
  .connect(DB_Path)
  .then(() => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in connecting to the database : ", err);
  });
