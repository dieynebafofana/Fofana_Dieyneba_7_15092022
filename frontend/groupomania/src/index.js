import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Post from "./pages/Post";
import Error from "./components/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./Store/AuthContext";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Post" element={<Post />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
 
    
  </React.StrictMode>
);
