const AboutModel = require("../../modals/About");
const CategoryModel = require("../../modals/Category");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbrnbg1n1",
  api_key: "954334871439665",
  api_secret: "vuJky_zyIzrY9kY94cuL7nrR8x4",
  //secure: true,
});

class AboutController {
  static aboutdisplay = async (req, res) => {
    try {
      const data = await AboutModel.find();
      //console.log(data)
      res.render("admin/about/display", { a: data });
    } catch (error) {
      console.log(error);
    }
  };
  static insertabout = async (req, res) => {
    try {
      // console.log(req.files.image)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "aboutImage",
      });
      //console.log(myimage);
      // console.log(req.body)
      const result = new AboutModel({
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/aboutdisplay");
    } catch (error) {
      //   console.log(error);
      // redirect ke andar hmesha route ka url lete hai
      res.redirect("/admin/aboutdisplay");
    }
  };

  static aboutdelete = async (req, res) => {
    try {
      const remove = await AboutModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/aboutdisplay");

      //  console.log(req.params.id)
    } catch (error) {
      console.log(error);
    }
  };

  static aboutedit = async (req, res) => {
    try {
      const data = await AboutModel.findById(req.param.id);
      //console.log(result)
      res.render("admin/about/edit", { edit: data });
    } catch (error) {
      console.log(error);
    }
  };

  static aboutupdate = async (req, res) => {
    try {
      const update = await AboutModel.findByIdAndUpdate(req.params.id, {
        // description:req.body.description
      });

      //console.log(req.params.id);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AboutController;
