import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaUserGraduate, FaInfoCircle, FaQuestionCircle, FaInstagram, FaPhone } from "react-icons/fa";
import "./navbar.css";

export default function NavBar() {
  const [hovered, setHovered] = useState(null);

  const items = [
    { id: 1, label: "Início", icon: <FaHome />, href: "#" },
    { id: 2, label: "Sobre", icon: <FaInfoCircle />, href: "#sobre" },
    { id: 3, label: "Alunos", icon: <FaUserGraduate />, href: "#alunos" },
    { id: 4, label: "FAQ", icon: <FaQuestionCircle />, href: "#faq" },
    { id: 5, label: "Contato", icon: <FaPhone />, href: "#contato" },
    { id: 6, label: "Instagram", icon: <FaInstagram />, href: "https://instagram.com/tst__cm", external: true },
  ];

  return (
    <div className="nav-container">
      <nav className="floating-nav" onMouseLeave={() => setHovered(null)}>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="nav-item"
            onMouseEnter={() => setHovered(item.id)}
          >
            <span style={{ position: "relative", zIndex: 10 }}>{item.icon}</span>

            {hovered === item.id && (
              <motion.div
                layoutId="nav-item-bg"
                className="nav-hover-bg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            <AnimatePresence>
              {hovered === item.id && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 20 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="nav-tooltip"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        ))}
      </nav>
    </div>
  );
}
