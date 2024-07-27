const client = require("../DB_Connection");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const uuidv4 = require("uuid").v4;
require("dotenv").config();

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const formatedEmail = email.toLowerCase();

  let userUuid = uuidv4();
  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      const insertQuery = `INSERT INTO users(uuid, username, password, email) VALUES($1,$2,$3,$4)`;
      const queryValues = [userUuid, req.body.username, hash, formatedEmail];

      client.query(insertQuery, queryValues, (err, result) => {
        if (err) {
          res.status(500).send("Server Error !");
          return;
        } else {
          res.status(201).send({
            userId: userUuid,
            token: jsonwebtoken.sign(
              { userId: userUuid, isAdmin: false },
              process.env.SECRET_TOKEN,
              { expiresIn: "24h" }
            ),
          });
        }
      });
    })

    .catch((error) => {
      res.status(500).json("Server Error !");
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const formatedEmail = email.toLowerCase();

  client.query(
    `SELECT * FROM users WHERE email = $1`,
    [formatedEmail],
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "Username or password incorrect" });
        return;
      }

      // Attribute to user the data of our select
      // It only work cause we're looking for a single user !
      const user = result.rows[0];

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Username or password incorrect" });
          } else {
            res.status(200).json({
              userId: user.uuid,
              token: jsonwebtoken.sign(
                { userId: user.uuid, isAdmin: user.isAdmin },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => res.status(500).send(error));
    }
  );
};

exports.getUser = (req, res, next) => {
  client.query(
    `SELECT * FROM users WHERE uuid = $1`,
    [req.params.id],
    (err, result) => {
      const user = result.rows[0];

      if (!req.auth.isAdmin && req.auth.userId != user.uuid) {
        res.status(401).send("You don't have the right to do that");
        return;
      }

      if (!err) {
        res.status(200).send({
          userId: user.uuid,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(500).send(err);
      }
    }
  );
};
