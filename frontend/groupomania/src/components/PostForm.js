import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";
// import LogoUpload from "./LogoUpload";

// import AddPostImg from "./AddPostImg";

import Button from "./UI/Button";

const PostForm = ({ PostOnUpdate }) => {
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const AuthCtxt = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
      body: formData,
    })
      .then((data) => data.json())
      .then((Post) => {
        console.log(Post);
        setMessage("");
        setImage("");
        PostOnUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section>
        <form
          action="/upload"
          className="FormPost "
          encType="multipart/form-data"
          method="post"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className=" FormInputPost">
            <div>
              <div className="ImgUpload">
                <img
                  className="Image"
                  src="./upload-solid.svg"
                  alt="Logo upload"
                />
                <div>
                  <input
                    className="ImgUploadFile"
                    name="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <input
              name="message"
              className="InputMessage"
              placeholder="Ecrire un message"
              type="texterea"
              // encType="multipart/form-data"
              value={message ? message : ""}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="FormBtn">
              <Button type="submit">Envoyer</Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default PostForm;
