import ReactModal from "react-modal";

const GlobalModal = ({
  isOpen,
  closeModal,
  children,
  width,
  height,
  bRad,
  maxHeight,
  overflowX,
  overflowY,
  ...rest
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById("root") || undefined}
      {...rest}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(71, 71, 71, 0.5)",
          zIndex: 999,
        },
        content: {
          inset: "auto",

          width: `min(${width || "768px"}, calc(100% - 32px))`,
          height: height || "fit-content",
          maxHeight: maxHeight || "90%",
          padding: "32px 28px",
          borderRadius: bRad || "16px",
          outline: "none",

          background: "#fff",
          overflowX: overflowX || "hidden",
          overflowY: overflowY || "auto",
          WebkitOverflowScrolling: "touch",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default GlobalModal;
