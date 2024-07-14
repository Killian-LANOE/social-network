const client = require("../DB_Connection");

exports.getImages = (req, res) => {
  client.query(`SELECT * FROM images`, (err, result) => {
    if (!err) {
      console.log(result.rows);
      res.status(200).send(result.rows);
    } else {
      console.log(err.message);
    }
  });
};

exports.uploadImages = (req, res) => {
  const file = req.file;
  const filePath = `${req.protocol}://${req.get("host")}/api/images/${
    req.file.filename
  }`;
  let insertQuery = `INSERT INTO images(name, mimetype, path) VALUES('${file.filename}', '${file.mimetype}', '${filePath}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.status(201).send("L'image à bien été ajoutée !");
    } else {
      console.log(err.message);
      res.status(404).send("Une erreur est survenu réesayer plus tard !");
    }
  });
};
