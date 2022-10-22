import { useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import "../../src/styles/pages/index.scss";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
// import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
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
          console.log(token);
          localStorage.setItem("token", token);
          setIsloading(true);
          Navigate("/post");
        } else {
          if (!res.ok) {
            // alert('veuillez saisir une adresse mail et un mot de passe valide')
            setError(res.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        //C'est ici que nous récuorer notre erruer et ici qu'on écrir le code pour l'afficher
      });
    setIsloading(true);
  };

  return (
    <div className="App">
      <Logo />
      <Nav />
      <section>
        <form action="" onSubmit={handleSubmit}>
          <div className="FormInput">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="FormInput">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {<span>{error}</span>}
          <div>
            {!isLoading && (
              <Button
                className={"btnConnexion"}
                type={"submit"}
                value={"connexion"}
              >
                Connexion
              </Button>
            )}
            {isLoading && <div> En cours de chargement</div>}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
