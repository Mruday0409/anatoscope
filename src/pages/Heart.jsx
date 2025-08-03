// src/pages/Heart.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "../styles/Heart.css";
import heartImage from "../assets/images/Heart-1.png";

const title = "Anatomy of a Human Heart";

const leftParts = [
  { name: "Brachiocephalic trunk", number: 1, position: "top-right" },
  { name: "Left common carotid artery", number: 2, position: "top-center" },
  { name: "Left subclavian artery", number: 3, position: "top-left" },
  { name: "Aorta arch", number: 4, position: "top-arch" },
  { name: "Left pulmonary artery", number: 5, position: "upper-left" },
  { name: "Left pulmonary veins", number: 6, position: "upper-left-side" },
  { name: "Auricle of left atrium", number: 7, position: "upper-left-chamber" },
  { name: "Left ventricle", number: 8, position: "lower-left" },
];

const rightParts = [
  { name: "Superior vena cava", number: 9, position: "top-right-vein" },
  { name: "Right pulmonary artery", number: 10, position: "upper-right" },
  { name: "Right pulmonary veins", number: 11, position: "upper-right-side" },
  { name: "Right atrium", number: 12, position: "upper-right-chamber" },
  { name: "Right ventricle", number: 13, position: "lower-right" },
  { name: "Inferior vena cava", number: 14, position: "bottom-right" },
  { name: "Apex", number: 15, position: "bottom-tip" },
];

// Individual content for each heart part
const partContent = {
  1: {
    title: "Brachiocephalic trunk",
    content: [
      "The brachiocephalic trunk is the first and largest branch of the aortic arch.",
      "It supplies blood to the right side of the head, neck, and right arm.",
      "It branches into the right common carotid artery and right subclavian artery.",
      "This vessel is crucial for maintaining blood flow to the brain and upper extremities."
    ]
  },
  2: {
    title: "Left common carotid artery",
    content: [
      "The left common carotid artery is the second branch of the aortic arch.",
      "It supplies oxygenated blood to the left side of the head and neck.",
      "It branches into the internal and external carotid arteries.",
      "Essential for brain function and facial blood supply."
    ]
  },
  3: {
    title: "Left subclavian artery",
    content: [
      "The left subclavian artery is the third branch of the aortic arch.",
      "It supplies blood to the left arm, shoulder, and chest wall.",
      "It gives rise to the vertebral artery which supplies the brain.",
      "Critical for upper limb circulation and brain blood flow."
    ]
  },
  4: {
    title: "Aorta arch",
    content: [
      "The aortic arch is the curved portion of the aorta that connects the ascending and descending aorta.",
      "It gives rise to three major branches: brachiocephalic trunk, left common carotid, and left subclavian.",
      "It helps maintain blood pressure and distributes blood to the upper body.",
      "The arch shape allows for efficient blood distribution to multiple regions."
    ]
  },
  5: {
    title: "Left pulmonary artery",
    content: [
      "The left pulmonary artery carries deoxygenated blood from the right ventricle to the left lung.",
      "It branches extensively within the left lung to reach all lung tissue.",
      "It's part of the pulmonary circulation system.",
      "Essential for gas exchange in the left lung."
    ]
  },
  6: {
    title: "Left pulmonary veins",
    content: [
      "The left pulmonary veins carry oxygenated blood from the left lung back to the heart.",
      "They empty into the left atrium.",
      "There are typically two left pulmonary veins: superior and inferior.",
      "They complete the pulmonary circulation circuit."
    ]
  },
  7: {
    title: "Auricle of left atrium",
    content: [
      "The auricle is a small, ear-like appendage of the left atrium.",
      "It increases the atrial volume and helps with blood flow.",
      "It contains pectinate muscles that assist in atrial contraction.",
      "Plays a role in atrial filling and emptying."
    ]
  },
  8: {
    title: "Left ventricle",
    content: [
      "The left ventricle is the largest and strongest chamber of the heart.",
      "It pumps oxygenated blood to the entire body through the aorta.",
      "It has thick muscular walls to generate high pressure.",
      "Essential for systemic circulation and maintaining blood pressure."
    ]
  },
  9: {
    title: "Superior vena cava",
    content: [
      "The superior vena cava collects deoxygenated blood from the upper body.",
      "It returns blood from the head, neck, arms, and chest to the right atrium.",
      "It's formed by the union of the left and right brachiocephalic veins.",
      "Critical for venous return from the upper body."
    ]
  },
  10: {
    title: "Right pulmonary artery",
    content: [
      "The right pulmonary artery carries deoxygenated blood from the right ventricle to the right lung.",
      "It branches extensively within the right lung for gas exchange.",
      "It's shorter and wider than the left pulmonary artery.",
      "Essential for pulmonary circulation to the right lung."
    ]
  },
  11: {
    title: "Right pulmonary veins",
    content: [
      "The right pulmonary veins carry oxygenated blood from the right lung to the left atrium.",
      "They complete the pulmonary circulation from the right lung.",
      "There are typically two right pulmonary veins: superior and inferior.",
      "They deliver oxygenated blood to the left side of the heart."
    ]
  },
  12: {
    title: "Right atrium",
    content: [
      "The right atrium receives deoxygenated blood from the body.",
      "It receives blood from the superior and inferior vena cava.",
      "It contracts to push blood into the right ventricle.",
      "Contains the sinoatrial node, the heart's natural pacemaker."
    ]
  },
  13: {
    title: "Right ventricle",
    content: [
      "The right ventricle pumps deoxygenated blood to the lungs.",
      "It has thinner walls than the left ventricle.",
      "It generates lower pressure for pulmonary circulation.",
      "Essential for pulmonary blood flow and gas exchange."
    ]
  },
  14: {
    title: "Inferior vena cava",
    content: [
      "The inferior vena cava collects deoxygenated blood from the lower body.",
      "It returns blood from the legs, abdomen, and pelvis to the right atrium.",
      "It's the largest vein in the body.",
      "Critical for venous return from the lower body."
    ]
  },
  15: {
    title: "Apex",
    content: [
      "The apex is the pointed bottom tip of the heart.",
      "It's formed primarily by the left ventricle.",
      "It points downward, forward, and to the left.",
      "Used as a reference point for heart auscultation and imaging."
    ]
  }
};

