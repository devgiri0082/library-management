let Genre = require("../models/genreModel");
let Book = require("../models/bookModel");
let Member = require("../models/memberModel");
let Issue = require("../models/issueMode");

let addBook = async (title, price, bookGenre, author) => {
  try {
    let newGenre;
    let itHas = await Genre.exists({ title: bookGenre });
    if (!itHas) {
      console.log("new Genre");
      newGenre = new Genre({ title: bookGenre });
      await newGenre.save();
    } else {
      console.log("old genre");
      newGenre = await Genre.find({ title: bookGenre });
      newGenre = newGenre[0];
      console.log(newGenre);
    }
    let newBook = new Book({
      title: title,
      price: price,
      genre: newGenre,
      author: author,
    });
    await newBook.save();
    console.log(newBook);
    data = await Book.find({ title: title });
  } catch (err) {
    console.log(err);
  }
};

let searchBookWithName = async (title) => {
  let data = await Book.find({ title: title });
  printData(data);
};
let searchBookWithGenre = async (genre) => {
  let data = await Genre.findOne({ title: genre });
  if (data) {
    data = await Book.find({ genre: data["_id"] });
    console.log(data);
    printData(data);
  } else {
    console.log("Invalid Genre");
  }
};

let printData = (data) => {
  if (data.length === 0) {
    console.log("no data to show");
    return;
  }
  data.forEach((elem) =>
    console.log(`Title: ${elem.title}, Author: ${elem.author} `)
  );
};

let createId = async (name) => {
  try {
    let newMember = new Member({ name: name });
    await newMember.save();
    console.log(newMember);
  } catch (err) {
    console.log(err);
  }
};

let printAllMember = async () => {
  try {
    let data = await Member.find();
    if (data.length === 0) console.log("No member to show");
    else {
      data.forEach((elem) =>
        console.log(`name: ${elem.name}, memberId: ${elem.memberId}`)
      );
    }
  } catch (err) {
    console.log(err);
  }
};

let issueBook = async (title, id) => {
  try {
    let bookData = await Book.findOne({ title: title });
    let memberData = await Member.findOne({ memberId: id });
    let hasIssued = await Issue.findOne({ issuingMember: memberData["_id"] });
    if (hasIssued) {
      console.log(
        `${memberData.name}, you have to return first to issue another book`
      );
      return;
    }
    if (bookData) {
      let bookIssued = await Issue.findOne({ issuedBook: bookData["_id"] });
      if (bookIssued) {
        if (bookIssued.isIssued) {
          console.log("This is book already issued");
          return;
        }
        await bookIssued.updateOne({
          isIssued: true,
          issuingMember: memberData["_id"],
        });
      } else {
        let newIssue = new Issue({
          issuingMember: memberData["_id"],
          issuedBook: bookData["_id"],
        });
        await newIssue.save();
        console.log(newIssue);
      }
    } else console.log("no such book is present");
  } catch (err) {
    console.log(err);
  }
};
let returnBook = async (id) => {
  try {
    let member = await Member.findOne({ memberId: id });
    if (!member) {
      console.log("Invalid member Id");
      return;
    }
    let issuedBook = await Issue.findOne({ issuingMember: member["_id"] });
    if (!issuedBook) {
      console.log("You have not Issued anything");
      return;
    }
    await issuedBook.updateOne({ isIssued: false });
    issuedBook = await Issue.findOne({ issuingMember: member["_id"] });
    console.log(`Successfully returned  successfully`, issuedBook);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  searchBookWithName,
  searchBookWithGenre,
  createId,
  printAllMember,
  issueBook,
  returnBook,
};
