import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import Button from "./UI/Button";
// import PostForm from "./PostForm";

const PostModify = ({ Post, setModify, updatePosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [message, setMessage] = useState(Post.message);
  // const [ButtonSend, setButtonSend] = useState(false);
  const [image, setImage] = useState(Post.imageUrl);
  console.log(message, image);

  const IdPost = Post._id;

  const updatePost = (e) => {
    e.preventDefault();
    console.log("j'ai appuyer sur envoyer");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);

    fetch(`http://localhost:3000/api/posts/${IdPost}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        setModify(false);
        updatePosts();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form>
        <div>
          <input
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {/* input text avec le texte du post */}
        <input
          name="message"
          type="texterea"
          defaultValue={Post.message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* valider  */}
        <Button onClick={(e) => updatePost(e)}>Envoyer</Button>
      </form>
    </div>
  );
};

export default PostModify;
