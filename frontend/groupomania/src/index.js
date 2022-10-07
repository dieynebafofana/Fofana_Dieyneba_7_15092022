import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Post from "./pages/Post"
import Error from "./components/Error";
import Login from "./pages/Login";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <switch> */}
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/post" element={<Post />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="*" element={<Error/>} />
      </Routes>
      {/* </switch> */}
    </BrowserRouter>
  </React.StrictMode>
);


