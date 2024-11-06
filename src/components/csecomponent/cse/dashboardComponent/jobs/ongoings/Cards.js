import styled from "styled-components";
import { Star } from "../../../../../globalcomponents/RatingStars";
import CardsAction from "./CardsActions";
import { format } from "date-fns";
import ConfirmVisit from "../modal/ConfirmVisitModal";
import { useState } from "react";
import ConfirmItemSupplies from "../modal/ConfirmItemSupplies";

const Cards = ({ job, openAssignTech, openRequestEqp, tech }) => {
  const [openConfirmJobDate, setOpenConfirmJobDate] = useState(false);
  const [openConfirmSupplies, setOpenConfirmSupplies] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const showOpenConfirmJobDate = (id) => {
    setActiveId(id);
    setOpenConfirmJobDate(true);
  };
  const showOpenConfirmSupplies = (id) => {
    setActiveId(id);
    setOpenConfirmSupplies(true);
  };

  return (
    <>
      <JobContainer>
        <OngoingCards>
          <header className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-start">
              <img
                className="profile-pic"
                src={job?.customerProfilePic || "/images/profile.png"}
                alt="customer profile"
              />
              <div>
                <h3>{job?.contactName}</h3>
                <Star
                  percent={job?.technicianRating * 20}
                  size="20px"
                  fillClr="#fff"
                />
              </div>
            </div>
            <CardsAction
              fixId={job?.fixId}
              openAssignTech={openAssignTech}
              openRequestEqp={openRequestEqp}
              confirmJobDate={showOpenConfirmJobDate}
              status={job?.fixStatus}
              confirmSupplies={showOpenConfirmSupplies}
              tech={tech}
            />
          </header>
          <div className="content">
            <ul>
              <li>
                <i className="fa fa-road"></i>
                <span>{job?.addressDetails?.address}</span>
              </li>
              <li>
                <i className="fa fa-wrench"></i>
                <span>{job?.bookingCategory}</span>
              </li>
              {/* <li>
                <i className="fa fa-road"></i>
                <span>{job?.jobDistance}</span>
              </li> */}
              <li>
                <i className="fa fa-id-card"></i>
                <span>{job?.fixId}</span>
              </li>
              <li>
                <i className="fa fa-clock"></i>
                <span>
                  {format(
                    new Date(
                      `${job?.scheduleDate.slice(0, 10)}T${job?.scheduleTime}`
                    ),
                    "dd MM hh:mm a"
                  )}
                </span>
              </li>
            </ul>
          </div>
          <button className="call-btn">
            <a href={`tel:${job?.contactPhone}`}>
              <i className="fa fa-phone" color="var(--clr-primary)"></i>
              {/* <FaWhatsapp /> */}
            </a>
          </button>
        </OngoingCards>
      </JobContainer>

      {openConfirmJobDate && (
        <ConfirmVisit
          fixId={activeId}
          isOpen={openConfirmJobDate}
          closeModal={() => setOpenConfirmJobDate(false)}
        />
      )}
      {openConfirmSupplies && (
        <ConfirmItemSupplies
          isOpen={openConfirmSupplies}
          closeModal={() => setOpenConfirmSupplies(false)}
          fixId={activeId}
        />
      )}
    </>
  );
};

export default Cards;

const JobContainer = styled.div`
  border-radius: 5px;
`;

const OngoingCards = styled.div`
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
