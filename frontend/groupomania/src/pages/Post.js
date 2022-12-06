import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
// import AddPostImg from "./AddPostImg";
// import BtnPost from "./BtnPost";
// import ImgProfil from "./ImgProfil";
// import AllPost from "../components/AllPost";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import PostForm from "../components/PostForm";
import PostComponent from "../components/Post";

const Post = () => {
  const AuthCtxt = useContext(AuthContext);
  const [posts, setPosts] = useState(null);

  const FetchPosts = () => {
    fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
    })
      .then((data) => data.json())
      .then((Posts) => {
        console.log(Posts);
        if (!Posts.ok) {
          setPosts(Posts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <div>
      <Logo />
      <Logout />
      {/* {!Isloggedin && <p>Vous n'etes pas connectée</p> } */}
      <PostForm PostOnUpdate={FetchPosts} />
      <section className="PostRender">
        {posts &&
          posts.map((post) => (
            <PostComponent
              Post={post}
              FetchPosts={FetchPosts}
              key={post._id}
            ></PostComponent>
          ))}
      </section>
    </div>
  );
};

export default Post;
