const helpers = {};

helpers.isAutenticated = (req, res, next) => {
  if (req.isAutenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Autorized");
  res.redirect("/users/signin");
};
module.exports = helpers;
