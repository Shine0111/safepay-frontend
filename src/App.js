import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  Header,
  Login,
  Register,
  ProductList,
  ProductForm,
  Home,
  SearchResults,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="allProducts" element={<ProductList />} />
          <Route path="addProduct" element={<ProductForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/search-results/:category_id"
          element={<SearchResults />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
