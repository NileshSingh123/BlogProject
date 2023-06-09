const BlogModel = require("../../modals/Blog");
const AdminModal = require("../../modals/Admin");
const { ObjectId } = require("mongodb");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbrnbg1n1",
  api_key: "954334871439665",
  api_secret: "vuJky_zyIzrY9kY94cuL7nrR8x4",
  //secure: true,
});

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const data = await BlogModel.find({ admin_id: req.admin.id });
      const result = await BlogModel.find();
      const { role, id } = req.admin;
      // const result = await AdminModal.find();
      //console.log(data)

      res.render("admin/blog/display", { d: data, role: role, r: result });
    } catch (error) {
      console.log(error);
    }
  };
  static insertblog = async (req, res) => {
    try {
      const file = req.files.image;
      const id = req.params.id;
      const { _id } = req.admin;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const result = new BlogModel({
        title: req.body.title,
        auther: req.body.auther,
        admin_id: _id,
        description: req.body.description,

        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await result.save();
      res.redirect("/admin/blogdisplay");

      // console.log(myimage)
      // console.log(req.files.image)
      //console.log(req.body);
      // const result= new BlogModel({
      //   title:req.body.title,
      //   description:req.body.description

      // await result.save()
      // console.log(result)
      //'/admin/blogdisplay use for route
      // res.redirect('/admin/blogdisplay')
    } catch (error) {
      console.log(error);
    }
  };
  static blogview = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { role, name, email } = req.admin;
      const data = await BlogModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/blog/view", {
        view: data,
        role: role,
        n: name,
        e: email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static blogedit = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { role } = req.admin;
      const data = await BlogModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/blog/edit", { edit: data, role: role });
    } catch (error) {
      console.log(error);
    }
  };

  static blogupdate = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)
      //first delete the image
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      //console.log(imageid)
      await cloudinary.uploader.destroy(imageid);
      //secont update image
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const update = await BlogModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await update.save();
      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static blogDelete = async (req, res) => {
    try {
      //cloudinary server image delete code
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid);

      await BlogModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  // addcomment
  static addcomment = async (req, res) => {
    try {
      var post_id = req.body.post_id;
      var username = req.body.username;
      var comment = req.body.comment;
      var email = req.body.email;

      var comment_id = new ObjectId();
      await BlogModel.findByIdAndUpdate(
        { _id: post_id },
        {
          $push: {
            comment: {
              d_id: comment_id,
              username: username,
              comment: comment,
              email: email,
            },
          },
        }
      );

      res.status(200).send({ success: true, msg: "Comment added!" });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = BlogController;
