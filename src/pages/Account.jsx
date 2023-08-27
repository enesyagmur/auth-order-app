import React, { useEffect, useState } from "react";
import "../style/account.css";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";
import Header from "../components/Header";

const Account = () => {
  const usersCollectionRef = collection(db, "users");
  const [user, setUser] = useState([]);

  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [inputAdress, setInputAdress] = useState("");

  //users koleksiyonunda aktif olarak giriş yapmış olan kullanıcı var mı yok mu bulmaya yarayan fonk
  const getAllUsers = async () => {
    try {
      //kullanıcıları alma
      const usersData = await getDocs(usersCollectionRef);
      const users = usersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //kullanıcılar arası arama yapma
      const findUser = users.find(
        (user) => user.userid === auth.currentUser.uid
      );

      if (findUser) {
        console.log("kullanıcı bilgileri mevcut");
        setUser(findUser);
      } else {
        console.log("kullanıcı bilgileri yok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //kullanıcı bilgisi kayıt etme
  const addUserData = async () => {
    if (user.name) {
      alert("kullanıcı bilgileri kayıtlı");
    } else {
      try {
        await addDoc(usersCollectionRef, {
          name: inputName,
          surname: inputSurname,
          email: auth.currentUser.email,
          adress: inputAdress,
          userid: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="account">
      <Header />
      {user.name ? (
        <div className="account-main">
          <h1>Kişisel Bilgiler</h1>
          <input type="text" placeholder="İsim" value={user.name} />
          <input type="text" placeholder="Soyisim" value={user.surname} />
          <input type="text" placeholder="Adres" value={user.adress} />
          <button className="button" onClick={addUserData}>
            Güncelle
          </button>
        </div>
      ) : (
        <div className="account-main">
          <h1>Kişisel Bilgilerinizi Girin</h1>
          <input
            type="text"
            placeholder="İsim"
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyisim"
            onChange={(e) => setInputSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adres"
            onChange={(e) => setInputAdress(e.target.value)}
          />
          <button className="button" onClick={addUserData}>
            Kayıt
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
