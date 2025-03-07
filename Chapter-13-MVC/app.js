//core module
const path = require("path");

//external module
const express = require("express");

//local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");
const { pageNotFound } = require("./controller/errors");

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
