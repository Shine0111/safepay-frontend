import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  Header,
  Login,
  Register,
  ProductForm,
  Home,
  SearchResults,
  ProductPage,
} from "./components";
import DashProducts from "./pages/DashProducts/DashProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import CartPage from "./components/CartPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="allProducts" element={<DashProducts />} />
          <Route path="addProduct" element={<ProductForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/search-results/:category_id"
          element={<SearchResults />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
