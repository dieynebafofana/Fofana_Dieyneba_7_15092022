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
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const Log = (token, userId, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);
  };

  const logOut = () => {
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
