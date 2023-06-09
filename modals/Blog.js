const mongoose = require("mongoose");

//define schema
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    admin_id: {
      type: String,
      required: true,
    },
    auther: {
      type: String,
      required: true,
    },
    comment: {
      type: Object,
      default: {},
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//create collection
//blog is the name of collection
//blogschema is the field of blog collection
const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;
