import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/Anatoscope-logo.png";
// If you want to style navbar separately

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavCollapse = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      {/* Left: Logo and Brand */}
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src={logo}
          alt="AnatoScope Logo"
          width="40"
          height="40"
          className="me-2"
        />
        <span className="fw-bold fs-4">AnatoScope</span>
      </Link>

      {/* Right: ThemeToggle ALWAYS visible */}
      <div className="d-lg-none ms-auto">
        <ThemeToggle />
      </div>

      {/* Hamburger button */}
      <button
        className="navbar-toggler ms-2"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-controls="navbarNav"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Center: Nav Links */}
      <div
        className={`collapse navbar-collapse justify-content-center ${menuOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav text-center">
          {["Heart", "Brain", "Kidney", "Liver", "Lungs", "UrinaryBladder"].map((page) => (
            <li className="nav-item" key={page}>
              <NavLink
                to={`/${page.toLowerCase()}`}
                className="nav-link"
                onClick={handleNavCollapse}
              >
                {page.replace(/([A-Z])/g, " $1").trim()}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: ThemeToggle (for large screens) */}
      <div className="d-none d-lg-block ms-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
