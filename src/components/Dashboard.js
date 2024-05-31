import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import useDeviceSize from "../hooks/useDeviceSize";

const Dashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useDeviceSize();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const backdropRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    width > 764 ? setIsOpen(true) : setIsOpen(false);
  }, [width]);

  useEffect(() => {
    const handleClick = (e) => {
      if (backdropRef.current && backdropRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

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
          <li onClick={toggleSidebar}>
            <Link to="allProducts">All Products</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="addProduct">Add Product</Link>
          </li>
        </ul>
      </div>
      {isOpen && width < 764 && (
        <div className={styles.backdrop} ref={backdropRef}></div>
      )}

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
