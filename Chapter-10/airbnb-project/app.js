//core module
const path = require("path");

//external module
const express = require("express");

//local modules
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");

const app = express();

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

//error page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).sendFile(path.join(rootdir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
