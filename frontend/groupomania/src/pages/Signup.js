import React from "react";
import { useState } from "react";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import "../../src/styles/pages/index.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        console.log(UserLogin);
        Navigate("/Login");
      });
  };
  return (
    <div className="App">
      <Logo />
      <Nav />

      <section>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p id="ErrorEmail"></p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id="ErrorPassword"></p>
          </div>
          <div>
            <input
              className="Home__button"
              type="submit"
              value="Connexion"
              onClick={(e) => functionSignup(e)}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;
