const bcrypt = require("bcrypt");
const jsonWt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      console.log(req.body.password),
      console.log(user);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ message: "utilisateur déja créé" }));
    })
    .catch((error) => res.status(400).json({ message: "Veuillez saisir les champs correspondants"}));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(400)
              .json({ message: "Email ou mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};


