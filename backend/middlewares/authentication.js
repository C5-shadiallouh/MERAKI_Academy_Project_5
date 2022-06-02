const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json("forbidden");
  }
  const token = req.headers.authorization.split(" ").pop();
  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return res.status(403).json(err);
    }
    req.token = result;
    next();
  });
};

module.exports = { authentication };
