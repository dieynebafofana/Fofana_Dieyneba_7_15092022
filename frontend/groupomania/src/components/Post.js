// import React, { useState } from "react";
import Button from "./UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import PostModify from "./PostModify";

const Post = ({ Post }) => {
  const AuthCtxt = useContext(AuthContext);
  const [Delete, setDelete] = useState();
  console.log(Delete);
  const IdPost = Post._id;

  const DeletePost = () => {
    console.log(DeletePost);
    console.log("je supprime");

    fetch(`http://localhost:3000/api/posts/${IdPost}?userId=${Post.userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
    })
      .then((data) => data.json())
      .then((PostUser) => {
        console.log(PostUser);
        if (!PostUser.ok) {
          setDelete(IdPost);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="PostRenderMessage" key={`${IdPost}`}>
      <div className="ImgPost">
        <img src={Post.imageUrl} alt="" />
      </div>
      <p>{Post.message}</p>

      <PostModify Modify={Post.message} />
      <div className="BtnPost">
        {AuthCtxt.userId === Post.userId && (
          <>
            <Button className="BtnUpdate">Modifier</Button>
            <Button className="BtnDelete" onClick={DeletePost}>
              supprimer
            </Button>
          </>
        )}
      </div>
      <div className="ImgProfil">
        <img src="./user-solid.svg" alt="Profil" />
        <div>{Post.userId}</div>
      </div>
    </div>
  );
};

export default Post;
