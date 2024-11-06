import { Button } from "@mui/material";

const NewJobExtraActions = ({ stage, cancelBooking, editBooking }) => {
  if (stage.toLowerCase() === "requested") {
    return (
      <>
        <Button onClick={editBooking}>
          Edit Booking <i className="fa fa-pen ms-2"></i>
        </Button>
        <Button onClick={cancelBooking}>
          Cancel Fix <i className="fa fa-trash ms-2"></i>
        </Button>
      </>
    );
  }
};

export default NewJobExtraActions;
