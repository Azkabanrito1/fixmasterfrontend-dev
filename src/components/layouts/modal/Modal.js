import React from "react";
import ReactModal from "react-modal";

const Modal = ({ open, close, children }) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={close}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(71, 71, 71, 0.5)",
          zIndex: 999,
        },
        content: {
          margin: "auto",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          outline: "none",
          padding: "2px",
          width: "fit-content",
          height: "fit-content",
          maxHeight: "90%",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
