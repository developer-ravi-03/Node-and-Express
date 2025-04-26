exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login To Airbnb",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  // console.log(req.body);
  // res.cookie("isLoggedIn", true);
  // // req.isLoggedIn = true;
  // res.redirect("/");

  //this is express session
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  // res.redirect("/login");

  //for destroying the session
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session", err);
    } else {
      res.redirect("/login");
    }
  });
};
