import React, { useEffect, useState } from "react";
import "../style/basket.css";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import Header from "../components/Header";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [user, setUser] = useState([]);

  const basketCollectionRef = collection(db, "basket");
  const usersCollectionRef = collection(db, "users");
  const ordersColllectionRef = collection(db, "orders");

  const getAllUsers = async () => {
    try {
      const usersData = await getDocs(usersCollectionRef);
      const users = usersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const findUser = users.find(
        (user) => user.userid === auth.currentUser.uid
      );

      if (findUser) {
        setUser(findUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  //sipariş oluşturduktan sonra sepeti silme için clear  func
  const clearBasket = async () => {
    await basket.map((product) => {
      const productDoc = doc(db, "basket", product.id);
      deleteDoc(productDoc);
    });
    getBasket();
  };

  useEffect(() => {
    getBasket();
    getAllUsers();
  }, []);

  const createOrderFunc = async () => {
    if (user) {
      await addDoc(ordersColllectionRef, {
        userName: user.name,
        userSurname: user.surname,
        userAdress: user.adress,
        userEmail: user.email,
        userId: user.userid,
        products: basket,
      });
      alert("siparişiniz oluşturuldu");
      clearBasket();
    } else {
      alert("kişisel bilgileriniz mevcut değil");
    }
  };

  return (
    <div className="card">
      <Header />
      <div className="card-main">
        {basket
          ? basket.map((product) => (
              <div className="card-product">
                <img src={product.image} alt="" />
                <p className="product-name">{product.name}</p>
                <p>{product.price} TL</p>
                <button>Sil</button>
              </div>
            ))
          : null}

        <button onClick={createOrderFunc}>Sipariş oluştur</button>
      </div>
    </div>
  );
};

export default Basket;
