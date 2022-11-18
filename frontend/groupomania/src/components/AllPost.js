import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";

const AllPost = (PostOnUpdate) => {
  const AuthCtxt = useContext(AuthContext);
  const [messages, setMessages] = useState(null);

  const FetchPost = () => {
    fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      }
    })
      .then((data) => data.json())
      .then((Posts) => {
        console.log(Posts);
        if (!Posts.ok) {
          setMessages(Posts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  useEffect(()=> {
    FetchPost()
  },[PostOnUpdate])
  return (
    <div>
    <section className="PostRender" >
      {messages && messages.map((message) => (<p className="PostRenderMessage" key={`${message._id}`}>{message.message}</p>))}
      </section>
    </div>
  );
};

export default AllPost;
