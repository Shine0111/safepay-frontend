import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import SearchBar from "./SearchBar";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutFn = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">SafePay</Link>
      </div>
      <ul>
        <li>
          <SearchBar />
        </li>
        {user ? (
          <>
            <li>
              <button className="btn" onClick={logoutFn}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              {/* Logged in user only, For now */}
              <Link to="/cart">
                <FaCartShopping />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
