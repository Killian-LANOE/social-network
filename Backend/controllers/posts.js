const client = require("../DB_Connection");
const fs = require("fs");

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
        console.log(err);
      } else if (result.rows.length === 0) {
        res.status(404).send("No post found");
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
      res.status(201).send("Post created !");
    } else {
      res.status(500).send(err.message);
    }
  });
};

exports.deletePost = (req, res) => {
  if (req.auth.id != req.body.userId && req.auth.isAdmin != true) {
    res.status(401).send("You're not authorized to do that !");
  }

  client.query(
    `SELECT * FROM posts WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        res.status(404).send("No post found");
      }
      // get the image name from the path by spliting and getting the last element of the split
      const imageName = result.rows[0].images_path.split("/")[6];

      fs.unlinkSync(`./images/${imageName}`);

      client.query(
        `DELETE FROM posts WHERE id= ${req.params.id}`,
        (err, result) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send("Post deleted successfully");
          }
        }
      );
    }
  );
};

exports.modifyPost = (req, res) => {
  client.query(
    `SELECT * FROM posts WHERE id = $1`,
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(404).send("No Post Found");
        return;
      }

      if (!req.body.description || req.body.description.length === 0) {
        res.status(400).send("Post Description can not be empty !");
        return;
      }

      const postDescription = req.body.description;
      const imageName = result.rows[0].images_path.split("/")[6];
      const values = [postDescription, req.params.id];

      let updateQuery = `UPDATE posts SET description = $1 WHERE id = $2`;

      let filePath;

      if (req.file) {
        try {
          filePath = `${req.protocol}://${req.get("host")}/api/posts/images/${
            req.file.filename
          }`;
        } catch (error) {
          console.log(`Error try filePath: ${error.message}`);
          res.status(500).send("Error processing the image");
          return;
        }

        updateQuery = `UPDATE posts SET description = $1, images_path = $2 WHERE id = $3`;
        values[1] = filePath;
        values.push(req.params.id);
      }

      client.query(updateQuery, values, (err, updateResult) => {
        if (err) {
          res.status(500).send(`Update error: ${err}`);
        } else {
          if (filePath !== null && filePath !== undefined) {
            fs.unlinkSync(`./images/${imageName}`);
          }
          res.status(201).send("Post successfully modified");
        }
      });
    }
  );
};
