//core module
const path = require("path");

//external module
const express = require("express");

//local modules
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");

const app = express();

//for ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(userRouter);
app.use(hostRouter);

//serving css file
app.use(express.static(path.join(rootdir, "public")));

//error page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
