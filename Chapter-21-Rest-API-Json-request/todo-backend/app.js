//core module
const path = require("path");

//external module
const express = require("express");
const { mongoose } = require("mongoose");
const { pageNotFound } = require("./controller/errors");
require("dotenv").config();
const DB_Path = process.env.MONGO_URI;
const cors = require("cors");

//local modules
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

//error page
app.use(pageNotFound);

const PORT = process.env.PORT;

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
