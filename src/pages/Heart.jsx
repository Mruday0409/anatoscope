// src/pages/Heart.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "../styles/Heart.css";
import heartImage from "../assets/images/Heart-1.png"; 
import heartImage3 from "../assets/images/Heart-3.png";

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

const partContent = {
  1: { title: "Brachiocephalic trunk", content: ["The brachiocephalic trunk is the first and largest branch of the aortic arch.", "It supplies blood to the right side of the head, neck, and right arm.", "It branches into the right common carotid artery and right subclavian artery.", "This vessel is crucial for maintaining blood flow to the brain and upper extremities."] },
  2: { title: "Left common carotid artery", content: ["The left common carotid artery is the second branch of the aortic arch.", "It supplies oxygenated blood to the left side of the head and neck.", "It branches into the internal and external carotid arteries.", "Essential for brain function and facial blood supply."] },
  3: { title: "Left subclavian artery", content: ["The left subclavian artery is the third branch of the aortic arch.", "It supplies blood to the left arm, shoulder, and chest wall.", "It gives rise to the vertebral artery which supplies the brain.", "Critical for upper limb circulation and brain blood flow."] },
  4: { title: "Aorta arch", content: ["The aortic arch is the curved portion of the aorta that connects the ascending and descending aorta.", "It gives rise to three major branches: brachiocephalic trunk, left common carotid, and left subclavian.", "It helps maintain blood pressure and distributes blood to the upper body.", "The arch shape allows for efficient blood distribution to multiple regions."] },
  5: { title: "Left pulmonary artery", content: ["The left pulmonary artery carries deoxygenated blood from the right ventricle to the left lung.", "It branches extensively within the left lung to reach all lung tissue.", "It's part of the pulmonary circulation system.", "Essential for gas exchange in the left lung."] },
  6: { title: "Left pulmonary veins", content: ["The left pulmonary veins carry oxygenated blood from the left lung back to the heart.", "They empty into the left atrium.", "There are typically two left pulmonary veins: superior and inferior.", "They complete the pulmonary circulation circuit."] },
  7: { title: "Auricle of left atrium", content: ["The auricle is a small, ear-like appendage of the left atrium.", "It increases the atrial volume and helps with blood flow.", "It contains pectinate muscles that assist in atrial contraction.", "Plays a role in atrial filling and emptying."] },
  8: { title: "Left ventricle", content: ["The left ventricle is the largest and strongest chamber of the heart.", "It pumps oxygenated blood to the entire body through the aorta.", "It has thick muscular walls to generate high pressure.", "Essential for systemic circulation and maintaining blood pressure."] },
  9: { title: "Superior vena cava", content: ["The superior vena cava collects deoxygenated blood from the upper body.", "It returns blood from the head, neck, arms, and chest to the right atrium.", "It's formed by the union of the left and right brachiocephalic veins.", "Critical for venous return from the upper body."] },
  10: { title: "Right pulmonary artery", content: ["The right pulmonary artery carries deoxygenated blood from the right ventricle to the right lung.", "It branches extensively within the right lung for gas exchange.", "It's shorter and wider than the left pulmonary artery.", "Essential for pulmonary circulation to the right lung."] },
  11: { title: "Right pulmonary veins", content: ["The right pulmonary veins carry oxygenated blood from the right lung to the left atrium.", "They complete the pulmonary circulation from the right lung.", "There are typically two right pulmonary veins: superior and inferior.", "They deliver oxygenated blood to the left side of the heart."] },
  12: { title: "Right atrium", content: ["The right atrium receives deoxygenated blood from the body.", "It receives blood from the superior and inferior vena cava.", "It contracts to push blood into the right ventricle.", "Contains the sinoatrial node, the heart's natural pacemaker."] },
  13: { title: "Right ventricle", content: ["The right ventricle pumps deoxygenated blood to the lungs.", "It has thinner walls than the left ventricle.", "It generates lower pressure for pulmonary circulation.", "Essential for pulmonary blood flow and gas exchange."] },
  14: { title: "Inferior vena cava", content: ["The inferior vena cava collects deoxygenated blood from the lower body.", "It returns blood from the legs, abdomen, and pelvis to the right atrium.", "It's the largest vein in the body.", "Critical for venous return from the lower body."] },
  15: { title: "Apex", content: ["The apex is the pointed bottom tip of the heart.", "It's formed primarily by the left ventricle.", "It points downward, forward, and to the left.", "Used as a reference point for heart auscultation and imaging."] },
};