const Heart = () => {
  const section2Ref = useRef(null);
  const isInView = useInView(section2Ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [selectedPart, setSelectedPart] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const handlePartClick = (part) => {
    setSelectedPart(part);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPart(null);
  };

  const textVariant = {
    hidden: {
      opacity: 0,
      x: 60,
      rotate: -10,
      filter: "blur(6px)",
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const rightTextVariant = {
    hidden: {
      opacity: 0,
      x: -60,
      rotate: 10,
      filter: "blur(6px)",
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="heart-wrapper">
      {/* Section 1: Video + Title */}
      <section className="section section-1">
        <video autoPlay loop muted className="background-video">
          <source src="/videos/heart-bg.mp4" type="video/mp4" />
        </video>

        <motion.div className="animated-title">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                x: Math.random() > 0.5 ? -100 : 100,
                rotate: Math.random() * 60 - 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: i * 0.05,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Section 2: Anatomy */}
      <section className="section section-2" ref={section2Ref}>
        <div className="section-title">
          <h2>Click on the part name or number to get more information about it</h2>
        </div>
        
        <div className="heart-anatomy-container">
          {/* Left Side */}
          <div className="part-names left">
            {leftParts.map((part, i) => (
              <motion.div
                className={`part-item left ${part.position}`}
                key={part.name}
                custom={i}
                initial="hidden"
                animate={controls}
                variants={textVariant}
                onClick={() => handlePartClick(part)}
              >
                <span 
                  className={`part-number part-number-${part.number}`}
                  onClick={() => handlePartClick(part)}
                >
                  {part.number}
                </span>
                <p 
                  className="part-name"
                  onClick={() => handlePartClick(part)}
                >
                  {part.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Heart Image */}
          <div className="heart-image">
            <img src={heartImage} alt="Heart" />
            <div className="heart-markers">
              {Array.from({ length: 15 }, (_, i) => {
                const partNumber = i + 1;
                const part = [...leftParts, ...rightParts].find(p => p.number === partNumber);
                
                return (
                  <div
                    key={i}
                    className={`marker marker-${partNumber}`}
                    data-number={partNumber}
                    onClick={() => part && handlePartClick(part)}
                  >
                    {partNumber}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="part-names right">
            {rightParts.map((part, i) => (
              <motion.div
                className={`part-item right ${part.position}`}
                key={part.name}
                custom={i}
                initial="hidden"
                animate={controls}
                variants={rightTextVariant}
                onClick={() => handlePartClick(part)}
              >
                <p 
                  className="part-name"
                  onClick={() => handlePartClick(part)}
                >
                  {part.name}
                </p>
                <span 
                  className={`part-number part-number-${part.number}`}
                  onClick={() => handlePartClick(part)}
                >
                  {part.number}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popup Modal */}
        {showPopup && selectedPart && (
          <div className="popup-overlay" onClick={closePopup}>
            <motion.div 
              className="popup-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header">
                <h3>{partContent[selectedPart.number]?.title || selectedPart.name}</h3>
                <button className="close-btn" onClick={closePopup}>×</button>
              </div>
              <div className="popup-body">
                {partContent[selectedPart.number]?.content ? (
                  partContent[selectedPart.number].content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>Information about {selectedPart.name} will be added here.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Heart;
