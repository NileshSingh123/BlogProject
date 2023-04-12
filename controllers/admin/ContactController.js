const ContactModel = require("../../modals/Contact");

class ContactController {
  static contactinsert = async (req, res) => {
    try {
      console.log(req.body);
      const data = await new ContactModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      });
      (await data.save()) / res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
  };

  static contactdisplay = async (req, res) => {
    try {
      const data = await ContactModel.find();
      console.log(data);
      res.render("admin/contact/add", { c: data });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ContactController;
