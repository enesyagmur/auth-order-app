import React, { useEffect, useState } from "react";

import "../style/adminpanel.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";

const AdminPanel = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const productsCollectionRef = collection(db, "products");
  const ordersCollectionRef = collection(db, "orders");

  //Ürün ekleme
  const addProductToDb = async () => {
    if (
      (name !== "") &
      (detail !== "") &
      (price !== "") &
      (stock !== "") &
      (image !== "")
    ) {
      try {
        await addDoc(productsCollectionRef, {
          name: name,
          detail: detail,
          price: price,
          stock: stock,
          image: image,
        });
        getAllProducts();
        setName("");
        setDetail("");
        setPrice("");
        setStock("");
        setImage("");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("ürün biilgileri boş bırakılamaz");
    }
  };

  // tüm ürünleri getirme
  const getAllProducts = async () => {
    try {
      const productsData = await getDocs(productsCollectionRef);
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(justProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllOrders();
  }, []);

  // veritabanınndan ürün silme
  const removeProductFromDb = async (id) => {
    const productsDoc = doc(db, "products", id);
    await deleteDoc(productsDoc);
    getAllProducts();
  };

  //siparişleri getirme
  const getAllOrders = async () => {
    try {
      const ordersData = await getDocs(ordersCollectionRef);
      const justOrders = ordersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(justOrders);
    } catch (err) {
      console.log(err);
    }
  };

  //üründe değişiklik yapma
  const productPriceChange = async (raiseOrdiscount, id, price) => {
    const productDoc = doc(db, "products", id);

    if (raiseOrdiscount === "raise") {
      await updateDoc(productDoc, { price: Math.round(price * 1.5) });
      getAllProducts();
    } else if (raiseOrdiscount === "discount") {
      await updateDoc(productDoc, { price: Math.round(price * 0.5) });
      getAllProducts();
    }
  };

  return (
    <div className="adminpanel">
      <div className="add-product">
        <input
          type="text"
          className=""
          placeholder="Ürün ismi"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          className=""
          placeholder="Ürün detayı"
          onChange={(e) => setDetail(e.target.value)}
          value={detail}
        />
        <input
          type="text"
          className=""
          placeholder="Ürün fiyatı"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input
          type="text"
          className=""
          placeholder="Stok sayısı"
          onChange={(e) => setStock(e.target.value)}
          value={stock}
        />
        <input
          type="text"
          className=""
          placeholder="Ürün resmi"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <button onClick={addProductToDb}>Ürün ekle</button>
      </div>

      <div className="adminPanel-product">
        {products
          ? products.map((product) => (
              <div className="product">
                <img src={product.image} alt="" />
                <p className="product-name">{product.name}</p>
                <p>{product.price} TL</p>
                <div className="product-buttons">
                  <button
                    onClick={() =>
                      productPriceChange("raise", product.id, product.price)
                    }
                  >
                    Zam
                  </button>
                  <button
                    onClick={() =>
                      productPriceChange("discount", product.id, product.price)
                    }
                  >
                    İndirim
                  </button>
                  <button onClick={() => removeProductFromDb(product.id)}>
                    Sil
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>

      <div className="orders">
        {orders
          ? orders.map((order) => (
              <div className="order">
                <p className="user-name">
                  {order.userName} - {order.userSurname}
                </p>
                <p className="adress">{order.userAdress}</p>
                <p className="product-count">{order.products.length}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminPanel;
