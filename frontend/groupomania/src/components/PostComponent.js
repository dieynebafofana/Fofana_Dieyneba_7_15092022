import Button from "./UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import PostModify from "./PostModify";
// import PostLike from "./PostLike";

const Post = ({ Post, FetchPosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [modify, setModify] = useState(false);
  const [liked, setLiked] = useState(Post.likes);
  const [activeLike, setActiveLike] = useState(
    Post.usersLiked.includes(AuthCtxt.userId)
  );
  const [buttonPost, setButtonPost] = useState(
    AuthCtxt.userId === Post.userId || AuthCtxt.isAdmin === true
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
        {buttonPost && (
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
        {/* 
        {liked && <PostLike Post={Post} setLiked={setLiked} />} */}
        <Button onClick={(e) => Onlike(e)}>
          <div>
            <img
              className="Icon-like "
              src="./thumbs-up-regular.svg"
              alt="Icon like"
            />
          </div>
          <div className={[activeLike ? "Like-active" : null]}>{liked}</div>
        </Button>
      </div>
      <div className="ImgProfil">
        <img src="./user-solid.svg" alt="Profil" />
        <div></div>
      </div>
    </div>
  );
};

export default Post;