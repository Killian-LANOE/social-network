exports.Login = (req, res, next) => {
  res.json({ message: "Logged in" });
};

exports.Signup = (req, res, next) => {
  res.json({ message: "Signed up" });
};

exports.GetUserData = (req, res, next) => {
  res.json({ message: "User Data" });
};
