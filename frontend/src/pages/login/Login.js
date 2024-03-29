import { useContext, useState } from "react";
import Logo from "../../components/Header/Logo/Logo";
import Nav from "../../components/Header/Nav/Nav";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import AuthContext from "../../Store/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const Navigate = useNavigate();
  const AuthCtxt = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        const token = res.token;
        const userId = res.userId;
        const isAdmin = res.isAdmin;

        if (token) {
          AuthCtxt.login(token, userId, isAdmin);
          setIsloading(true);
          Navigate("/Post");
        } else {
          if (!res.ok) {
            setError(res.message);
            setIsloading(false);
          }
        }
      })
      .catch((err) => {});
    setIsloading(true);
  };

  return (
    <div className="App">
      <Logo />
      <Nav />
      <section>
        <h1>Se connecter</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="FormInput">
            <label htmlFor="email">Entrée une adresse email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="FormInput">
            <label htmlFor="password">Entrée un mot de passe</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {<span className="textError">{error}</span>}
          <div>
            {!isLoading && (
              <Button className="btnLogin" type="submit" value="connexion">
                Se connecter
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