const chambersData = [
  { id: 1, name: "Right Atrium", shortDesc: "The right atrium is a chamber of the heart that receives deoxygenated blood from the body and pumps it into the right ventricle. It plays a crucial role in the circulatory system by collecting blood that has circulated through the body and directing it to the lungs for oxygenation.Receives deoxygenated blood from the body.", fullDesc: `<p><strong>Location:</strong><br/>
The right atrium is situated superior to the right ventricle and anteromedial to the left atrium.</p>
<p><strong>Function:</strong><br/>
It acts as a reservoir for deoxygenated blood returning from the body.</p>
<p><strong>Blood Input:</strong><br/>
The right atrium receives blood from two major veins: the superior vena cava and the inferior vena cava. It also receives blood from the coronary sinus, which drains blood from the heart muscle itself.</p>
<p><strong>Blood Output:</strong><br/>
The right atrium pumps the deoxygenated blood through the tricuspid valve into the right ventricle.</p>
<p><strong>Internal Features:</strong><br/>
The right atrium has a smooth-walled posterior part called the sinus venarum and a rough-walled anterior part called the atrium proper, separated by the crista terminalis. It also contains the right atrial appendage (auricle), a muscular pouch that increases the chamber's capacity.</p>` },
  { id: 2, name: "Right Ventricle", shortDesc: "The right ventricle is one of the four chambers of the heart, specifically responsible for pumping oxygen-poor blood to the lungs. It's located in the anterosuperior part of the heart, between the 3rd and 6th costal cartilages.", fullDesc: `<p><strong>Location:</strong><br/>
The right ventricle is situated on the anterior (front) side of the heart, behind the sternum. It's positioned between the right atrium and the pulmonary artery. In cross-section, the RV is crescent-shaped and triangular in side-profile. It has a thinner wall compared to the left ventricle, about 3 to 6 times thinner.</p>
<p><strong>Function:</strong><br/>
The primary function of the right ventricle is to receive deoxygenated blood from the right atrium and pump it into the pulmonary artery for oxygenation in the lungs. The RV is designed to work at a lower pressure than the left ventricle because it pumps blood into the pulmonary circulation, which has a lower resistance. While relatively less crucial in acquired heart disease, the right ventricle's role becomes significant in congenital heart conditions, potentially acting as a subpulmonary or subaortic ventricle in transposition complexes.</p>
<p><strong>Internal Features:</strong><br/>
<strong>Tricuspid Valve:</strong> A valve separating the right atrium and ventricle, preventing backflow of blood.<br/>
<strong>Trabeculae carneae:</strong> Muscular ridges lining the inner surface of the ventricle, creating a rough texture.<br/>
<strong>Conus arteriosus:</strong> A smooth-walled outflow tract leading to the pulmonary artery.<br/>
<strong>Moderator band:</strong> A muscular band (septomarginal trabeculation) that crosses the RV cavity, distributing electrical signals to the papillary muscles.<br/>
<strong>Papillary muscles:</strong> Protrusions from the ventricular wall that attach to the tricuspid valve via chordae tendineae (tendinous cords), helping to prevent valve prolapse during contraction.</p>` },
  { id: 3, name: "Left Atrium", shortDesc: "The left atrium is one of the four chambers of the heart. It receives oxygenated blood from the pulmonary veins and pumps it into the left ventricle. Located at the base of the heart, it is the most posterior of the four chambers.", fullDesc: `<p><strong>Location:</strong><br/>
The left atrium is positioned at the posterior (back) of the heart, behind the right atrium. It's located at the base of the heart, making it the most posterior of the four chambers. The left atrium receives blood from the pulmonary veins and is connected to the left ventricle via the mitral valve.</p>
<p><strong>Function:</strong><br/>
The left atrium acts as a reservoir, receiving oxygenated blood from the lungs and then contracting to pump the blood into the left ventricle.</p>
<p><strong>Anatomy:</strong><br/>
It's characterized by a smooth-walled structure with the left atrial appendage, a small pouch that can be a site of blood clot formation. The left atrium receives blood from the pulmonary veins (which carry oxygenated blood from the lungs).</p>
<p><strong>Relationship with other chambers:</strong><br/>
The left atrium is connected to the left ventricle via the mitral valve. It is also connected to the pulmonary veins.</p>
<p><strong>Clinical significance:</strong><br/>
Enlargement of the left atrium (left atrial enlargement, or LAE) can be a sign of underlying heart problems, such as left ventricular dysfunction, valvular heart disease, or hypertension, according to studies on PubMed Central and Healthline. LAE can also be an independent predictor of adverse cardiovascular outcomes, including stroke and heart failure.</p>` },
  { id: 4, name: "Left Ventricle", shortDesc: "The left ventricle is a key chamber of the heart, responsible for pumping oxygen-rich blood to the rest of the body. It's the heart's main pumping chamber, receiving blood from the left atrium and ejecting it into the aorta. The left ventricle's muscular walls are significantly thicker than those of the right ventricle, reflecting its greater workload in systemic circulation.", fullDesc: `<p><strong>Location and Structure:</strong><br/>
The left ventricle is situated on the posterior side of the heart, behind the right ventricle. It's roughly conical in shape and is the most muscular chamber of the heart.</p>
<p><strong>Function:</strong><br/>
It receives oxygenated blood from the left atrium via the mitral valve (also known as the bicuspid valve). The left ventricle then contracts, forcing the blood through the aortic valve into the aorta, which distributes it to the entire body.</p>
<p><strong>Importance:</strong><br/>
Because it pumps blood to the entire body, the left ventricle plays a critical role in supplying oxygen and nutrients to organs and tissues.</p>
<p><strong>Clinical Significance:</strong><br/>
Left ventricular function is a key indicator of overall heart health. Conditions like left ventricular hypertrophy (thickening of the walls) or failure (inability to pump effectively) can significantly impact health and require medical attention.</p>
<p><strong>Ejection Fraction:</strong><br/>
A key measure of left ventricular function is the ejection fraction, which represents the percentage of blood pumped out of the ventricle with each beat.</p>` },
];

