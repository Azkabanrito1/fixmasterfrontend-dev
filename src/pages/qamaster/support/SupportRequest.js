import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RequestCard = (supports) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const dateTime = date.split(" ");
    const newDate = dateTime[1].replaceAll("/", "-");
    return newDate;
  };
  return (
    <>
      {supports?.supports?.map((support) => {
        return (
          <div
            className="rounded bg-white pt-3 "
            style={{ position: "relative", overflow: "hidden" }}
            key={support?.requestId}
          >
            <SupportContent>
              <ul>
                <li>
                  <i className="fa fa-map-location" aria-hidden="true"></i>
                  <span>{support?.fixAddress}</span>
                </li>
                <li>
                  <i className="fa fa-wrench" aria-hidden="true"></i>
                  <span className="d-block">{support?.fixStatus}</span>
                </li>
                <li>
                  <img src="/images/wristwatch.svg" alt="" />
                  <span className="d-block">
                    {formatDate(support?.requestDate)}
                  </span>
                </li>
                <li>
                  <h2 className="fs-5 " style={{ textTransform: "uppercase" }}>
                    cse
                  </h2>
                  <span className="d-block">{support?.cseName}</span>
                </li>
                <li>
                  <i class="fa fa-id-badge" aria-hidden="true"></i>
                  <span className="d-block">{support?.fixPhase} Phase</span>
                </li>
              </ul>
            </SupportContent>
            <ViewRequest
              onClick={() =>
                navigate(`/qamaster/supports/${support?.requestId}`)
              }
              className="d-flex align-items-center justify-content-between"
            >
              <div className=" p-2 text-white">View Support Request</div>
              <div>
                <i className="fa fa-chevron-right text-white"></i>
              </div>
            </ViewRequest>
          </div>
        );
      })}
    </>
  );
};

export default RequestCard;

const SupportContent = styled.div`
  padding: 1.2rem ul {
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
    img {
      width: 24px;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const ViewRequest = styled.div`
  background-color: #7b61ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 1.2rem;
  cursor: pointer;
  img {
    width: 24px;
  }
`;
