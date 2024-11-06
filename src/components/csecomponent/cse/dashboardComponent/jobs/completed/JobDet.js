import styled from "styled-components";
import format from "date-fns/format";

const JobDet = ({ job, title }) => {
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
          <span>{format(new Date(job?.scheduleDate), "dd-MM-yyyy")}</span>
        </Detail>
        <Detail>
          <h3>Time Posted</h3>
          <span>
            {format(
              new Date(
                `${new Date().toISOString().split("T")[0]}T${job?.scheduleTime}`
              ),
              "p"
            )}
          </span>
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
      {/* <Detail>
          <h3>Status</h3>
          <span>{job?.fixStatus}</span>
        </Detail>
        <Detail>
          <h3>Stage</h3>
          <span>{job?.stage}</span>
        </Detail> */}
      {/* {title === "Rejected  Jobs" && (
          <Detail>
            <h3>CSE</h3>
            <span>{job?.cse}</span>
          </Detail>
        )}
      </DetailsRow>

      {title === "Rejected Jobs" && (
        <Detail>
          <h3 style={{ marginBottom: "1.5rem" }}>Rejection Details</h3>
          <p>{job?.rejectionDetails}</p>
        </Detail>
      )}

      {title === "Warranty Claims" && (
        <Detail>
          <h3 style={{ marginBottom: "1.5rem" }}>Stage Completion Timing</h3>
          <p>{job?.warrantyDetails}</p>
        </Detail>
      )}

      {title !== "Rejected Jobs" && title !== "Warranty Claims" && (
        <Detail>
          <h3>Stage Completion Timing</h3>
          <Stages>
            <div>
              <Flex>
                <h4>Diagnostics:</h4>
                <Timed label="Start" time={job?.diagnostics?.start} />
                <span className="divider">—</span>
                <Timed label="End" time={job?.diagnostics?.end} />
              </Flex>
              <Flex>
                <h5>Ratings:</h5>
                {job?.diagnostics?.rating && (
                  <Star percent={job?.diagnostics?.rating * 20} />
                )}
              </Flex>
              <div>
                <h5 style={{ marginBottom: ".4rem" }}>Customer Comments:</h5>
                <p>{job?.diagnostics?.comments}</p>
              </div>
            </div>

            {job?.supplies && (
              <div>
                <Flex>
                  <h4>Supplies:</h4>
                  <Timed label="Start" time={job?.supplies?.start} />
                  <span className="divider">—</span>
                  <Timed label="End" time={job?.supplies?.end} />
                </Flex>
              </div>
            )}

            {job?.fixing && (
              <div>
                <Flex>
                  <h4>Fixing:</h4>
                  <Timed label="Start" time={job?.fixing?.start} />
                  <span className="divider">—</span>
                  <Timed label="End" time={job?.fixing?.end} />
                </Flex>
              </div>
            )}
          </Stages>
        </Detail>
      )}
       */}
    </JobDetailContainer>
  );
};

export default JobDet;

export const JobDetailContainer = styled.div`
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

export const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const Detail = styled.div``;
