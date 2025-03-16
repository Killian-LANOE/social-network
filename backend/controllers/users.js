const database = require("../DB_Connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config();

exports.Login = async (req, res, next) => {
  try {
    const userData = await database.one(
      `SELECT * FROM users WHERE email = $1`,
      [req.body.email]
    );

    console.log(userData);

    bcrypt
      .compare(req.body.password, userData.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Password Incorrect" });
        }

        res.status(200).json({
          userid: userData.userid,
          token: jwt.sign(
            { userid: userData.userid },
            process.env.SECRET_TOKEN,
            {
              expiresIn: "24h",
            }
          ),
        });
      })

      .catch((error) => {
        console.log("jwt error");
        return res.status(500).json({ error });
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.Signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userUUID = uuid.v4();
      try {
        database.none(
          `INSERT INTO users(userid,username,password,email) VALUES($1,$2,$3,$4)`,
          [userUUID, req.body.username, hash, req.body.email]
        );
        return res.status(201).json({
          userid: userUUID,
          token: jwt.sign({ userid: userUUID }, process.env.SECRET_TOKEN, {
            expiresIn: "24h",
          }),
        });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.GetUserData = async (req, res, next) => {
  try {
    const userData = await database.one(
      `SELECT * FROM users WHERE username = $1`,
      [req.params.username]
    );
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
