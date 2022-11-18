import { createContext, useState } from "react";

const defaultValue = {
  token: "",
  userId: null,
  userIsloggedin: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const TokenStorage = localStorage.getItem("token");
  const userIdStorage = localStorage.getItem("userId");

  const [token, setToken] = useState(TokenStorage);
  const [userId, setUserId] = useState(userIdStorage);

  const Log = (token) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logOut = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  
  const userIsloggedin = !!token;

  const contextValue = {
    token: token,
    userId: userId,
    Isloggedin: userIsloggedin,
    login: Log,
    logout: logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
