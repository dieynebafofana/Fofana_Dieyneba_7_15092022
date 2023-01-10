const bcrypt = require("bcrypt");
const jsonWt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  if (req.body.password && req.body.email) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        });

        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) =>
            res.status(400).json({ message: "utilisateur déja existant" })
          );
      })
      .catch((error) => res.status(400).json({ message: "Error 500" }));
  } else {
    res
      .status(400)
      .json({ message: "Veuillez saisir tout les champs correspondants" });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
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
            pseudo: user.pseudo,
            userId: user._id,
            isAdmin: user.isAdmin,
            token: jsonWt.sign(
              { userId: user._id, isAdmin: user.isAdmin, pseudo: user.pseudo },
              process.env.TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
