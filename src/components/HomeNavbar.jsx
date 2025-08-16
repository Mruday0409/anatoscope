import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HomeNavbar.css";
import logo from "../assets/images/Anatoscope-logo.png";

// ✅ Organ-related questions and their corresponding routes
const organQuestions = [
  {
    question: "How does the brain control our body?",
    organ: "BRAIN",
    route: "/brain",
    keywords: ["brain", "control", "nervous system", "thinking", "memory"]
  },
  {
    question: "What is the function of the heart?",
    organ: "HEART", 
    route: "/heart",
    keywords: ["heart", "pump", "blood", "circulation", "cardiovascular"]
  },
  {
    question: "How do lungs help us breathe?",
    organ: "LUNGS",
    route: "/lungs", 
    keywords: ["lungs", "breathing", "oxygen", "respiration", "air"]
  },
  {
    question: "What does the liver do in our body?",
    organ: "LIVER",
    route: "/liver",
    keywords: ["liver", "detox", "nutrients", "proteins", "metabolism"]
  },
  {
    question: "How do kidneys filter waste?",
    organ: "KIDNEY",
    route: "/kidney",
    keywords: ["kidney", "filter", "waste", "urine", "blood pressure"]
  },
  {
    question: "What is the role of the urinary bladder?",
    organ: "URINARYBLADDER",
    route: "/UrinaryBladder",
    keywords: ["bladder", "urine", "storage", "excretion", "urinary"]
  },
  {
    question: "How does the brain process information?",
    organ: "BRAIN",
    route: "/brain",
    keywords: ["brain", "process", "information", "neurons", "signals"]
  },
  {
    question: "What causes heart disease?",
    organ: "HEART",
    route: "/heart", 
    keywords: ["heart", "disease", "attack", "cardiovascular", "health"]
  },
  {
    question: "How do lungs exchange gases?",
    organ: "LUNGS",
    route: "/lungs",
    keywords: ["lungs", "gas", "exchange", "alveoli", "carbon dioxide"]
  },
  {
    question: "What are liver diseases?",
    organ: "LIVER",
    route: "/liver",
    keywords: ["liver", "disease", "hepatitis", "cirrhosis", "damage"]
  }
];

const HomeNavbar = () => {
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ✅ Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredQuestions([]);
      setShowDropdown(false);
    } else {
      const filtered = organQuestions.filter(question =>
        question.question.toLowerCase().includes(query.toLowerCase()) ||
        question.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredQuestions(filtered);
      setShowDropdown(true);
    }
  };

  // ✅ Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    // Find the best match
    const bestMatch = organQuestions.find(question =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (bestMatch) {
      navigate(bestMatch.route);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  // ✅ Handle dropdown item click
  const handleDropdownClick = (question) => {
    navigate(question.route);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="home-navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          <img src={logo} alt="AnatoScope Logo" className="logo" />
          <span className="site-title">AnatoScope</span>
        </Link>
      </div>

      {/* ✅ Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Ask about organs... (e.g., brain, heart, lungs)"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>

        {/* ✅ Dropdown Suggestions */}
        {showDropdown && filteredQuestions.length > 0 && (
          <div className="search-dropdown">
            {filteredQuestions.map((question, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleDropdownClick(question)}
              >
                <div className="question-text">{question.question}</div>
                <div className="organ-tag">{question.organ}</div>
              </div>
            ))}
          </div>
        )}
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
 