const mongoose = require("mongoose");

//define schema
const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const CommentModal = mongoose.model("Comment", CommentSchema);
module.exports = CommentModal;
