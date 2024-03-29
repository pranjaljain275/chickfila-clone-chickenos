const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuthenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.key1);
    if (decoded) {
      const userId = decoded.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Login First");
    }
  } else {
    res.send("Login First");
  }
};

module.exports = {
  userAuthenticator,
};
