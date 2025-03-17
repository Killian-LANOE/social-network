const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userid = decodedToken.userid;
    const is_admin = decodedToken.is_admin;
    req.auth = {
      userid: userid,
      is_admin: is_admin,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "You are unauthorized to do that !" });
  }
};
