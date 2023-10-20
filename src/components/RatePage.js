import React, { useState } from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";

const RatePage = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {isOpen && (
        <div id="custom-modal-root">
          <Modal open={isOpen} onClose={() => setOpen(false)}>
            YO
          </Modal>
        </div>
      )}
    </div>
  );
};

export default RatePage;
