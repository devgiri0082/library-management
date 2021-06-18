const express = require("express");
const { showBooks } = require("../Controller/BookController");
const { listAllGenre } = require("../Controller/CategoriesController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("I am at next");
    let books = await showBooks();
    res.status(200).json({ books: books });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});
router.get("/categories", async (req, res) => {
  try {
    let categories = await listAllGenre();
    console.log(categories);
    res.status(200).json({ categories: categories });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
