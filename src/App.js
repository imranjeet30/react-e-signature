// App.js
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import ModalComponent from "./components/ModalComponent";

// Main App component
const App = () => {
  // State to manage the modal's open/closed state
  const [modalIsOpen, setModalIsOpen] = useState(true);

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Render the App component
  return (
    <div style={{backgroundColor: '#7B562C', width:"100%", height: '100vh', background: 'linear-gradient(to right, #ff6f61, #a2d5c6)'}}>
      {/* ModalComponent is rendered with isOpen and closeModal props */}
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

// Export the App component as the default export
export default App;
