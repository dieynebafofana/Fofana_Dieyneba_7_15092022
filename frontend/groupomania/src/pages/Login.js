import { useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import "../../src/styles/pages/index.scss";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const token = res.token;
        if (token) {
          // setError(null);
          console.log(token);
          localStorage.setItem("token", token);
          Navigate("/post")
          window.location.href = "Post";
        } else {
          if (!res.ok) {
            // setError(res.message);
            alert("veuillez saisir une adresse et un mot de passe valide");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        //C'est ici que nous récuorer notre erruer et ici qu'on écrir le code pour l'afficher
        // if(error.message){
        setError(true);
        // }
      });
  };

  return (
    <div className="App">
      <Logo />
      <Nav />
      <section>
        <form action="" onSubmit={handleSubmit}>
          {error && <span>{error}</span>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="Home__button" type="submit" value="Connexion">
              Connexion
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
