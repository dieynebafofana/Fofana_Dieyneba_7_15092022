const passWordValidator = require("password-validator");

const passWordSchema = new passWordValidator();

passWordSchema
  .is()
  .min(4) // Longueur Minimum 4
  .is()
  .max(100) // longueur Maximum 100
  .has()
  .uppercase() // Doit avoir des lettres majuscules
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(2) // Doit avoir au moin 2 chiffres
  .has()
  .not()
  .spaces() // Ne doit pas comporter d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); //Liste noire de ces valeurs

module.exports = (req, res, next) => {
  if (passWordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(403).json({
      message:
        "password faible " +
        passWordSchema.validate("req.body.password", { list: true }),
    });
  }
};
