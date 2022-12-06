import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import Button from "./UI/Button";
// import PostForm from "./PostForm";

const PostModify = ({ Post, setModify }) => {
  const AuthCtxt = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [ButtonSend, setButtonSend] = useState(false);
  // const [image, setImage] = useState(null);

  // const formData = new FormData();
  // formData.append("message", message);

  const IdPost = Post._id;

  const ModifyPost = (e) => {
    setMessage(e.target.value);
    // setModify(false);

    // fetch(`http://localhost:3000/api/posts/${IdPost}`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${AuthCtxt.token}`,
    //   },
    // body: formData,
    // })
    //   .then((data) => data.json())
    //   .then((NewPost) => {
    //     setModify(true);
    // setMessage(NewPost.message);
    // })
    // .catch((error) => {});
    // Fetch;
  };

  const NewPost = () => {
    console.log("j'ai appuyer sur envoyer");
    setButtonSend(true);
  };

  return (
    <div>
      {/* input text avec le texte du post */}
      <input
        name="message"
        type="texterea"
        defaultValue={Post.message}
        onChange={ModifyPost}
      />
      {/* <textarea ></textarea> */}
      {/* input image  */}
      <input name="image" type="file" />
      {/* valider  */}
      <Button onClick={() => NewPost()}>Envoyer</Button>
    </div>
  );
};

export default PostModify;
