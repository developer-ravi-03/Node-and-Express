const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login To Airbnb",
    currentPage: "login",
    errors: [],
    oldInput: { email: "" },
    isLoggedIn: false,
    user: {},
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign-up To Airbnb",
    currentPage: "sign-up",
    isLoggedIn: false,
    user: {},
    errors: [],
    oldInput: {
      fname: "",
      lname: "",
      email: "",
      userType: "",
    },
  });
};

//this is for signup
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
        user: {},
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

    //hashing the password and saving in database
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName: fname,
          lastName: lname,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error while creating user", err);
        res.status(422).render("auth/sign-up", {
          pageTitle: "Sign-up To Airbnb",
          user: {},
          currentPage: "sign-up",
          isLoggedIn: false,
          errors: [err],
          oldInput: {
            fname,
            lname,
            email,
            password,
            userType,
          },
        });
      });

    // saving the user to database
    // const user = new User({
    //   firstName: fname,
    //   lastName: lname,
    //   email,
    //   password,
    //   userType,
    // });
    // user
    //   .save()
    //   .then(() => {
    //     console.log("User created successfully");
    //     res.redirect("/login");
    //   })
    //   .catch((err) => {
    //     console.log("Error while creating user", err);
    //     res.status(500).render("auth/sign-up", {
    //       pageTitle: "Sign-up To Airbnb",
    //       currentPage: "sign-up",
    //       isLoggedIn: false,
    //       errors: [err.message],
    //       oldInput: {
    //         fname,
    //         lname,
    //         email,
    //         password,
    //         userType,
    //       },
    //     });
    //   });
  },
];

//for login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  //this for check user is exist or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login To Airbnb",
      currentPage: "login",
      isLoggedIn: false,
      user: {},
      errors: ["User does not exist"],
      oldInput: { email },
    });
  }

  //for compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login To Airbnb",
      user: {},
      currentPage: "login",
      isLoggedIn: false,
      errors: ["invalid password"],
      oldInput: { email },
    });
  }

  req.session.isLoggedIn = true;
  //this line for all user data
  req.session.user = user;
  await req.session.save();
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
