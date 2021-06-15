const { hash, compare } = require("bcrypt");
const { userModel } = require("../models/userModel");
let addNewUser = async ({ name, email, password, image }) => {
  console.log(name, email, password);
  if (!image) {
    image = "default";
  }
  try {
    let userWithEmail = await userModel.findOne({ email: email });
    if (!checkEmail(email)) {
      console.log("Invalid Email");
      return { code: 400, message: { message: "Invalid Email" } };
    }
    if (userWithEmail) {
      console.log("Email already Exist");
      return { code: 409, message: { message: "Email Already Exist" } };
    }
    let hashedPassword = await hash(password, 10);
    console.log(hashedPassword);
    let newUser = new userModel({
      userName: name,
      email: email,
      password: hashedPassword,
      image: image,
    });
    await newUser.save();
    console.log("You are signed up");
    return { code: 201, message: { message: "sign up successful" } };
  } catch (err) {
    console.log(err);
  }
};

let login = async ({ email, password }) => {
  let sameEmail = await userModel.findOne({ email: email });
  if (!sameEmail) {
    console.log("Email does not exist");
    return { code: 400, message: { message: "Incorrect Email" } };
  }
  let doesPasswordMatch = await compare(password, sameEmail.password);
  if (!doesPasswordMatch) {
    console.log("Invalid Password");
    return { code: 400, message: { message: "Incorrect Password" } };
  }
  console.log("Login Successful", sameEmail);
  return { code: 200, message: sameEmail };
};
function checkEmail(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}
const getUsers = async () => {
  try {
    let users = await userModel.find();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewUser, login };
