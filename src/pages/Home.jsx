import React from "react";
import "../style/home.css";
import Products from "../components/Products";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Home = () => {
  const basket = useSelector((state) => state.basket.basketProducts);

  return (
    <div className="home">
      <Header />
      <Products />
    </div>
  );
};

export default Home; // redux ta sorun yaşıyorum state i göremiyor
