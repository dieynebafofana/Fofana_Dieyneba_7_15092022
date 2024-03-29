import { useState } from "react";
import Logo from "../components/Header/Logo/Logo";
import Nav from "../components/Header/Nav/Nav";
import "../../src/styles/pages/index.scss";

const Signup = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState(null);

  const functionSignup = (e) => {
    e.preventDefault();
    const data = {
      pseudo: pseudo,
      email: email,
      password: password,
    };

    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((UserLogin) => {
        if (UserLogin.ok) {
          setNewUser(UserLogin.message);
        } else {
          setError(UserLogin.message);
          setNewUser(UserLogin.error);
        }
      })

      .catch((error) => {});
  };

  return (
    <div className="App">
      <Logo />
      <Nav />

      <section>
        <h1>Créer un compte</h1>
        <form action="" onSubmit={functionSignup}>
          <div className="FormInput">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              name="pseudo"
              type="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
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
          {<span className="textError">{error}</span>}
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
