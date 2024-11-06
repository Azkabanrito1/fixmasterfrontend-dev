import styled from "styled-components";
import JobModalDetails from "./JobModalDetails";
import NewJobExtraActions from "./NewJobExtraActions";
import OngoingJobsExtraActions from "./OngoingJobExtraActions";
import WarrantyJobsExtraActions from "./WarrantyJobsExtraActions";
import { useNavigate } from "react-router-dom";
import FixModalFooter from "./FixModalFooter";

const FixModalBody = ({
  fix,
  fixStage,
  cancelBooking,
  editBooking,
  rejectJob,
  acceptJob,
  warrantyClaim,
  buyWarranty,
  viewInvoice,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Content>
        {/* Extra Actions are actions at the top right of fix modals */}
        <div className="extra-actions">
          {/* new jobs */}
          <NewJobExtraActions
            stage={fixStage}
            cancelBooking={cancelBooking}
            editBooking={editBooking}
          />

          {/* ongoing jobs */}
          <OngoingJobsExtraActions
            fix={fix}
            stage={fixStage}
            openAcceptJobModal={acceptJob}
            openRejectJobModal={rejectJob}
          />

          {/* condition of warranty stage actions: make warranty claim and extend warranty  */}
          <WarrantyJobsExtraActions
            stage={fixStage}
            warrantyClaim={warrantyClaim}
          />
        </div>
        {/* End of extra actions */}

        <JobModalDetails status={fixStage} fix={fix} />
      </Content>

      {/* bottom section containing extra actions and call button */}
      <FixModalFooter
        fixStage={fixStage}
        rating={() => navigate("/customer/jobs/ratings")}
        buyWarranty={buyWarranty}
        viewInvoice={viewInvoice}
        fix={fix}
      />
    </div>
  );
};

export default FixModalBody;

const Content = styled.div`
  position: relative;
  padding-block: 1.2rem;

  table {
    border-collapse: collapse;
    width: 100%;

    td {
      position: relative;
      padding-block: 0.8rem;
      padding-inline-end: 1rem;
      padding-inline-start: 1rem;
    }

    td.heading {
      font-size: 1.2rem;
      font-weight: bold;
      border-right: 1px solid #eee;
      padding-inline-start: 0;
    }

    td.categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      span {
        width: max-content;
      }
    }

    .col1 {
      width: 18%;
    }

    .col2 {
      width: 82%;
    }
  }

  button {
    padding: 0.4rem 0.8rem;
    text-transform: none;
    color: #000;
    font-weight: bold;
  }

  .extra-actions {
    position: absolute;
    top: 1rem;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    width: max-content;
    padding-top: 0.4rem;
    z-index: 1;
  }

  @media only screen and (max-width: 768px) {
    table {
      td {
        display: block;
      }

      .col1 {
        width: 100%;
      }

      .col2 {
        width: 100%;
      }
    }

    .extra-actions {
      position: relative;
      flex-direction: row;
      justify-content: center;
      gap: 2.5rem;
      top: 0;
      width: 100%;

      button {
        font-size: 1rem;
      }
    }
  }
`;
