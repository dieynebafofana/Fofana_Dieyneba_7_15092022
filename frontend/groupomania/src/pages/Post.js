import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import PostForm from "../components/PostForm";
import PostComponent from "../components/PostComponent";

const Post = () => {
  const AuthCtxt = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const Isloggedin = AuthCtxt.Isloggedin;
  const Navigate = useNavigate();

  const FetchPosts = () => {
    fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
    })
      .then((data) => data.json())
      .then((Posts) => {
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
    <>
      {Isloggedin && (
        <div>
          <Logo />
          <Logout />
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
      )}
      {!Isloggedin && Navigate("/login")}
    </>
  );
};

export default Post;
