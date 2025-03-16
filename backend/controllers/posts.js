const client = require("../DB_Connection");

exports.getPosts = async (req, res, next) => {
  client.connect();

  result = await client.query(`SELECT * FROM posts;`);

  res.status(200).json(result.rows);

  client.end();
};

exports.getSinglePost = async (req, res, next) => {
  client.connect();

  result = await client.query(
    `SELECT * FROM posts WHERE postid=${req.params.id};`
  );

  res.status(200).json(result.rows);

  client.end();
};

exports.createPost = (req, res, next) => {};

exports.deletePost = (req, res, next) => {};

exports.modifyPost = (req, res, next) => {};
