import { Box } from "@mui/material";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";

const ShowPin = ({ isOpen, closeModal, response }) => {
  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      width={"320px"}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader closeModal={closeModal} />

      <Box p={1} borderRadius={1} sx={{ bgcolor: "var(--clr-primary)" }}>
        <p className="fs-3 fw-bold text-white">{response.data}</p>
        <p className="text-white">{response.message}</p>
      </Box>
    </GlobalModal>
  );
};

export default ShowPin;
