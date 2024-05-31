import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import useDeviceSize from "../hooks/useDeviceSize";

const Dashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useDeviceSize();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    width > 764 ? setIsOpen(true) : setIsOpen(false);
  }, [width]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <button className={styles.toggleButton} onClick={toggleSidebar}>
              ☰
            </button>
          </li>
          <li>
            <Link to="allProducts">All Products</Link>
          </li>
          <li>
            <Link to="addProduct">Add Product</Link>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          ☰
        </button>
        {children}
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
