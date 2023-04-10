require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.user = user;

      next();
    });
  } catch (e) {
    return res.status(422).json({ message: "Token is required" });
  }
};

module.exports = authToken;
