import { Button } from "@mui/material";

const WarrantyJobsExtraActions = ({ stage, warrantyClaim }) => {
  if (stage === "warranty") {
    return (
      <>
        <Button
          sx={{
            border: "1px solid var(--clr-primary)",
            color: "var(--clr-primary)",
            fontSize: "0.8rem",
          }}
          onClick={warrantyClaim}
        >
          Make A Warranty Claim
        </Button>
        <Button
          sx={{
            border: "1px solid var(--clr-primary)",
            color: "var(--clr-primary)",
            fontSize: ".8rem",
          }}
        >
          Extend Warranty
        </Button>
      </>
    );
  }
};

export default WarrantyJobsExtraActions;
