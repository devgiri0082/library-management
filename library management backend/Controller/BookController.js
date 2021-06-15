let Genre = require("../models/genreModel");
let Book = require("../models/bookModel");
let showBooks = async () => {
  let data;
  try {
    data = await Book.find().populate("genre");
  } catch (err) {
    console.log("error: ", err);
  }
  printData(data);
  return data;
};

let addBook = async (title, price, category, authors) => {
  try {
    givenGenre = await Genre.findOne({ title: category.toLowerCase() });
    if (!givenGenre) {
      console.log(`Given category ${category} does not exist`);
      return;
    }
    let newBook = await new Book({
      title: title.toLowerCase(),
      price: price,
      genre: givenGenre["_id"],
      author: authors,
    });
    await newBook.save();
    console.log("New Book is added to the library");
  } catch (err) {
    console.log(err);
  }
};

let deleteBook = async (title) => {
  try {
    let bookData = await Book.findOne({ title: title.toLowerCase() });
    if (!bookData) {
      console.log("so such book exist");
      return;
    }
    await bookData.remove();
    console.log(`"${title}" has been removed`);
  } catch (err) {
    console.log(err);
  }
};
let deleteWithId = async (id) => {
  try {
    let bookData = await Book.findOne({ _id: id });
    await bookData.deleteOne();
    let data = await Book.find();
    console.log(data);
    return true;
  } catch (err) {
    console.log(err);
  }
};

let searchBook = async (title) => {
  try {
    let givenBook = await Book.findOne({ title: title.toLowerCase() }).populate(
      "genre"
    );
    if (!givenBook) {
      console.log("No Such Book Exists");
      return;
    }
    console.log(
      `Title: ${elem.title}, Author: ${elem.author} genre: ${elem.genre.title}`
    );
  } catch (err) {
    console.log(err);
  }
};
let allCategoryBook = async (category) => {
  try {
    let givenCategory = await Genre.findOne({ title: category });
    if (!givenCategory) {
      console.log("Given Category Does not exist");
      return;
    }
    let givenBooks = await Book.find({ genre: givenCategory["_id"] }).populate(
      "genre"
    );
    printData(givenBooks);
  } catch (err) {
    console.log(err);
  }
};
let printData = (data) => {
  if (data.length === 0) {
    console.log("no data to show");
    return;
  }
  data.forEach((elem) =>
    console.log(
      `Title: ${elem.title}, Author: ${elem.author} genre: ${elem.genre.title} `
    )
  );
};

module.exports = {
  showBooks,
  addBook,
  deleteBook,
  searchBook,
  allCategoryBook,
  deleteWithId,
};
