const jwt = require("jsonwebtoken");
const AdminModal = require("../modals/Admin");

const checkAdminAuth = async (req, res, next) => {
  // console.log('hello middleware')
  const { token } = req.cookies;
  //console.log(token)
  if (!token) {
    req.flash("error", "unauthrized user");
    res.redirect("/login");
  } else {
    const data = jwt.verify(token, "vishwasgupta123");
    // console.log(data)
    const admin = await AdminModal.findOne({ _id: data.id });
    // console.log(admin)
    req.admin = admin;
    next();
  }
};
module.exports = checkAdminAuth;
