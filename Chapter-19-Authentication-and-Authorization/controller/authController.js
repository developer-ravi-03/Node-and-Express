exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login To Airbnb",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign-up To Airbnb",
    currentPage: "sign-up",
    isLoggedIn: false,
  });
};

exports.postSignUp = (req, res, next) => {
  console.log(req.body);
  // req.session.isLoggedIn = true;
  res.redirect("/login");
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
