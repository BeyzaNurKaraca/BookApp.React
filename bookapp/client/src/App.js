import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [newname, setnewName] = useState("");
  const [newauthor, setnewAuthor] = useState("");
  const [newpage, setnewPage] = useState(0);
  const [newpublisher, setnewPublisher] = useState("");
  const [newimg, setnewImg] = useState("");
  const [newdescription, setnewDescription] = useState("");
  useEffect(() => {
    axios //gelen anlık verileri tutarız
      .get("http://localhost:5000/getBooks")
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  }, []);
  const createBook = () => {
    axios
      .post("http://localhost:5000/createBook", {
        name: name,
        author: author,
        page: page,
        description: description,
        publisher: publisher,
        page: page,
        img: img,
      })
      .then((res) => {
        alert("Book Created");
      });
  };
  const updateBook = (id) => {
    console.log(id);
    axios
      .put("http://localhost:5000/updateBook", {
        id: id,
        newname: newname,
        newauthor: newauthor,
        newimg: newimg,
      })
      .then((res) => {
        alert("Kitap Güncellendi.");
      });
  };
  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/deleteBook/${id}`);
  };
  return (
    <div className="App">
      <div className="height d-flex justify-content-center align-items-center">
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 col-sm-12">
              <div className="card radius-15">
                <div className="card-body text-center">
                  <div className="p-4 border radius-15">
                    <img //fotoğtafı olmayan kitap için default bi foto atama yapmak için ternary kullanırız
                      src={
                        book.img === ""
                          ? "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                          : book.img
                      } //turnary operatörünü kullandık.
                      width={110}
                      height={110}
                      className="rounded-circle shadow"
                      alt=""
                    />

                    <h5 className="mb-0 mt-5">{book.name}</h5>
                    <p className="mb-3">{book.author}</p>
                    <p className="mb-3">Page: {book.page}</p>
                    <p className="mb-3">{book.description}</p>
                    <p className="mb-3"> {book.publisher}</p>

                    <input
                      className="form-control p-1 m-1"
                      placeholder="Güncellenecek Kitabı Giriniz"
                      onChange={(e) => setnewName(e.target.value)}
                    ></input>
                    <input
                      className="form-control p-1 m-1"
                      placeholder="Güncellenecek Yazarı Giriniz"
                      onChange={(e) => setnewAuthor(e.target.value)}
                    ></input>
                    <input
                      className="form-control p-1 m-1"
                      placeholder="Güncellenecek Kitap Resmini Giriniz"
                      onChange={(e) => setnewImg(e.target.value)}
                    ></input>
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateBook(book._id);
                      }}
                    >
                      Güncelle
                    </button>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteBook(book._id);
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          ;
        </div>
        <div className="container">
          <div className="col">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h2> CREATE A BOOK</h2>
                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kitap Adını Giriniz."
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Yazarı Giriniz."
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Açıklamayı Giriniz."
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Yayınevini Giriniz."
                          onChange={(e) => setPublisher(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Sayfa Sayısını Giriniz."
                          onChange={(e) => setPage(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Fotoğraf Linki Giriniz."
                          onChange={(e) => setImg(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={createBook}
                        >
                          Kitabı Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
