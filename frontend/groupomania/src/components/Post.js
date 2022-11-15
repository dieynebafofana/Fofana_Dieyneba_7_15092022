import React, { useState } from "react";
import Button from "./UI/Button";

const Post = () => {
  const [post, setPost] = useState(null);

  const handleSubmit = (e) => {
    e.prenventDefault();
    console.log("handleSubmit");
    //Fonction fetchAddPost
    // fetchAddPosts()
  };
  return (
    <div>
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

          <Button type="submit">Envoyer</Button>
        </form>

        <div></div>
      </section>
    </div>
  );
};

export default Post;