const Heart = () => {
  const section2Ref = useRef(null);
  const isInView = useInView(section2Ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  const [selectedPart, setSelectedPart] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // 🔹 Added for Section 3 - Slideshow functionality
  const [selectedChamber, setSelectedChamber] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowRef = useRef(null);

  // Manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(chambersData.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(chambersData.length / 2)) % Math.ceil(chambersData.length / 2));
  };

  // Get current chambers to display (2 at a time)
  const getCurrentChambers = () => {
    const startIndex = currentSlide * 2;
    return chambersData.slice(startIndex, startIndex + 2);
  };

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
    hidden: { opacity: 0, x: 60, rotate: -10, filter: "blur(6px)" },
    visible: (i) => ({ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)", transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" } }),
  };

  const rightTextVariant = {
    hidden: { opacity: 0, x: -60, rotate: 10, filter: "blur(6px)" },
    visible: (i) => ({ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)", transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" } }),
  };

  return (
    <div className="heart-wrapper">
      {/* Section 1 */}
      <section className="section section-1">
        <video autoPlay loop muted className="background-video">
          <source src="/videos/heart-bg.mp4" type="video/mp4" />
        </video>
        <motion.div className="animated-title">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", x: Math.random() > 0.5 ? -100 : 100, rotate: Math.random() * 60 - 30 }}
              animate={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className="section section-2" ref={section2Ref}>
        <div className="section-title">
          <h2>Click on the part name or number to get more information about it</h2>
        </div>
        <div className="heart-anatomy-container">
          {/* Left */}
          <div className="part-names left">
            {leftParts.map((part, i) => (
              <motion.div key={part.name} className={`part-item left ${part.position}`} custom={i} initial="hidden" animate={controls} variants={textVariant} onClick={() => handlePartClick(part)}>
                <span className={`part-number part-number-${part.number}`}>{part.number}</span>
                <p className="part-name">{part.name}</p>
              </motion.div>
            ))}
          </div>
          {/* Image */}
          <div className="heart-image">
            <img src={heartImage} alt="Heart" />
            <div className="heart-markers">
              {Array.from({ length: 15 }, (_, i) => {
                const partNumber = i + 1;
                const part = [...leftParts, ...rightParts].find(p => p.number === partNumber);
                return (
                  <div key={i} className={`marker marker-${partNumber}`} data-number={partNumber} onClick={() => part && handlePartClick(part)}>
                    {partNumber}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right */}
          <div className="part-names right">
            {rightParts.map((part, i) => (
              <motion.div key={part.name} className={`part-item right ${part.position}`} custom={i} initial="hidden" animate={controls} variants={rightTextVariant} onClick={() => handlePartClick(part)}>
                <p className="part-name">{part.name}</p>
                <span className={`part-number part-number-${part.number}`}>{part.number}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part Popup - Section 2 */}
        {showPopup && selectedPart && (
          <div className="popup-overlay section2-popup" onClick={closePopup}>
            <motion.div 
              className="popup-content section2-popup-content" 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
              animate={{ opacity: 1, scale: 1, rotate: 0 }} 
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header section2-header">
                <div className="popup-title-section">
                  <span className="part-number-badge">{selectedPart.number}</span>
                  <h3>{partContent[selectedPart.number]?.title || selectedPart.name}</h3>
                </div>
                <button className="close-btn section2-close" onClick={closePopup}>×</button>
              </div>
              <div className="popup-body section2-body">
                {partContent[selectedPart.number]?.content
                  ? partContent[selectedPart.number].content.map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))
                  : <p>Information about {selectedPart.name} will be added here.</p>}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Section 3 - Updated with Slideshow */}
      <section className="section section-3">
        <div className="section-3-container">
          <div className="section-3-left">
            <h2 className="section-3-title">Chambers of the Heart</h2>
            
            {/* Slideshow Container */}
            <div className="chambers-slideshow" ref={slideshowRef}>
              <div className="slideshow-container">
                {getCurrentChambers().map((chamber) => (
                  <motion.div 
                    key={chamber.id} 
                    className="chamber-card"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setSelectedChamber(chamber)}
                  >
                    <h3>{chamber.name}</h3>
                    <p>{chamber.shortDesc}</p>
                    <span className="read-more">Read More →</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Navigation Controls */}
              <div className="slideshow-controls">
                <button className="nav-btn prev-btn" onClick={prevSlide}>
                  ‹
                </button>
                <div className="slide-indicators">
                  {Array.from({ length: Math.ceil(chambersData.length / 2) }, (_, i) => (
                    <button
                      key={i}
                      className={`indicator ${i === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(i)}
                    />
                  ))}
                </div>
                <button className="nav-btn next-btn" onClick={nextSlide}>
                  ›
                </button>
              </div>
            </div>
          </div>
          <div className="section-3-right">
            <img src={heartImage3} alt="Heart" className="section-3-heart-img" />
          </div>
        </div>

        {/* Chamber Popup - Section 3 */}
        {selectedChamber && (
          <div className="popup-overlay section3-popup" onClick={() => setSelectedChamber(null)}>
            <motion.div 
              className="popup-content section3-popup-content" 
              initial={{ opacity: 0, y: 50, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header section3-header">
                <div className="chamber-info">
                  <div className="chamber-icon">🫀</div>
                  <div className="chamber-title">
                    <h3>{selectedChamber.name}</h3>
                    <span className="chamber-subtitle">Heart Chamber</span>
                  </div>
                </div>
                <button className="close-btn section3-close" onClick={() => setSelectedChamber(null)}>×</button>
              </div>
              <div className="popup-body section3-body">
                <motion.div 
                  className="chamber-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  dangerouslySetInnerHTML={{ __html: selectedChamber.fullDesc }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Heart;
