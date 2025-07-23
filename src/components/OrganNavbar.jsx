// src/components/OrganNavbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/OrganNavbar.css";
import logo from "../assets/images/Anatoscope-logo.png";
import ThemeToggle from "./ThemeToggle";

// Organ icon imports
import brainIcon from "../assets/icons/brain.png";
import lungsIcon from "../assets/icons/lungs.png";
import heartIcon from "../assets/icons/heart.png";
import kidneyIcon from "../assets/icons/kidney.png";
import liverIcon from "../assets/icons/liver.png";
import bladderIcon from "../assets/icons/urinary bladder.png";

const organs = [
  { name: "Brain", icon: brainIcon, path: "/brain" },
  { name: "Lungs", icon: lungsIcon, path: "/lungs" },
  { name: "Heart", icon: heartIcon, path: "/heart" },
  { name: "Kidney", icon: kidneyIcon, path: "/kidney" },
  { name: "Liver", icon: liverIcon, path: "/liver" },
  { name: "UrinaryBladder", icon: bladderIcon, path: "/UrinaryBladder" },
];

const OrganNavbar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <nav className="organ-navbar">
      <div className="organ-navbar-left">
        <Link to="/" className="brand">
          <img src={logo} alt="AnatoScope Logo" className="logo" />
          <span className="site-title">AnatoScope</span>
        </Link>
      </div>

      <div className="organ-navbar-center">
        {organs.map((organ) => (
          <div
            className={`organ-icon-wrapper ${
              activePath === organ.path ? "active" : ""
            }`}
            key={organ.name}
          >
            <div className="spotlight"></div>
            <Link to={organ.path}>
              <img
                src={organ.icon}
                alt={organ.name}
                className="organ-icon"
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="organ-navbar-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default OrganNavbar;
