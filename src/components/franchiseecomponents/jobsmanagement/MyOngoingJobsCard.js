import MyOngoingJobActions from "./MyOngoingJobsActions";
import { Star } from "../../globalcomponents/RatingStars";
import styled from "styled-components";

const OngoingJobCard = ({ job, openAssignTech, openRequestEqp }) => {
  return (
    <OngoingCard>
      <header className="d-flex justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <img
            className="profile-pic"
            src={job?.customerProfilePic || "/images/profile.png"}
            alt="customer profile picture"
          />
          <div>
            <h3>{job?.customerName}</h3>
            <Star
              percent={job?.customerRatings * 20}
              size="20px"
              fillClr="#fff"
            />
          </div>
        </div>

        <MyOngoingJobActions
          fixId={job.jobId}
          openAssignTech={openAssignTech}
          openRequestEqp={openRequestEqp}
        />
      </header>

      <div className="content">
        <ul>
          <li>
            <i className="fa fa-map-location"></i>
            <span>{job?.jobLocation}</span>
          </li>
          <li>
            <i className="fa fa-wrench"></i>
            <span>{job?.jobDescription}</span>
          </li>
          <li>
            <i className="fa fa-road"></i>
            <span>{job?.jobDistance}</span>
          </li>
          <li>
            <i className="fa fa-clock"></i>
            <span>{job?.timePosted}</span>
          </li>
        </ul>
      </div>

      <button className="call-btn">
        <i className="fa fa-phone"></i>
      </button>
    </OngoingCard>
  );
};

export default OngoingJobCard;

const OngoingCard = styled.div`
  position: relative;
  border-radius: 1rem;
  background-color: #fff;
  overflow: hidden;

  .profile-pic {
    width: 40px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
  }

  header {
    padding: 1rem;
    background-color: #7b61ff;

    & > div {
      gap: 12px;
    }
  }

  h3 {
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
  }

  .content {
    padding: 1.2rem;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;

      i {
        font-size: 1.2rem;
      }
    }
  }

  .call-btn {
    position: absolute;
    bottom: 1.2rem;
    right: 1.2rem;
    padding: 0.8em;
    border: none;
    border-radius: 50%;

    i {
      font-size: 2rem;
    }
  }
`;
