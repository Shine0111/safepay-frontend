import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Dashboard, Header, Login, Register } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
