const client = require("../DB_Connection");

exports.getData = (req, res) => {
  client.query(`SELECT * FROM users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  client.end;
};

exports.getSpecificData = (req, res) => {
  client.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
};

exports.postData = (req, res) => {
  const user = req.body;
  let insertQuery = `INSERT INTO users(username, password, email) VALUES('${user.username}', '${user.password}', '${user.email}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.status(201).send("L'utilisateur à bien été crée !");
    } else {
      console.log(err.message);
    }
  });
  client.end;
};

exports.modifyData = (req, res) => {
  const user = req.body;
  let updateQuery = `UPDATE users SET username = '${user.username}', password = '${user.password}', email = '${user.email}' WHERE id = ${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.status(200).send("L'utilisateur à bien été modifié !");
    } else {
      console.log(err.message);
    }
  });
  client.end;
};

exports.deleteData = (req, res) => {
  let deleteQuery = `DELETE FROM users WHERE id = ${req.params.id}`;

  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.status(200).send("L'utilisateur à bien été supprimé !");
    } else {
      res.status(401).send("Une erreur est survenue réessayé plus tard.");
    }
  });
  client.end;
};
