const database = require("../DB_Connection");

exports.getPosts = async (req, res, next) => {
  try {
    const data = await database.any(`SELECT * FROM posts`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const data = await database.one(`SELECT * FROM posts WHERE postid = $1`, [
      req.params.id,
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createPost = (req, res, next) => {
  try {
    database.none(
      `INSERT INTO posts(userid, description, image_url) VALUES($1, $2, $3)`,
      [req.body.userid, req.body.description, req.body.image_url]
    );
    res.status(201).json({ message: "Post Created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deletePost = (req, res, next) => {
  try {
    database.none(`DELETE FROM posts WHERE postid = $1`, [req.params.id]);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.modifyPost = async (req, res, next) => {
  try {
    const postData = await database.one(
      `SELECT * FROM posts WHERE postid = $1`,
      [req.params.id]
    );
    if (req.body.description === undefined) {
      req.body.description = postData.description;
    }
    if (req.body.image_url === undefined) {
      req.body.image_url = postData.image_url;
    }

    database.none(
      `UPDATE posts SET description = $1, image_url = $2 WHERE postid = $3`,
      [req.body.description, req.body.image_url, req.params.id]
    );
    res.status(200).json({ message: "Post Modified Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
