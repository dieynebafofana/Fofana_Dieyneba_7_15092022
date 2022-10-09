import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Post from "./pages/Post";
import Error from "./components/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
