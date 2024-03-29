const jsonWt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    const pseudo = decodedToken.pseudo;

    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
      pseudo: pseudo,
    };
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};
