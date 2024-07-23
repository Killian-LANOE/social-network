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
      const insertQuery = `INSERT INTO users(uuid, username, password, email) VALUES($1,$2,$3,$4)`;
      const queryValues = [userUuid, req.body.username, hash, req.body.email];

      client.query(insertQuery, queryValues, (err, result) => {
        if (!err) {
          res.status(201).send("User created !");
        } else {
          res.status(500).send(err);
        }
      });
    })

    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.login = (req, res, next) => {
  client.query(
    `SELECT * FROM users WHERE email = $1`,
    [req.body.email],
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "Username or password incorrect" });
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
  if (!req.auth.isAdmin) {
    res.status(401).send("You don't have the right to do that");
    return;
  }

  client.query(`SELECT * FROM users`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res.status(500).send(err);
    }
  });
};
