import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomeNavbar.css";
import logo from "../assets/images/Anatoscope-logo.png";

const HomeNavbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="home-navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          <img src={logo} alt="AnatoScope Logo" className="logo" />
          <span className="site-title">AnatoScope</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* 🔆 Custom dark/light toggle from Uiverse.io */}
        <label className="switch">
          <input
            type="checkbox"
            className="input"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
          <span className="sun">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="#ffd43b">
                <circle r="5" cy="12" cx="12"></circle>
                <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 13H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zM4.98 19.02a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zM12 4a1 1 0 0 1-1-1V2a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zM6.34 6.34a1 1 0 0 1-.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29zm12.02 12.02a1 1 0 0 1-.7-.29l-.66-.71a1 1 0 0 1 1.41-1.41l.66.71a1 1 0 0 1-.71 1.7z" />
              </g>
            </svg>
          </span>
          <span className="moon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M21.75 14.34a1 1 0 0 0-1.22-1.23 7.36 7.36 0 0 1-1.5.15 7.5 7.5 0 0 1-7.5-7.5 7.36 7.36 0 0 1 .15-1.5 1 1 0 0 0-1.22-1.22A9.51 9.51 0 1 0 21.75 14.34z"
              />
            </svg>
          </span>
        </label>
      </div>
    </nav>
  );
};

export default HomeNavbar;
 