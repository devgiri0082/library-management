require("dotenv").config();
const express = require("express");
const { addNewUser, login } = require("../Controller/userController");
let multer = require("multer");
let jwt = require("jsonwebtoken");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const multiPart = multer({ storage: storage });
router.post("/signup", multiPart.single("profilePic"), async (req, res) => {
  if (req.file) req.body.image = req.file.path;
  let value = await addNewUser(req.body);
  res.status(value.code).send(value.message);
});
router.post("/login", async (req, res) => {
  let value = await login(req.body);
  if (value.code === 200) {
    console.log(value);
    let payload = {
      email: value.message.email,
      userName: value.message.userName,
      iat: Date.now(),
    };
    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ Access_token: token });
  }
  res.status(value.code).json(value.message);
});

module.exports = router;
