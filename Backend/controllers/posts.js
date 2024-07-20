const client = require("../DB_Connection");

exports.getPosts = (req, res) => {
  client.query(`SELECT * FROM posts`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res.status(500).send(err);
    }
  });
};

exports.getSpecificPost = (req, res) => {
  client.query(
    `SELECT * FROM posts WHERE id = ${req.params.id} `,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else if (result.rows.length === 0) {
        res.status(404).send("Post not found");
      } else {
        res.status(200).send(result.rows[0]);
      }
    }
  );
};

exports.createPost = (req, res) => {
  postDescription = JSON.stringify(req.body.description);

  //create an url to allow acces to the file stocked in our server
  const filePath = `${req.protocol}://${req.get("host")}/api/posts/images/${
    req.file.filename
  }`;

  let insertQuery = `INSERT INTO posts(user_id, description, images_path) 
  VALUES('${req.auth.userId}', '${postDescription}', '${filePath || null}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.status(201).send("Post crée !");
    } else {
      res.status(500).send(err.message);
    }
  });
};

exports.deletePost = (req, res) => {
  if (req.auth.id != req.body.userId && req.auth.isAdmin != true) {
    res.status(401).send("You're not authorized to do that !");
  }

  console.log(req.body);
  client.query(
    `DELETE FROM posts WHERE id= ${req.params.id}`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).send("Post deleted successfully");
    }
  );
};
