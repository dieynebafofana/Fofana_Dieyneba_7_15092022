// import React, { useState } from "react";
import { useContext, useEffect, useState } from "react";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import AuthContext from "../Store/AuthContext";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

const Post = () => {
  //post useState (future data)
  // const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null);
console.log(post)
  //loading useState(true) (future data)
  // const [loading, setLoading] = useState (true)

  const AuthCtxt = useContext(AuthContext);

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.prenventDefault();

    //Fonction fetchAddPost
    // fetchAddPosts()
  };
  // useEffect([token]) (if not token reidrection vers login)
  useEffect(() => {
    if (!AuthCtxt.token) {
      Navigate("/Login");
    }

    //Lancer fonction pour aller charger les posts fetchGetPosts()
  });

  // const fetchGetPosts = () =>{
  //   //Fetch get
  //     //Data (setPosts) (setLoadding false)
  // }

  const fetchAddPosts = () => {

    fetch("http://localhost:3000/api/Posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Autorisation: `Bearer ${AuthCtxt.token}`,
      },
      body: JSON.stringify({
        userId: AuthCtxt.userId,
        post: post,
      }),
    })
      .then((data) => data.json())
      .then((Posts) => {
        console.log(Posts);
        if (Posts.ok) {
          setPost(Posts);
        }
        //Lancer fonction FetchGetPost

        // setPost(true)
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };   

  useEffect(() => {
    fetchAddPosts();
  },[]);
  // //useEffect
  //   fetch("http://localhost:3000/api/Posts", {
  //     method: "POST",

  //     headers: {
  //       "Content-Type": "application/json",

  //       Autorisation: `Bearer ${AuthCtxt.token}`,

  //     },
  //     body: JSON.stringify({
  //       userId: AuthCtxt.userId,
  //       post:post}),
  //   })
  //     .then((data) => data.json())
  //     .then((Posts) => {
  //       console.log(Posts);

  //       setPost(true)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     useEffect(() => {

  //     },[])
  //   //End useEffect ([post, loading, token])

  return (
    <div>
      <Logo />
      <Logout />
      <section>
        <form
          className="FormPost"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="message">
            <input
              className="InputMessage"
              name="message"
              placeholder="Ecrire un message"
              type="texterea"
              defaultValue={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </label>
          {/* <input type="submit" value="Envoyer" /> */}
          <Button type="submit">Envoyer</Button>
        </form>

        <div>{/* { loading ? "loading..." : "Afficher les posts" } */}</div>
      </section>
    </div>
  );
};

export default Post;
