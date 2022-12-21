import Button from "./UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import PostModify from "./PostModify";

const Post = ({ Post, FetchPosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [modify, setModify] = useState(false);
  const [liked, setLiked] = useState(Post.likes);
  console.log(Post.usersLiked.includes(AuthCtxt.userId));

  const [activeLike, setActiveLike] = useState(
    Post.usersLiked.includes(AuthCtxt.userId)
  );

  const DeletePost = (post_id) => {
    fetch(`http://localhost:3000/api/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
    })
      .then((data) => data.json())
      .then((PostUser) => {
        FetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ModifyPostToggle = () => {
    let toggle = modify ? false : true;
    setModify(toggle);
  };

  const Onlike = (e) => {
    e.preventDefault();
    console.log("je suis dans le boutton like");
    const data = {
      like: activeLike ? 0 : 1,
    };

    if (activeLike) {
      setActiveLike(false);
      setLiked(liked - 1);
    } else {
      setActiveLike(true);
      setLiked(liked + 1);
    }

    console.log(Post._id, data);

    fetch(`http://localhost:3000/api/posts/${Post._id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthCtxt.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((UserLike) => {
        console.log(UserLike);
        FetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="PostRenderMessage">
      <div className="ImgPost">
        <img src={Post.imageUrl} alt="" />
      </div>
      {!modify && <p>{Post.message}</p>}
      {modify && (
        <PostModify
          Post={Post}
          setModify={setModify}
          updatePosts={FetchPosts}
        />
      )}

      <div className="BtnPost">
        {AuthCtxt.userId === Post.userId && (
          <>
            <Button
              className="BtnUpdate"
              id={Post._id}
              onClick={() => ModifyPostToggle()}
            >
              {modify ? "Annuler" : "Modifier"}
            </Button>

            <Button className="BtnDelete" onClick={() => DeletePost(Post._id)}>
              supprimer
            </Button>
          </>
        )}

        <Button
          onClick={(e) => Onlike(e)}
          className={activeLike ? "Like-active" : null}
        >
          <div>
            <img
              className="Icon-like "
              src="./thumbs-up-regular.svg"
              alt="Icon like"
            />
          </div>
          <div>{liked}</div>
        </Button>
      </div>
      <div className="ImgProfil">
        <img src="./user-solid.svg" alt="Profil" />
        <div>{Post.userId}</div>
      </div>
    </div>
  );
};

export default Post;
