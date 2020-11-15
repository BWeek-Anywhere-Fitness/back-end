const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//const Users = require("../users/users-model.js");
//const { isValid } = require("../users/users-service.js");

const { jwtSecret } = require("./secrets.js");

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "60 seconds",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// POST Login

// POST Register

module.exports = router;
