exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
  
    req.flash("error_msg", `User don't authenticated, please log in`);
    res.redirect("/user/login");
  };