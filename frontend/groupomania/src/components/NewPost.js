import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import LogoUpload from "./LogoUpload";

// import AddPostImg from "./AddPostImg";

import Button from "./UI/Button";

const Post = ({ PostOnUpdate }) => {
  const [message, setMessage] = useState(null);
  const AuthCtxt = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);

    // const data = { message: message };
    // console.log(data, JSON.stringify(data));

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
      // body: JSON.stringify(data),
      body: formData,
    })
      // .then((data) => data.json())
      .then((Post) => {
        console.log(Post);
        setMessage("");
        PostOnUpdate(message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section>
        <form
          className="FormPost"
          encType="multipart/form-data"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="message">
            <input
              className=" FormInputPost"
              name="message"
              placeholder="Ecrire un message"
              type="texterea"
              value={message ? message : ""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <div className=" FormPost FormBtnUpload">
          <div className=" FormBtnUpload">
            <LogoUpload /></div>
            <div>
            <Button className=" FormBtnUpload FormBtn" type="submit">
              Envoyer
            </Button>
            </div>
          </div>
        </form>

        <div></div>
      </section>
    </div>
  );
};

export default Post;
