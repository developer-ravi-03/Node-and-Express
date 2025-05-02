//core module
const path = require("path");

//external module
const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const { mongoose } = require("mongoose");
const multer = require("multer");
const DB_Path =
  "mongodb+srv://root:root@completecoding.w0wmg.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";

//local modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootdir = require("./utils/pathutils");
const { pageNotFound } = require("./controller/errors");

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

//for create random name for file
const randomString = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

// save image file in folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, path.join(rootdir, "public", "images"));
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

// file filter in backend - this function is for restrict in backend
const fileFilter = (req, file, cb) => {
  // Allowed image MIME types
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
//multer
app.use(multer(multerOptions).single("photo"));
//serving css file
app.use(express.static(path.join(rootdir, "public")));
app.use("/uploads", express.static(path.join(rootdir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootdir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootdir, "uploads")));

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
