const { error } = require("console");
const database = require("../DB_Connection");
const fs = require("fs");

exports.getPosts = async (req, res, next) => {
  try {
    const data = await database.any(`SELECT * FROM posts`);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const data = await database.one(`SELECT * FROM posts WHERE postid = $1`, [
      req.params.id,
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.createPost = (req, res, next) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file?.filename}`
      : null;

    if (req.file === undefined && req.body.description === undefined) {
      return res.status(400).json({ error: "You can't create an empty post" });
    }

    database.none(
      `INSERT INTO posts(userid, description, image_url) VALUES($1, $2, $3)`,
      [req.auth.userid, req.body.description, imageUrl]
    );
    return res.status(201).json({ message: "Post Created successfully" });
  } catch (error) {
    console.log("catch error");
    return res.status(500).json({ error });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postData = await database.one(
      `SELECT * FROM posts WHERE postid = $1`,
      [req.params.id]
    );

    if (req.auth.is_admin != true) {
      if (req.auth.userid != postData.userid) {
        return res.status(401).json("You are not authorized to do that");
      }
    }
    const filename = postData.image_url.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      database.none(`DELETE FROM posts WHERE postid = $1`, [req.params.id]);
    });
    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.modifyPost = async (req, res, next) => {
  try {
    const postData = await database.one(
      `SELECT * FROM posts WHERE postid = $1`,
      [req.params.id]
    );

    if (req.auth.userid != postData.userid || req.auth.is_admin != true) {
      return res.status(401).json("You are not authorized to do that");
    }

    if (req.file === undefined && req.body.description === undefined) {
      return res.status(401).json({
        error: "You can't modify without changing the description or image",
      });
    }

    let imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file?.filename}`
      : null;

    if (req.body.description === undefined) {
      req.body.description = postData.description;
    }

    if (imageUrl === null) {
      imageUrl = postData.image_url;
      database.none(
        `UPDATE posts SET description = $1, image_url = $2 WHERE postid = $3`,
        [req.body.description, imageUrl, req.params.id]
      );
    } else {
      const filename = postData.image_url.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        database.none(
          `UPDATE posts SET description = $1, image_url = $2 WHERE postid = $3`,
          [req.body.description, imageUrl, req.params.id]
        );
      });
    }
    return res.status(200).json({ message: "Post Modified Successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
