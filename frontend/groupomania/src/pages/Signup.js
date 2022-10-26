import React from "react";
import { useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import "../../src/styles/pages/index.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState(null);
  
  const Navigate = useNavigate();

  const functionSignup = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((UserLogin) => {
        setNewUser(UserLogin.message);

        if (!data.ok) {
          setError(UserLogin.error);
        }

        Navigate("/Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Logo />
      <Nav />

      <section>
      <h1>Créer un compte</h1>
        <form action="" onSubmit={functionSignup}>
          <div className="FormInput">
          
            <label htmlFor="email">Veuillez saisir une adresse email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="FormInput">
            <label htmlFor="password">Veuillez saisir un mot de passe</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {newUser}
          {<span>{error}</span>}
          <div>
            <button className="btnConnexion" type="submit" value="Connexion">
              S'inscrire
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;
