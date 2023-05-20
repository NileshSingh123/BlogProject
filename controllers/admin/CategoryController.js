const CategoryModel = require("../../modals/Category");
const AdminModal = require("../../modals/Admin");
class CategoryController {
  static categorydisplay = async (req, res) => {
    try {
      const data = await CategoryModel.find();
      const { role } = req.admin;
      // const result = await AdminModal.find();

      if (role == "admin") {
        res.render("admin/category/insert", {
          d: data,
          role: role,
        });
      } else {
        res.render("admin/category/insert", {
          d: data,
          role: role,
        });
      }

      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  static insertcategory = async (req, res) => {
    try {
      // console.log(req.body.catname)
      const result = new CategoryModel({
        catname: req.body.catname,
      });
      await result.save();
      // console.log(result)
      res.redirect("/admin/categoryinsert");
    } catch (error) {
      console.log(error);
    }
  };

  static categoryDelete = async (req, res) => {
    try {
      //cloudinary server image delete code
      const category = await CategoryModel.findById(req.params.id);
      // const imageid = blog.image.public_id
      // // console.log(imageid)
      // await cloudinary.uploader.destroy(imageid)

      await CategoryModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/categoryinsert");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CategoryController;
