let readline = require("readline-sync");
let mongoose = require("mongoose");
let {
  listAllGenre,
  addNewCategory,
  deleteCategory,
} = require("./Controller/CategoriesController");
const {
  showBooks,
  addBook,
  deleteBook,
  searchBook,
  allCategoryBook,
} = require("./Controller/BookController");
const {
  showAllMember,
  addNewMember,
  deleteMember,
} = require("./Controller/MemberController");
const {
  issueBook,
  returnBook,
  activeIssue,
  issueHistory,
} = require("./Controller/issueController");

let showOptions = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let option;
  do {
    option = readline.question(`
    Welcome to McLaren  Library
  Here are the few things you can do

------Category Operations-------
1. See all Category
2. Add new Category
3. Delete A Category

------Book Operations-------
4. Search all Books 
5. Add new Books
6. Delete a Book
7. Search for a Book
8. Get all Books for a Category

------Member Operations-------
9. See all Member
10. Add new Member
11. Delete a Member

------Issue Operations-------
12. Issue a new Book
13. Return a Book
14. See Active Issue
15. Get Issue History of A Book
0. Exit
    `);
    let title;
    switch (option) {
      case "1":
        await listAllGenre();
        break;
      case "2":
        title = readline.question(`Enter the new Category: `);
        await addNewCategory(title);
        break;
      case "3":
        title = readline.question(`Enter the Category to Delete: `);
        await deleteCategory(title);
        break;
      case "4":
        await showBooks();
        break;
      case "5":
        let nameOfBook = readline.question(`Enter the title of the book: `);
        let price = readline.question(`Enter the price of the book: `);
        let category = readline.question(`Enter the category of the book: `);
        let genre = readline.question(
          `Enter the authors of the book (separated by comma and space): `
        );
        await addBook(nameOfBook, price, category, genre.split(", "));
        break;
      case "6":
        let titleOfBook = readline.question(`Enter the title of the book: `);
        await deleteBook(titleOfBook);
        break;
      case "7":
        let enterTitle = readline.question(`Enter the title of the book: `);
        await searchBook(enterTitle);
        break;
      case "8":
        let categoryName = readline.question(`Enter Category:`);
        await allCategoryBook(categoryName);
        break;
      case "9":
        await showAllMember();
        break;
      case "10":
        let memberName = readline.question(`Enter Your Name: `);
        await addNewMember(memberName);
        break;
      case "11":
        let memberId = readline.question(`Enter you id: `);
        await deleteMember(memberId);
        console.log("Hello");
        break;
      case "12":
        let bookTitle = readline.question(`Enter the title of the book: `);
        let memberId1 = readline.question(`Enter your memberId: `);
        await issueBook(bookTitle, memberId1);
        break;
      case "13":
        let memberId2 = readline.question(`Enter your memberId: `);
        await returnBook(memberId2);
        break;
      case "14":
        await activeIssue();
        break;
      case "15":
        let title123 = readline.question(`Enter the title of the book: `);
        await issueHistory(title123);
      case "0":
        break;
      default:
        console.log("Invalid request");
    }
  } while (option != "0");
  console.log("Hello");
};

showOptions();
