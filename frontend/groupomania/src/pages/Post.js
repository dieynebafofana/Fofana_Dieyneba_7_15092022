
import { useState } from "react";
import AllPost from "../components/AllPost";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import NewPost from "../components/NewPost";


const Post = () => {

const [message, setMessage] = useState(null)

const PostOnUpdate = (message) => {
  const postUpdate = message;
  setMessage(postUpdate);
}
 

  return (
    <div>
      <Logo />
      <Logout />
      {/* {!Isloggedin && <p>Vous n'etes pas connectée</p> } */}
      <NewPost PostOnUpdate={PostOnUpdate}/>
      <AllPost PostOnUpdate={message}/>
    </div>
  );
};

export default Post;
