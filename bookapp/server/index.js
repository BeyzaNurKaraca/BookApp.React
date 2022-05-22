const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const BookModel = require("./models/BookModel");
const cors = require("cors");
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://beyza:1234@cluster0.t4fdk.mongodb.net/bookstore-app?retryWrites=true&w=majority"
);
app.get("/getBooks", (req, res) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/createBook", async (req, res) => {
  const book = req.body;
  const newBook = new BookModel(book);
  await newBook.save();
  res.json(book + "Kitap Girişi Başarılı.");
});
app.put("/updateBook", async (req, res) => {
  const newname = req.body.newname;
  const newauthor = req.body.newauthor;
  const newimg = req.body.newimg;
  const id = req.body.id;
  try {
    await BookModel.findById(id, (error, updatedBook) => {
      updatedBook.name = newname;
      updatedBook.author = newauthor;
      updatedBook.img = newimg;
      updatedBook.save();
    });
  } catch (error) {
    console.log(error);
  }
  res.json("Updated");
});
app.delete("/deleteBook/:id", async (req, res) => {
  const id = req.params.id;
  await BookModel.findByIdAndRemove(id).exec();
  res.send();
});
app.listen(5000, () => {
  console.log("Server is running!");
});
