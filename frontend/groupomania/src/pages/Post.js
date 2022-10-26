// import React, { useState } from "react";
import { useContext } from "react";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import AuthContext from "../Store/AuthContext";

const Post = () => {
  //post useState (future data)
  // const [post, setPost] = useState(true)
  //loading useState(true) (future data)
// const [loading, setLoading] = useState (true)
  // const token Récupere le token du localStorage
// const tokenLocalstorage = localStorage.getItem("token")
  // useEffect([token]) (if not token reidrection vers login)
const AuthCtxt = useContext(AuthContext)

  //useEffect
    fetch("http://localhost:3000/api/posts", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Autorisation: `Bearer ${AuthCtxt.token}`,
      
      },
      body: JSON.stringify({userId:AuthCtxt.userId}),
    })
      .then((data) => data.json())
      .then((Posts) => {
        console.log(Posts);
      
        
        //setPost
        //setLoading(false)
      })
      .catch((err) => {
        // console.log(err);
        //Redirection vers login
      });
    //End useEffect ([post, loading, token])

  return (
    <div>
      <Logo />
      <Logout />
      <section>
        <form className="FormPost">
        <label htmlFor="message">
          <input className="InputMessage"
            name="message"
            type="texterea"
            min="1"
            max="300"
          /> 
        </label>
        {/* <button>Envoyer</button> */}
        </form>
        <div>

        {/* loading ? loading... : Afficher les posts */}
          
        </div>
      </section>
    </div>
  );
};

export default Post;
