import React, { useEffect, useState } from "react";
import "../style/products.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const productsData = await getDocs(productsCollectionRef);
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(justProducts);
    } catch (err) {
      alert(err);
    }
  };

  const goDetailFunc = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="products">
      {products
        ? products.map((product) => (
            <div className="product">
              <img src={product.image} alt="" />
              <p className="product-name">{product.name}</p>
              <div className="product-other">
                <p>{product.price} TL</p>{" "}
                <button onClick={() => goDetailFunc(product.id)}>Detay</button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Products;
