require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let morgan = require("morgan");
let cors = require("cors");
let jwt = require("jsonwebtoken");
const {
  showBooks,
  addBook,
  deleteWithId,
} = require("./Controller/BookController");
const { listAllGenre } = require("./Controller/CategoriesController");
(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();
const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "pug");
//importing routes
const bookRouter = require("./routes/books");
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
async function validateRequest(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "authorization token not provided" });
    return;
  }
  let token = header.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "authorization token not provided" });
    return;
  } else {
    try {
      console.log(token);
      let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "invalid token" });
    }
  }
}
app.use("/books", validateRequest, bookRouter);
app
  .route("/")
  .get(async (req, res) => {
    let data = await showBooks();
    console.log(data);
    res.render("index", { message: data });
  })
  .post(async (req, res) => {
    let { title, price, genre, authors } = req.body;
    // console.log(title, price, genre, authors, "Hello");
    await addBook(title, price, genre, authors.split(", "));
    let data = await showBooks();
    res.render("index", { message: data });
  });

app.get("/new-Book", async (req, res) => {
  let genres = await listAllGenre();
  let onlyGenres = genres.map((elem) => elem.title);
  console.log(onlyGenres);
  res.render("form", { genres: onlyGenres });
});

// app.get("/Books", async (req, res) => {
//   let books = await showBooks();
//   res.json(books);
// });
app.delete("/Books/:id", async (req, res) => {
  console.log(req.params.id);
  let deleted = await deleteWithId(req.params.id);
  console.log(deleted);
  res.json(deleted);
});
const PORT = 3300;
app.listen(PORT, () => {
  console.log("listening at port 3300");
});
