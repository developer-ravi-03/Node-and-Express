exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login To Airbnb",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
};
