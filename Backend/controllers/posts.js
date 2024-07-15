const client = require("../DB_Connection");

exports.getPosts = (req, res) => {
  client.query(`SELECT * FROM posts`, (err, result) => {
    if (!err) {
      console.log(result.rows);
      res.status(200).send(result.rows);
    } else {
      console.log(err.message);
    }
  });
};

exports.createPost = (req, res) => {
  postDescription = JSON.stringify(req.body.description);
  console.log(postDescription);

  //create an url to allow acces to the file stocked in our server
  const filePath = `${req.protocol}://${req.get("host")}/api/posts/${
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
