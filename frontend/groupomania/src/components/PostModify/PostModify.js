import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../../Store/AuthContext";
import Button from "../UI/Button";

const PostModify = ({ Post, setModify, updatePosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [message, setMessage] = useState(Post.message);
  const [messageModify, setMessageModify] = useState(null);
  const [image, setImage] = useState(Post.imageUrl);

  const IdPost = Post._id;

  const updatePost = (e) => {
    e.preventDefault();

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
        setMessageModify(res.message);
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

        <input
          className="InputModify"
          name="message"
          type="texterea"
          defaultValue={Post.message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="BtnSend">
          <Button onClick={(e) => updatePost(e)}>Envoyer</Button>
        </div>
        {<span>{messageModify}</span>}
      </form>
    </div>
  );
};

export default PostModify;
