import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Basket from "./pages/Basket";
import Detail from "./pages/Detail";
import AdminPanel from "./pages/AdminPanel";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
