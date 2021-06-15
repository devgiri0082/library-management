const express = require("express");
const { showBooks } = require("../Controller/BookController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let books = await showBooks();
    res.status(200).json({ books: books });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
