import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import Header from "../components/Header";
import "../style/detail.css";

const Detail = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  const productsCollectionRef = collection(db, "products");
  const basketCollectionRef = collection(db, "basket");

  //ürnleri getirme
  const getAllProducts = async () => {
    try {
      const productsData = await getDocs(productsCollectionRef);
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const thatProduct = justProducts.filter((item) => item.id === id);
      setProduct(thatProduct[0]);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //sepete ürün ekleme
  const productAddBasketFunc = async () => {
    try {
      await addDoc(basketCollectionRef, {
        name: product.name,
        price: product.price,
        image: product.image,
        id: Math.random(),
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="detail">
      <Header />
      {product ? (
        <div className="product">
          <img src={product.image} alt="" />
          <p className="product-name">{product.name}</p>
          <p className="product-detail">{product.detail}</p>
          <div className="product-other">
            <p>{product.price} TL</p>{" "}
            <button onClick={productAddBasketFunc}>Sepete Ekle</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Detail;
