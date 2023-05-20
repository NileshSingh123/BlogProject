const AdminModal = require("../../modals/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, email, role } = req.admin;
      // const result = await AdminModal.find();

      if (role == "admin") {
        res.render("admin/dashboard", {
          n: name,
          e: email,
          role: role,
        });
      } else {
        res.render("admin/dashboard", {
          n: name,
          e: email,
          role: role,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static userdisplay = async (req, res) => {
    try {
      const result = await AdminModal.find();
      //console.log(result);
      // const { name, email } = req.admin;
      res.render("user/display", { c: result });
    } catch (error) {
      console.log(error);
    }
  };
  static approve = async (req, res) => {
    try {
      //console.log(req.body);
      const result = await AdminModal.findByIdAndUpdate(req.params.id, {
        comment: req.body.comment,
        status: req.body.status,
      });
      res.redirect("/user/userdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      const { name, email, password, confirmpassword } = req.body;
      const admin = await AdminModal.findOne({ email: email });

      if (admin) {
        req.flash("error", "Email already exist");
        res.redirect("/register");
      } else {
        if (name && email && password && confirmpassword) {
          if (password && confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const register = await new AdminModal({
              name: name,
              email: email,
              password: hashpassword,
            });

            await register.save();
            res.redirect("/login");
          } else {
            req.flash("error", "Password are not matching");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;

      if (email && password) {
        const admin = await AdminModal.findOne({
          email: email,
        });

        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (ismatched) {
            //multiple login
            if (admin.role == "admin") {
              //  generate jwt token
              const token = jwt.sign({ id: admin._id }, "vishwasgupta123");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            } else if (admin.status == "Pending") {
              const token = jwt.sign({ id: admin._id }, "vishwasgupta123");
              // console.log(token)
              res.cookie("token", token);
              req.flash("error", "you are not approvrd by admin");
              res.redirect("/login");
            } else if (admin.status == "Approved") {
              const token = jwt.sign({ id: admin._id }, "vishwasgupta123");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
          } else {
            req.flash("error", "Email are password is incorret ");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "you are not a register user");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "all fields are require");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminController;
