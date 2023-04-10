const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/auth");

    console.log("Connected");
  } catch (e) {
    console.log("Connection error" + e);
  }
};

connect();

module.exports = mongoose.connect;
