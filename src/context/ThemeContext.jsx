// src/context/ThemeContext.jsx
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const ThemeContext = createContext();

// Provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Read saved theme from localStorage or fallback to light
    return localStorage.getItem("theme") || "light";
  });

  // Update <body> class and save to localStorage on theme change
  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // you can also use body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
