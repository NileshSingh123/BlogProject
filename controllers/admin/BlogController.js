const BlogModel = require("../../modals/Blog");
const AdminModal = require("../../modals/Admin");
const CommentModal = require("../../modals/Comment");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
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

  //comment
  static comment = async (req, res) => {
    try {
      //console.log(req.body.comment);
      //console.log(req.params.id);

      const comments = new CommentModal({
        comment: req.body.comment,
      });
      await comments.save();
      console.log(comments);
      // res.redirect("/detail/:id");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = BlogController;
