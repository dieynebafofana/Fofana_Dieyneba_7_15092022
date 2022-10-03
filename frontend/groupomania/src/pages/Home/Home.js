import { useState } from "react";
import Logo from "../../components/Logo"
import Nav from "../../components/Nav";
import "./Home.css";
import "../../../src/styles/pages/index.scss"

export default function Home() {
  const [email, setEmail] = useState("");

  const functionTest = (e) => {
    e.preventDefault();
    console.log("coucou", email);

    const data = {
      email: email,
      password: "testTEST33",
    };

    console.log(JSON.stringify(data));

    // fetch("http://localhost:3000/api/auth/login", {
    //   method : "POST",
    //   headers : {
    //     "Content-Type" : "application/json
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((data)=> data.json())
    // .then((UserLogin) => {
    //   console.log(UserLogin)
    // })

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
      });
  };

  return (
    <div className="App">
    <Logo/>
    <Nav/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <section>
        <form action="">
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
            <input name="password" type="password" />
          </div>
          <div>
            <input
              type="submit"
              value="Connexion"
              onClick={(e) => functionTest(e)}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
