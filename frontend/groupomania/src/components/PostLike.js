import React from "react";

import AuthContext from "../Store/AuthContext";
import { useContext } from "react";

const PostLike = (Post_id) => {
  const AuthCtxt = useContext(AuthContext);

  fetch(`http://localhost:3000/api/posts/?${Post_id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AuthCtxt.token}`,
    },
  })
    .then((data) => data.json())
    .then((UserLike) => {
      console.log(UserLike);
    })
    .catch((error) => {
      console.log(error);
    });

  return <div></div>;
};

export default PostLike;
