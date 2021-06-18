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
const allRefreshToken = require("./refreshTokens");
app.use("/auth", authRouter);
async function validateRequest(req, res, next) {
  console.log("validatingRequest");
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "authorization token not provided" });
    return;
  }
  let token = header.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).json({ message: "authorization token not provided" });
    return;
  } else {
    console.log("checking the token");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log("there is an error");
        res.status(401).json({ message: "invalid token" });
        return;
      } else next();
    });
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
function validateRefresh(req, res, next) {
  console.log("validating the refresh");
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "refresh token not provided" });
    return;
  }
  let token = header.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).json({ message: "refresh token not provided" });
    return;
  } else {
    console.log("checking the token");
    console.log(process.env.REFRESH_TOKEN_SECRET, token);
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      function (err, decoded) {
        if (err || !allRefreshToken.has(token)) {
          console.log("there is an error", err);
          res.status(401).json({ message: "invalid refresh token token" });
          return;
        } else {
          allRefreshToken.delete(token);
          req.decodedMessage = decoded;
          next();
        }
      }
    );
  }
}
app.get("/refresh", validateRefresh, async (req, res) => {
  let payload = {
    email: req.decodedMessage.email,
    userName: req.decodedMessage.userName,
  };

  let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_DATE,
  });
  allRefreshToken.add(refreshToken);
  console.log(refreshToken);
  res.status(200).json({ Access_token: token, refresh_token: refreshToken });
  return;
});
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
