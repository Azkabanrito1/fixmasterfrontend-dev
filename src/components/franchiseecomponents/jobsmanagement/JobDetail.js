import styled from "styled-components";
import moment from "moment";

const JobDetail = ({ job, title }) => {
  return (
    <JobDetailContainer>
      <DetailsRow>
        <Detail>
          <h3>Job Class</h3>
          <span>{job?.bookingClass}</span>
        </Detail>
        <Detail>
          <h3>Job Category</h3>
          <span>{job?.bookingCategory}</span>
        </Detail>
        <Detail>
          <h3>Job Type</h3>
          <span>{job?.bookingType}</span>
        </Detail>
      </DetailsRow>
      <DetailsRow>
        <Detail>
          <h3>Date Posted</h3>
          <span>{moment(job?.scheduleDate).format("DD-MM-YYYY")}</span>
        </Detail>
        <Detail>
          <h3>Time Posted</h3>
          <span>{moment(job?.scheduleTime, "HH:mm:ss").format("hh:mm A")}</span>
        </Detail>
        <Detail>
          <h3>Status</h3>
          <span>{job?.fixStatus}</span>
        </Detail>
      </DetailsRow>

      <DetailsRow>
        <Detail>
          <h3>Contact Person</h3>
          <address>{job?.contactName}</address>
        </Detail>

        <Detail>
          <h3>Contact Phone Number</h3>
          <span>{job?.contactPhone}</span>
        </Detail>
        <Detail>
          <h3>Contact Email</h3>
          <span>{job?.contactEmail}</span>
        </Detail>
      </DetailsRow>
      <DetailsRow>
        <Detail>
          <h3>Service Location</h3>
          <address>{job?.addressDetails?.address}</address>
        </Detail>

        <Detail>
          <h3>Contact Email</h3>
          <span>{job?.addressDetails?.cityName}</span>
        </Detail>
        <Detail>
          <h3>Nearest Landmark</h3>
          <span>{job?.addressDetails?.nearestLandMark}</span>
        </Detail>
      </DetailsRow>
    </JobDetailContainer>
  );
};

export default JobDetail;

const JobDetailContainer = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  padding: 1.5rem;
  background-color: #f8e9e2;
  border-radius: 10px;

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: var(--clr-primary);
  }

  h5 {
    font-size: 0.8rem;
    color: #a1a1a1;
  }

  & > div {
    margin-bottom: 1.5rem;
  }

  address {
    font-style: normal;
  }
`;

const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Detail = styled.div``;
