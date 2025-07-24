// src/components/OrganNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
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
  { name: "Urinary Bladder", icon: bladderIcon, path: "/urinary-bladder" },
];

const OrganNavbar = () => {
  const location = useLocation();
  const centerRef = useRef(null);
  const [beamLeft, setBeamLeft] = useState(0);

  useEffect(() => {
    const activeIcon = centerRef.current?.querySelector(".organ-icon-wrapper.active");
    if (activeIcon) {
      const parentRect = centerRef.current.getBoundingClientRect();
      const iconRect = activeIcon.getBoundingClientRect();
      const left = iconRect.left - parentRect.left + iconRect.width / 2;
      setBeamLeft(left);
    }
  }, [location.pathname]);

  return (
    <nav className="organ-navbar">
      <div className="organ-navbar-left">
        <Link to="/" className="brand">
          <img src={logo} alt="AnatoScope Logo" className="logo" />
          <span className="site-title">AnatoScope</span>
        </Link>
      </div>

      <div className="organ-navbar-center" ref={centerRef}>
        <div
          className="beam-slider"
          style={{ left: `${beamLeft}px` }}
        ></div>
        {organs.map((organ) => (
          <div
            className={`organ-icon-wrapper ${location.pathname === organ.path ? "active" : ""}`}
            key={organ.name}
          >
            <div className="spotlight"></div>
            <Link to={organ.path}>
              <img src={organ.icon} alt={organ.name} className="organ-icon" />
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
