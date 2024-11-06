import { Button } from "@mui/material";
import styled from "styled-components";
import { getStatusIndex } from "../../../utils/utilityFxns";

const btnStyles = {
  border: "1px solid var(--clr-primary)",
  color: "var(--clr-primary)",
  fontSize: "1rem",
};

const CompletedJobsFooterAction = ({ buyWarranty, viewInvoice }) => {
  return (
    <>
      <Button sx={{ ...btnStyles, ml: ".4rem" }} onClick={buyWarranty}>
        Buy Extended Warranty
      </Button>
      <Button
        sx={{
          ...btnStyles,
          ml: ".4rem",
        }}
        onClick={viewInvoice}
      >
        View Invoice
      </Button>
    </>
  );
};

const WarrantyJobsFooterAction = ({ buyWarranty, viewInvoice }) => {
  return (
    <>
      <Button sx={{ ...btnStyles, ml: ".4rem" }} onClick={buyWarranty}>
        Buy Extended Warranty
      </Button>
      <Button sx={{ ...btnStyles, ml: ".4rem" }} onClick={viewInvoice}>
        View Invoice
      </Button>
    </>
  );
};

const FixModalFooter = ({
  fixStage,
  rating,
  buyWarranty,
  viewInvoice,
  fix,
}) => {
  return (
    <Footer>
      <div>
        {getStatusIndex(fix.fixStatus) >=
          getStatusIndex("Diagnosis Visit Date Set") && (
          <Button sx={btnStyles} onClick={rating}>
            Feedback and Ratings
          </Button>
        )}
        {getStatusIndex(fix.fixStatus) >= getStatusIndex("completed") && (
          <CompletedJobsFooterAction
            rating={rating}
            buyWarranty={buyWarranty}
            viewInvoice={viewInvoice}
          />
        )}
        {fixStage === "warranty" && (
          <WarrantyJobsFooterAction
            buyWarranty={buyWarranty}
            viewInvoice={viewInvoice}
          />
        )}
      </div>

      {fixStage !== "new" && (
        <a
          href={"tel:" + fix?.cse?.phoneNumber}
          style={{
            color: "var(--clr-primary)",
            backgroundColor: "#FFE2D6",
            borderRadius: "10px",
            padding: "16px",
            marginLeft: "auto",
          }}
        >
          <i className="fa fa-phone-volume fs-1"></i>
        </a>
      )}
    </Footer>
  );
};

export default FixModalFooter;

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;
