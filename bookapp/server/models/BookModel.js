const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
});
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
