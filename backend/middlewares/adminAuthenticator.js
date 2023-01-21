const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.key2);
    if (decoded) {
      // const empId = decoded.employeeId;
      // req.body.empId = empId;
      next();
    } else {
      res.send("Login First");
    }
  } else {
    res.send("Login First");
  }
};

module.exports = {
  adminAuthenticator,
};
