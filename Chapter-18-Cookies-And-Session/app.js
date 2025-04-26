//core module
const path = require("path");

//external module
const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const DB_Path =
  "mongodb+srv://root:root@completecoding.w0wmg.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";

//local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");
const { pageNotFound } = require("./controller/errors");
const { mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

//for ejs
app.set("view engine", "ejs");
app.set("views", "views");

//this is for mongodb session store in database for permant store of cookie
const store = new mongoDbStore({
  uri: DB_Path,
  collection: "sessions",
});

app.use(express.urlencoded());

//this is for express session on the place of normal cookie with express node modules
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use((req, res, next) => {
  // console.log("Middleware is running", req.get("Cookie"));
  // req.isLoggedIn = req.get("Cookie")
  //   ? req.get("Cookie").split("=")[1] === "true"
  //   : false;
  // next();

  // with use of express session on the place of normal cookie
  req.isLoggedIn = req.session.isLoggedIn;

  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  // if (!req.isLoggedIn) {
  //   return res.redirect("/login");
  // }
  // next();

  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(hostRouter);

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
