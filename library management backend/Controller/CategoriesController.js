let Genre = require("../models/genreModel");
let Book = require("../models/bookModel");

let listAllGenre = async () => {
  let data;
  try {
    data = await Genre.find();
  } catch (err) {
    console.log("error: ", err);
  }
  if (data.length === 0) {
    console.log("no data to show");
    return;
  }
  let allGenre = data.reduce(
    (acc, elem) => acc + `${elem.title}, `,
    "genres: "
  );

  console.log(allGenre);
  return data;
};

let addNewCategory = async (category) => {
  try {
    category = category.toLowerCase();
    let itHas = await Genre.exists({ title: category });
    if (itHas) {
      console.log("Given Category already Exist");
      return;
    }
    newGenre = new Genre({ title: category });
    await newGenre.save();
    console.log(`Successfully add ${category} category`);
  } catch (err) {
    console.log(err);
  }
};

let deleteCategory = async (category) => {
  try {
    category = category.toLowerCase();
    let categoryData = await Genre.findOne({ title: category });
    if (!categoryData) {
      console.log(`${category} category does not exist`);
      return;
    }
    let booksData = await Book.find({ genre: categoryData["_id"] });
    booksData.forEach(async (elem) => {
      await elem.remove();
    });
    await categoryData.remove();
    console.log(`Successfully deleted the ${category} category `);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  listAllGenre,
  addNewCategory,
  deleteCategory,
};
