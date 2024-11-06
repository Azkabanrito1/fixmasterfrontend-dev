import { Button } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

const FixModalHeading = ({
  jobRef,
  createDate,
  colors,
  openDetails,
  diagnosisAction,
  messageCse,
  notifications,
  fixStage,
}) => {
  return (
    <StyledHeading colors={colors}>
      <div className="id">
        <h3>Job Ref: {jobRef}</h3>
        <span>{moment(createDate).format("DD/MM/YYYY")}</span>
      </div>
      <div className="actions">
        <Button onClick={openDetails}>
          <i className="fa fa-bars"></i>
          <span>Details</span>
        </Button>
        <Button
          disabled={fixStage === "new" ? true : false}
          onClick={diagnosisAction}
        >
          <i className="fa fa-book"></i>
          <span>Diagnosis</span>
        </Button>
        <Button onClick={messageCse}>
          <i className="fa fa-message"></i>
          <span>Message CSE</span>
        </Button>
        <Button
          disabled={fixStage === "new" ? true : false}
          onClick={notifications}
        >
          <i className="fa fa-bell"></i>
          <span>Notifications</span>
        </Button>
      </div>
    </StyledHeading>
  );
};

export default FixModalHeading;

const StyledHeading = styled.div`
  display: flex;

  & > div {
    position: relative;
    isolation: isolate;
  }

  .id {
    width: 30%;
    min-width: 180px;
    padding: 1rem 1rem 1rem 0;
    color: #fff;
    background-color: ${({ colors }) => colors.primary};

    &::before {
      content: "";
      position: absolute;
      inset: 0 0 0 -28px;
      height: 100%;
      background-color: ${({ colors }) => colors.primary};
      z-index: -1;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.3em;
    width: 100%;
    padding: 1rem 0 1rem 1rem;
    background-color: ${({ colors }) => colors.secondary};

    &::before {
      content: "";
      position: absolute;
      inset: 0 -28px 0 0;
      height: 100%;
      background-color: ${({ colors }) => colors.secondary};
      z-index: -1;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      gap: 8px;
      color: #000;
      font-size: 0.8rem;
      word-break: break-word;

      i.fa {
        font-size: 1.2rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    .id {
      width: 100%;

      &::before {
        inset: 0 -34px;
      }
    }

    .actions {
      width: 100%;
      padding: 0;

      &::before {
        inset: 0 -34px;
      }

      button {
        font-size: 0.8rem;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .actions button {
      font-size: 0.6rem;
    }
  }
`;
