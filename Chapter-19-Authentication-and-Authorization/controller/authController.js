const { check, validationResult } = require("express-validator");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login To Airbnb",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign-up To Airbnb",
    currentPage: "sign-up",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      fname: "",
      lname: "",
      email: "",
      userType: "",
    },
  });
};

exports.postSignUp = [
  check("fname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be atleast 2 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name should only contain alphabets"),

  check("lname")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name should only contain alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    // .isAlphanumeric()
    // .withMessage("Password should only contain alphabets and numbers")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Please select a valid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, { req }) => {
      if (!req.body.terms) {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { fname, lname, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/sign-up", {
        pageTitle: "Sign-up To Airbnb",
        currentPage: "sign-up",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          fname,
          lname,
          email,
          password,
          userType,
        },
      });
    }

    res.redirect("/login");
  },
];

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session", err);
    } else {
      res.redirect("/login");
    }
  });
};
