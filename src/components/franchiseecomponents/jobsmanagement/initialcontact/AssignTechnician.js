import styled from "styled-components";
import AddBtn from "../AddBtn";
import {
  Grid,
  SectionHeading,
} from "../../../../pages/franchisee/jobs/MyJobDetails";
import { Star } from "../../../globalcomponents/RatingStars";

const Technician = ({ tech }) => {
  return (
    <TechPerson>
      <div className="d-flex align-items-center">
        <div className="image">
          <img src={tech?.profilePic || "/images/avatar.png"} alt="" />
        </div>
        <div>
          <h3>{tech?.name}</h3>
          <Star percent={tech?.rating * 20} />
          <div className="d-flex align-items-center">
            <div className="spec">{tech?.specialization}</div>
            <div>
              <i className="fa fa-left-right"></i> {tech?.distance}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <button>
          <i className="fa fa-phone"></i>
        </button>
        <button>
          <i className="fas fa-message"></i>
        </button>
      </div>
    </TechPerson>
  );
};

const AssignTechnicians = ({ assignedTechnicians, openAssignTechModal }) => {
  const techniciansTemplate = assignedTechnicians?.map((tech) => {
    return <Technician key={tech.id} tech={tech} />;
  });

  return (
    <section className="mb-5">
      <SectionHeading>Assign Technician</SectionHeading>
      {assignedTechnicians?.length > 0 && (
        <Grid columns="3">{techniciansTemplate}</Grid>
      )}

      <AddBtn
        action={openAssignTechModal}
        id={"assign-technician"}
        text={
          assignedTechnicians?.length > 0
            ? "Edit/Add More Technicians"
            : "Assign Technician"
        }
      />
    </section>
  );
};

export default AssignTechnicians;

const TechPerson = styled.div`
  display: flex;

  & > div {
    gap: 1rem;

    &:first-child {
      border: 1px solid #fcd8c8;
      border-right-color: transparent;
      padding: 1rem;
    }

    &:last-child {
      padding: 0.5rem;
      background-color: #fcd8c8;
      border-radius: 0 1rem 1rem 0;
    }
  }

  h3 {
    font-size: 1rem;
    word-break: break-word;
  }

  button {
    appearance: none;
    padding: 0.2rem;
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;

    &:active,
    &:focus {
      outline: 1px solid var(--clr-primary);
    }

    i {
      font-size: 1.2rem;
      color: var(--clr-primary);
    }
  }

  .image {
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .spec {
    padding: 0.5em;
    margin-top: 0.5em;
    margin-right: 1em;
    border-radius: 10px;
    font-size: 0.8rem;
    background-color: #fcd8c8;
    word-break: break-word;
  }
`;
