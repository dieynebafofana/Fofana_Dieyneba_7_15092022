import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import Logo from "../components/Header/Logo/Logo";
import Logout from "../components/Header/Logout";
import PostForm from "../components/PostForm/PostForm";
import PostComponent from "../components/PostCompenent/PostComponent";

const Post = () => {
  const AuthCtxt = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const Isloggedin = AuthCtxt.Isloggedin;
  const Navigate = useNavigate();

  const FetchPosts = () => {
    fetch("http://localhost:5000/api/posts", {
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
      .catch((error) => {});
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
                  pseudo={post.pseudo}
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
