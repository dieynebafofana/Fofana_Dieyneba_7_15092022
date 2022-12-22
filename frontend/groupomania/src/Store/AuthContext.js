import { createContext, useState } from "react";

const defaultValue = {
  token: "",
  userId: 0,
  userIsloggedin: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const TokenStorage = localStorage.getItem("token");
  const userIdStorage = localStorage.getItem("userId");
  const isAdminStorage = localStorage.getItem("isAdmin");

  const [token, setToken] = useState(TokenStorage);
  const [userId, setUserId] = useState(userIdStorage);
  const [isAdmin, setIsAdmin] = useState(isAdminStorage);

  const Log = (token, userId, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
  };

  const logOut = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  const userIsloggedin = !!token;
  const admin = !!isAdmin;

  const contextValue = {
    token: token,
    userId: userId,
    Isloggedin: userIsloggedin,
    login: Log,
    logout: logOut,
    isAdmin: admin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
