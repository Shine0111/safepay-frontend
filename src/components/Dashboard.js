import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="container">
      <section className="heading">
        <h1>Welcome {user && user.user.name}</h1>
        <p>Products Dashboard</p>
      </section>
      <ProductForm />
    </div>
  );
}

export default Dashboard;
