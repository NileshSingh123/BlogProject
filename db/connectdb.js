const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/blogproject";
const live_URL =
  "mongodb+srv://ns800622:neelesh12345@cluster0.vnzjdql.mongodb.net/BlogProject?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose
    .connect(live_URL)

    .then(() => {
      console.log("Database connected...");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
