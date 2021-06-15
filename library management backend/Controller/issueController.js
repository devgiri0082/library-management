let Book = require("../models/bookModel");
let Issue = require("../models/issueMode");
let Member = require("../models/memberModel");

let issueBook = async (title, memberId) => {
  try {
    let givenMember = await Member.findOne({ memberId: memberId });
    if (!givenMember) {
      console.log("Given Member Id Does not Exist");
      return;
    }
    let givenBook = await Book.findOne({ title: title });
    if (!givenBook) {
      console.log("Given book does not exist");
      return;
    }
    let issuingMember = await Issue.findOne({
      issuingMember: givenMember["_id"],
    });
    if (issuingMember && issuingMember["isIssued"]) {
      console.log("You have already issued a book,  please return it first");
      return;
    }
    let bookIssued = await Issue.findOne({ issuedBook: givenBook["_id"] });
    if (bookIssued && bookIssued["isIssued"]) {
      console.log("This book is already Issued please try another book");
      return;
    }
    let newIssue = new Issue({
      issuingMember: givenMember["_id"],
      issuedBook: givenBook["_id"],
    });
    await newIssue.save();
    let data = await Issue.find()
      .populate("issuingMember")
      .populate("issuedBooks");
    console.log(`"${title}" has been issued`, data);
  } catch (err) {
    console.log(err);
  }
};

let returnBook = async (memberId) => {
  try {
    let givenMember = await Member.findOne({ memberId: memberId });
    if (!givenMember) {
      console.log("Given Member Id Does not Exist");
      return;
    }
    let issuingMember = await Issue.findOne({
      issuingMember: givenMember["_id"],
    });
    if (!issuingMember || !issuingMember["isIssued"]) {
      console.log("No Book is not issued by you");
      return;
    }
    await issuingMember.updateOne({ isIssued: false });
    console.log("you have successfully returned the book");
  } catch (err) {}
};

let activeIssue = async () => {
  let active = await Issue.find({ isIssued: true })
    .populate("issuedBook")
    .populate("issuingMember");
  if (active.length === 0) {
    console.log("no data to show");
    return;
  }
  console.log(active);
  active.forEach((elem) =>
    console.log(
      `memberName: ${elem.issuingMember.name}, memberId: ${elem.issuingMember.id}, bookTitle: ${elem.issuedBook.title}`
    )
  );
};

let issueHistory = async (title) => {
  try {
    let givenBook = await Book.findOne({ title: title });
    if (!givenBook) {
      console.log("No such book exist");
      return;
    }
    let allHistory = await Issue.find();
    console.log(allHistory, givenBook["_id"]);
    let history = await Issue.find({ issuedBook: givenBook["_id"] })
      .populate("issuedBook")
      .populate("issuingMember");
    if (history.length === 0) {
      console.log("Given book has not been issued yet");
      return;
    }
    console.log(
      history.reduce(
        (acc, elem) =>
          (acc += `name: ${
            elem.issuingMember !== null
              ? elem.issuingMember.name
              : "deleted Member"
          }, memberId: ${
            elem.issuingMember !== null
              ? elem.issuingMember.memberId
              : "deleted Member"
          }, `),
        "previous Issuing Member: "
      )
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = { issueBook, returnBook, activeIssue, issueHistory };
