import { Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SectionHeading } from "../../../globalcomponents/Utilities";
import { useGetQuoteDetails } from "../../../../hooks/useQueries/useJobs";

const QuoteHeader = ({ fixId }) => {
  const navigate = useNavigate();

  const { data: quoteDetailsData } = useGetQuoteDetails(fixId);
  const quoteData = quoteDetailsData?.data;

  return (
    <>
      <div style={{ position: "relative" }}>
        <SectionHeading
          className="fw-bold fs-2"
          style={{ color: "var(--clr-primary)" }}
        >
          Quotation
        </SectionHeading>
        <Button
          sx={{
            position: "absolute",
            color: "var(--clr-primary)",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            fontWeight: "bold",
          }}
          onClick={() => navigate("../ongoing-fix")}
        >
          Close
        </Button>
      </div>
      <div>
        <FixDetails>
          <Detail>
            <h3>Booking Number</h3>
            <span>{quoteData?.bookingNumber}</span>
          </Detail>
          <Detail>
            <h3>Booking Type</h3>
            <span>{quoteData?.bookingType}</span>
          </Detail>
          <Detail>
            <h3>Booking Class</h3>
            <span>{quoteData?.bookingClass}</span>
          </Detail>
          <Detail>
            <h3>CSE</h3>
            <span>{quoteData?.assignedCse}</span>
          </Detail>
          <Detail>
            <h3>Fix Date</h3>
            <span>{quoteData?.fixDate}</span>
          </Detail>
        </FixDetails>

        <Detail>
          <h3>Fix Location</h3>
          <p>{quoteData?.fixLocation}</p>
        </Detail>

        <Detail>
          <h3>Fix Description</h3>
          <p>{quoteData?.fixDescription}</p>
        </Detail>
      </div>
    </>
  );
};

export default QuoteHeader;

const FixDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const Detail = styled.div`
  margin-bottom: 1.4rem;

  h3 {
    font-size: 1rem;
    color: var(--clr-primary);
  }
`;
