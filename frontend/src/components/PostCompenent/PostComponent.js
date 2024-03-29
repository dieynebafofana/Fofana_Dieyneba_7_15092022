import Button from "../UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../../Store/AuthContext";
import PostModify from "../PostModify/PostModify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Post = ({ Post, FetchPosts }) => {
  const AuthCtxt = useContext(AuthContext);
  const [modify, setModify] = useState(false);
  const [liked, setLiked] = useState(Post.likes);
  const [activeLike, setActiveLike] = useState(
    Post.usersLiked.includes(AuthCtxt.userId)
  );
  const [Postdelete, setPostdelete] = useState("");
  const buttonPost =
    AuthCtxt.userId === Post.userId._id || AuthCtxt.isAdmin === true;

  const DeletePost = (Post) => {
    const ConfirmDelete = window.confirm("Voulez-vous supprimer ce post ?");

    if (ConfirmDelete === true) {
      fetch(`http://localhost:5000/api/posts/${Post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AuthCtxt.token}`,
        },
      })
        .then((data) => data.json())
        .then((PostUser) => {
          setPostdelete(alert(PostUser.message));
          FetchPosts();
        })
        .catch((error) => {
          setPostdelete(alert(error.error));
        });
    } else {
      return;
    }
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

    fetch(`http://localhost:5000/api/posts/${Post._id}/like`, {
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
      .catch((error) => {});
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

            <Button
              className="BtnDelete"
              id={Post._id}
              onClick={() => DeletePost(Post)}
            >
              supprimer
            </Button>
            {Postdelete}
          </>
        )}
        <Button onClick={(e) => Onlike(e)}>
          <div className="btnlike">
            <div className={[activeLike ? "Like-active" : null]}>
              <div className="Icon-Like">
                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
              </div>
            </div>
            <div></div>
            <div className={[activeLike ? "Like-active" : null]}>{liked}</div>
          </div>
        </Button>
      </div>
      <div className="ImgProfil">
        <img src="./images/user-solid.svg" alt="Profil" />
        {!AuthCtxt.userId === !Post.userId._id && (
          <div className="pseudo">{Post.userId.pseudo}</div>
        )}
      </div>
    </div>
  );
};

export default Post;
