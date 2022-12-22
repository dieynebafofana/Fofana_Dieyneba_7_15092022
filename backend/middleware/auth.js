const jsonWt = require("jsonwebtoken");

// import AuthContext from "../Store/AuthContext";

module.exports = (req, res, next) => {
  // const AuthCtxt = useContext(AuthContext);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
    };

    console.log(userId);
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};
