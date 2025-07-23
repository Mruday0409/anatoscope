import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HomeNavbar from "../components/HomeNavbar";
import "../styles/Home.css";

// ✅ All videos centralized here
const organVideos = {
  LUNGS: "/models/lungs.mp4",
  BRAIN: "/models/brain.mp4",
  HEART: "/models/heart.mp4",
  LIVER: "/models/liver.mp4",
  KIDNEY: "/models/kidney.mp4",
  URINARYBLADDER: "/models/urinarybladder.mp4",
};

// ✅ Organ content list
const organs = [
  {
    name: "BRAIN",
    route: "/brain",
    description:
      "The brain controls body functions, processes information, and is the center of intelligence, emotion, and memory.",
  },
  {
    name: "HEART",
    route: "/heart",
    description:
      "The heart pumps blood throughout the body, supplying oxygen and nutrients while removing waste.",
  },
  {
    name: "LUNGS",
    route: "/lungs",
    description:
      "The lungs are responsible for the exchange of oxygen and carbon dioxide, playing a vital role in respiration.",
  },
  {
    name: "LIVER",
    route: "/liver",
    description:
      "The liver processes nutrients, detoxifies harmful substances, and produces important proteins for blood clotting.",
  },
  {
    name: "KIDNEY",
    route: "/kidney",
    description:
      "The kidneys filter waste from the blood, balance body fluids, and regulate blood pressure.",
  },
  {
    name: "URINARYBLADDER",
    route: "/UrinaryBladder",
    description:
      "The urinary bladder stores urine before it is excreted from the body through the urethra.",
  },
];

// ✅ Slide animation configs
const slideVariants = {
  initial: (dir) => ({
    opacity: 0,
    scale: 0.95,
    x: dir > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  exit: (dir) => ({
    opacity: 0,
    scale: 0.95,
    x: dir > 0 ? -100 : 100,
    transition: { duration: 0.6, ease: "easeInOut" },
  }),
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setDirection(1);
    setIndex((index + 1) % organs.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex(index === 0 ? organs.length - 1 : index - 1);
  };

  // ✅ Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [index]);

  const currentOrgan = organs[index];
  const videoSrc = organVideos[currentOrgan.name];

  return (
    <div className="home-wrapper">
      {/* Background video */}
      <video autoPlay muted loop className="background-video">
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>

      <HomeNavbar />

      <div className="carousel-slide container">
        {/* Left Arrow */}
        <div
          className="arrow left"
          style={{ top: "50%", left: "30px", transform: "translateY(-50%)" }}
          onClick={handlePrev}
        >
          <i className="fas fa-arrow-left"></i>
        </div>

        {/* Slide */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            className="slide-content row align-items-center justify-content-between w-100"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            {/* Text Column */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
              <h2 className="organ-title">{currentOrgan.name}</h2>
              <p className="organ-description">{currentOrgan.description}</p>
              <button
                onClick={() => navigate(currentOrgan.route)}
                className="circular-btn"
              >
                <span>Read More</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>

            {/* Video Column */}
            <div className="col-md-6 d-flex justify-content-center model-holder">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(255, 255, 255, 0.7)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
                onClick={() => navigate(currentOrgan.route)}
              >
                <video
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100 h-100"
                  style={{
                    borderRadius: "15px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <div
          className="arrow right"
          style={{ top: "50%", right: "50px", transform: "translateY(-50%)" }}
          onClick={handleNext}
        >
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Home;