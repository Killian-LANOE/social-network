const client = require("../DB_Connection");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const uuidv4 = require("uuid").v4;
require("dotenv").config();

exports.signup = (req, res, next) => {
  let userUuid = uuidv4();
  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      let insertQuery = `INSERT INTO users(uuid, username, password, email) VALUES('${userUuid}' ,'${req.body.username}', '${hash}', '${req.body.email}')`;

      client.query(insertQuery, (err, result) => {
        if (!err) {
          res.status(201).send("L'utilisateur à bien été crée !");
        } else {
          res.status(500).json({ err });
        }
      });
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  client.query(
    `SELECT * FROM users WHERE email = '${req.body.email}'`,
    (err, result) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Identifiant ou mot de passe incorrecte" });
      }

      // Attribute to user the data of our select
      // It only work cause we're looking for a single user !
      const user = result.rows[0];

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res
              .status(401)
              .json({ message: "Identifiant ou mot de passe incorrecte" });
          } else {
            res.status(200).json({
              userId: user.uuid,
              token: jsonwebtoken.sign(
                { userId: user.uuid },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  );
};

exports.getUser = (req, res, next) => {
  client.query(`SELECT * FROM users`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
};
