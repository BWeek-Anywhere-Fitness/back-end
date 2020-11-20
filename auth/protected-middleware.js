const { json } = require("express");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  //const token = req.headers.authorization.split(" ")[1]; //BEARER VERSION
  const token = req.headers.authorization;
  console.log(req.headers);

  // check if a token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Connection refused because you lack a token." });
  }

  // Check ID
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Your token is bad or expired." });
    }
    console.log("decoded token ->", decoded);
    req.decoded = decoded;
    next();
  });
};
