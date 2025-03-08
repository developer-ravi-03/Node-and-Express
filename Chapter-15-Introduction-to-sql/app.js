//core module
const path = require("path");

//external module
const express = require("express");

//local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");
const { pageNotFound } = require("./controller/errors");
const db = require("./utils/databaseUtils");

// db.execute(`SELECT * FROM homes`)
//   // .then((result) => {
//   //   console.log("Getting from db:", result);
//   // })
//   .then(([rows, fields]) => {
//     console.log("Getting from db:", rows);
//   })
//   .catch((err) => {
//     console.log("Error while reading homes:", err);
//   });

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
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
