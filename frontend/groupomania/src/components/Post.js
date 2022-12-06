// import React, { useState } from "react";
import Button from "./UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import PostModify from "./PostModify";

const Post = ({ Post, FetchPosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [modify, setModify] = useState(false);
  const [like, setLike] = useState(0);
  const [activeLike, setActiveLike] = useState(false);
  // console.log(Delete);
  // const IdPost = Post._id;

  const DeletePost = (post_id) => {
    // console.log("je supprime");
    fetch(`http://localhost:3000/api/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
    })
      .then((data) => data.json())
      .then((PostUser) => {
        console.log(PostUser);
        FetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ModifyPostToggle = () => {
    let toggle = modify ? false : true;
    setModify(toggle);
  };

  const likeUser = () => {
    console.log("je suis dans le boutton like");
    if (activeLike) {
      setActiveLike(false);
      setLike(0);
    } else {
      setActiveLike(true);
      setLike(+1);
    }
  };

  return (
    <div className="PostRenderMessage">
      <div className="ImgPost">
        <img src={Post.imageUrl} alt="" />
      </div>
      {!modify && <p>{Post.message}</p>}
      {modify && <PostModify Post={Post} setModify={setModify} />}

      <div className="BtnPost">
        {AuthCtxt.userId === Post.userId && (
          <>
            <Button
              className="BtnUpdate"
              id={Post._id}
              onClick={() => ModifyPostToggle()}
            >
              {modify ? "Annuler" : "Modifier"}
            </Button>
            {/* {modify && <Button onClick={() => OnNewMessage()}>Envoyer</Button>} */}

            <Button className="BtnDelete" onClick={() => DeletePost(Post._id)}>
              supprimer
            </Button>
          </>
        )}
        <div className={activeLike ? "Like-active" : null}>
          <img
            className="Icon-like"
            src="./thumbs-up-regular.svg"
            alt="Icon like"
            onClick={() => likeUser()}
          />
          {like}
        </div>
      </div>
      <div className="ImgProfil">
        <img src="./user-solid.svg" alt="Profil" />
        <div>{Post.userId}</div>
      </div>
    </div>
  );
};

export default Post;
