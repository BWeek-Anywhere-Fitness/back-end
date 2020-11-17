// // NOT USED!!!!

// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = require("express").Router();
// const { jwtSecret } = require("./secrets.js");

// // const Instructors = require("../data/models/instructor-model");
// // const Students = require('../data/models/class-model')

// function makeToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//   };
//   const options = {
//     expiresIn: "60 minutes",
//   };
//   return jwt.sign(payload, jwtSecret, options);
// }

// module.exports = (req, res, next) => {
//   const credentials = req.body;
//   const rounds = process.env.BCRYPT_ROUNDS || 8;
//   const hash = bcryptjs.hashSync(credentials.student_password, rounds);
//   credentials.student_password = hash;
//   console.log("hashed credentials: ", credentials);

//   return credentials;
// };
