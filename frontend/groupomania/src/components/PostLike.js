// import React from "react";

// import AuthContext from "../Store/AuthContext";
// import { useContext, useState } from "react";

// const PostLike = (Post, FetchPosts, liked) => {
//   const AuthCtxt = useContext(AuthContext);
//   const [activeLike, setActiveLike] = useState(
//     Post.usersLiked.includes(AuthCtxt.userId)
//   );

//   const data = {
//     like: activeLike ? 0 : 1,
//   };
//   if (activeLike) {
//     setActiveLike(false);
//     setLiked(liked - 1);
//   } else {
//     setActiveLike(true);
//     setLiked(liked + 1);
//   }
//   fetch(`http://localhost:3000/api/posts/${Post._id}/like`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${AuthCtxt.token}`,
//     },
//     body: JSON.stringify(data),
//   })
//     .then((data) => data.json())
//     .then((UserLike) => {
//       console.log(UserLike);
//       FetchPosts();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return <div></div>;
// };

// export default PostLike;
