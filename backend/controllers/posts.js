exports.getPosts = (req, res, next) => {
  res.json({ message: "Posts" });
};

exports.getSinglePost = (req, res, next) => {
  res.json({ message: "Post" });
};

exports.createPost = (req, res, next) => {
  res.json({ message: "Post Created" });
};

exports.deletePost = (req, res, next) => {
  res.json({ message: "Post Deleted" });
};

exports.modifyPost = (req, res, next) => {
  res.json({ message: "Post Modified" });
};
