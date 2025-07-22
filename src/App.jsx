import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Heart from './pages/Heart';
import Brain from './pages/Brain';
import Kidney from './pages/Kidney';
import Liver from './pages/Liver';
import Lungs from './pages/Lungs';
import UrinaryBladder from './pages/UrinaryBladder';

function App() {
  const location = useLocation();

  // Determine if we're on home page
  const isHomePage = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      
      {/* Show regular navbar on all pages except home */}
      {!isHomePage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<Heart />} />
        <Route path="/brain" element={<Brain />} />
        <Route path="/kidney" element={<Kidney />} />
        <Route path="/liver" element={<Liver />} />
        <Route path="/lungs" element={<Lungs />} />
        <Route path="/urinary-bladder" element={<UrinaryBladder />} />
      </Routes>
    </>
  );
}

export default App;