import React from "react";
import "./FloatingButtons.css"; // Import CSS
import { FaWhatsapp, FaRobot } from "react-icons/fa"; // Import icons

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp Icon - Left Corner */}
      <a href="https://wa.me/9145730054" target="_blank" rel="noopener noreferrer" className="floating-btn whatsapp">
        <FaWhatsapp size={30} />
      </a>

      {/* Chatbot Icon - Right Corner */}
      <button className="floating-btn chatbot">
        <FaRobot size={30} />
      </button>
    </>
  );
};

export default FloatingButtons;
