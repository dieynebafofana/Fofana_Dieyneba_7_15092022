import React from "react";
import Logo from "../components/Logo";
import Logout from "../components/Logout";

const Post = () => {
  //   fetch("http://localhost:3000/api/posts", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   })
  //     .then((data) => data.json())
  //     .then((UserLogin) => {
  //       console.log(UserLogin);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  return (
    <div>
      <Logo />
      <Logout />
    </div>
  );
};

export default Post;
