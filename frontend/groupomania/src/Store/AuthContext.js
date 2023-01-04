import { createContext, useState } from "react";

const defaultValue = {
  token: "",
  userId: 0,
  userIsloggedin: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  pseudo: null,
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const TokenStorage = localStorage.getItem("token");
  const userIdStorage = localStorage.getItem("userId");
  const isAdminStorage = localStorage.getItem("isAdmin");
  const pseudoStorage = localStorage.getItem("pseudo");

  const [token, setToken] = useState(TokenStorage);
  const [userId, setUserId] = useState(userIdStorage);
  const [isAdmin, setIsAdmin] = useState(isAdminStorage);
  const [pseudo, setPseudo] = useState(pseudoStorage);

  const Log = (token, userId, pseudo, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);
    setPseudo(pseudo);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("pseudo", pseudo);
  };

  const logOut = () => {
    setToken(null);
    setUserId(null);
    setPseudo(null);
    setIsAdmin(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("pseudo");
    localStorage.removeItem("isAdmin");
  };

  const userIsloggedin = !!token;
  const Admin = !!isAdmin;

  const contextValue = {
    token: token,
    userId: userId,
    Isloggedin: userIsloggedin,
    login: Log,
    logout: logOut,
    isAdmin: Admin,
    pseudo: pseudo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
