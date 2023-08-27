import React, { useState } from "react";
import "../style/register.css";
import { auth } from "../Firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //kayıt olma fonksiyonu
  const registerFunc = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          window.location = "/";
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //login e git
  const goLogin = () => {
    window.location = "/login";
  };

  return (
    <div className="register">
      <div className="register-main">
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
        <button onClick={registerFunc}>Kayıt</button>
        <p onClick={goLogin}>Giriş yap</p>
      </div>
    </div>
  );
};

export default Register;
