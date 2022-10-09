import React from "react";
import { useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import "../../src/styles/pages/index.scss";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const functionLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    // const EmailError = document.querySelector(".EmailError");
    // const PasswordError = document.querySelector(".PasswordError");

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setEmail("");
        setPassword("");
        console.log(res);
        const token = res.token;
        localStorage.setItem("token", token);
        // window.location.href = "Post";
        // if (setEmail && setPassword === "") {
        //   EmailError.innerHTML = `Veuillez saisir une adresse mail`;
        //   PasswordError.innerHTML = `Veuillez saisir un mot de passe`;
          
          
        // }
      })
      .catch((error) => {
        console.log(error);   
      });
    
  };
  // function ErrorLogin(){

  //   if(email === ""){
  //     alert("Veuillez saisir une adresse mail")
  //     console.log(ErrorLogin)
  //   }
  // }
  return (
    <div className="App">
      <Logo />
      <Nav />
      <section>
        <form action="" onSubmit={functionLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="EmailError"></div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="PasswordError"></div>
          </div>
          <div>
            <input
              className="Home__button"
              type="submit"
              value="Connexion"
              onClick={(e) => functionLogin(e)}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
