//core module
const path = require("path");

//external module
const express = require("express");

//local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");
const { pageNotFound } = require("./controller/errors");
const { mongoose } = require("mongoose");

const app = express();

//for ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(storeRouter);
app.use(hostRouter);

//serving css file
app.use(express.static(path.join(rootdir, "public")));

//error page
app.use(pageNotFound);

const PORT = 3001;
const DB_Path =
  "mongodb+srv://root:root@completecoding.w0wmg.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";

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
