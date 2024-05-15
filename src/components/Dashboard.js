import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="container">
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={() => navigate("/allProducts")}>
            Check my Products
          </button>
        </div>
      </section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn" onClick={() => navigate("/addProduct")}>
          Create a Product
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
