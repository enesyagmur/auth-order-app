import React, { useState } from "react";
import "../style/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //giriş foksiyonu
  const loginFunc = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          if ((email === "admin@gmail.com") & (password === "123456")) {
            window.location = "/adminpanel";
          } else {
            window.location = "/";
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //kayıt ol a git
  const goRegister = () => {
    window.location = "/register";
  };

  return (
    <div className="login">
      <div className="login-main">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginFunc}>Giriş</button>
        <p onClick={goRegister}>Kayıt ol</p>
      </div>
    </div>
  );
};

export default Login;
