import React, { useEffect, useState } from "react";
import "../style/header.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const Header = () => {
  const [basket, setBasket] = useState([]);
  const [admin, setAdmin] = useState(false);
  const basketCollectionRef = collection(db, "basket");

  //sepetteki ürünleri getirme
  const getBasket = async () => {
    try {
      const basketData = await getDocs(basketCollectionRef);
      const justBasket = basketData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBasket(justBasket);
    } catch (err) {
      console.log(err);
    }
  };

  //sepeti sıfırlama fonksiyonu
  const clearBasket = async () => {
    await basket.map((product) => {
      const productDoc = doc(db, "basket", product.id);
      deleteDoc(productDoc);
    });
    getBasket();
  };

  //çıkış fonksiyonu
  const logoutFunc = async () => {
    clearBasket();

    setTimeout(() => {
      signOut(auth)
        .then(() => {
          window.location = "/login";
        })
        .catch((err) => {
          alert(err);
        });
    }, 1000);
  };

  useEffect(() => {
    getBasket();
  }, []);

  const goHomeFunc = () => {
    window.location = "/";
  };

  const goBasketFunc = () => {
    window.location = "/basket";
  };

  const goAccountFunc = () => {
    window.location = "/account";
  };

  return (
    <div className="header">
      <h1 onClick={goHomeFunc}>Logo</h1>
      <div className="header-links">
        <p onClick={goBasketFunc}>Sepet</p>
        <p onClick={goAccountFunc}>Hesap</p>
        <p onClick={logoutFunc}>Çıkış</p>
      </div>
    </div>
  );
};

export default Header;
