import {  useState } from "react";
import Logo from "../components/Logo"
import Nav from "../components/Nav"
// import "./Home.css";
import "../../src/styles/pages/index.scss"
import React from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const functionTest = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    
    fetch("http://localhost:3000/api/auth/login", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((UserLogin) => {
      setEmail("");
      setPassword("");
      console.log(UserLogin)
    }).catch((error) =>{ console.log(Error)})
  };

    return (
        <div className="App">
     <Logo/>
    <Nav/>
      
      <section>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
           <p></p> 
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <p></p>
          </div>
          <div>
            <input className="Home__button"
              type="submit"
              value="Connexion"
              onClick={(e) => functionTest(e)}
            />
          </div>
        </form>
      </section> 
    </div>
    );
};

export default Login;

