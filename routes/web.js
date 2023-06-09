const express = require("express");
const AdminController = require("../controllers/admin/AdminController");
const BlogController = require("../controllers/admin/BlogController");
const CategoryController = require("../controllers/admin/CategoryController");
const router = express.Router();
const FrontController = require("../controllers/FrontController");
const AboutController = require("../controllers/admin/AboutController");
const ContactController = require("../controllers/admin/ContactController");
const auth = require("../middleware/auth");

//comment

// front controoler route path
router.get("/", FrontController.home);
router.get("/about", FrontController.about);
router.get("/contact", FrontController.contact);
router.get("/blog", FrontController.blog);
router.get("/login", FrontController.login);
router.get("/register", FrontController.register);
router.get("/detail/:id", FrontController.detail);

//admin controller
router.get("/admin/dashboard", auth, AdminController.dashboard);
router.get("/user/userdisplay/", auth, AdminController.userdisplay);
router.post("/adminregister", AdminController.register);
router.post("/verifylogin", AdminController.verifylogin);
router.get("/logout", AdminController.logout);
router.post("/updateverified/:id", AdminController.approve);

//blog controoler
router.get("/admin/blogdisplay", auth, BlogController.displayBlog);
router.post("/insertblog", auth, BlogController.insertblog);
router.get("/admin/blogview/:id", auth, BlogController.blogview);
router.get("/admin/blogedit/:id", auth, BlogController.blogedit);
router.post("/blogupdate/:id", auth, BlogController.blogupdate);
router.get("/admin/blogdelete/:id", auth, BlogController.blogDelete);
router.post("/add-comment", BlogController.addcomment);

//category controller
router.get("/admin/categoryinsert", auth, CategoryController.categorydisplay);
router.post("/insertcategory", CategoryController.insertcategory);
router.get("/admin/categorydelete/:id", CategoryController.categoryDelete);

//About Controller//
router.get("/admin/aboutdisplay", auth, AboutController.aboutdisplay);
router.post("/insertabout", AboutController.insertabout);
router.get("/admin/aboutdelete/:id", AboutController.aboutdelete);
router.get("/admin/aboutedit/:id", AboutController.aboutedit);
router.post("/aboutupdate/:id", AboutController.aboutupdate);

// contact controller
router.get("/admin/contactadd", auth, ContactController.contactdisplay);
router.post("/insertcontact", ContactController.contactinsert);

module.exports = router;

//teacher
// app.get('/teacher/display')
