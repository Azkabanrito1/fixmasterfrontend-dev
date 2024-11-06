import format from "date-fns/format";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import { DetailsRow, JobDetailContainer, Detail } from "./completed/JobDet";

const UnassignedJobDetails = ({
  isOpen,
  closeModal,
  title,
  jobs,
  type = false,
}) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      <JobDetailContainer>
        <DetailsRow>
          <Detail>
            <h3>Job Class</h3>
            <span>{jobs?.bookingClass}</span>
          </Detail>
          <Detail>
            <h3>Job Category</h3>
            <span>{jobs?.bookingCategory}</span>
          </Detail>
          <Detail>
            <h3>Job Type</h3>
            <span>{jobs?.bookingType}</span>
          </Detail>
        </DetailsRow>
        <DetailsRow>
          <Detail>
            <h3>Date Posted</h3>
            <span>{format(new Date(jobs?.scheduleDate), "dd-MM-yyyy")}</span>
          </Detail>
          <Detail>
            <h3>Time Posted</h3>
            <span>
              {format(
                new Date(
                  `${new Date().toISOString().split("T")[0]}T${
                    jobs?.scheduleTime
                  }`
                ),
                "p"
              )}
            </span>
          </Detail>
          <Detail>
            <h3>Status</h3>
            <span>{jobs?.fixStatus}</span>
          </Detail>
        </DetailsRow>

        <DetailsRow>
          <Detail>
            <h3>Contact Person</h3>
            <address>{jobs?.contactName}</address>
          </Detail>

          <Detail>
            <h3>Contact Phone Number</h3>
            <span>{jobs?.contactPhone}</span>
          </Detail>
          <Detail>
            <h3>Contact Email</h3>
            <span>{jobs?.contactEmail}</span>
          </Detail>
        </DetailsRow>
        <DetailsRow>
          <Detail>
            <h3>Service Location</h3>
            <address>{jobs?.addressDetails?.address}</address>
          </Detail>

          <Detail>
            <h3>Contact Email</h3>
            <span>{jobs?.addressDetails?.cityName}</span>
          </Detail>
          <Detail>
            <h3>Nearest Landmark</h3>
            <span>{jobs?.addressDetails?.nearestLandMark}</span>
          </Detail>
        </DetailsRow>
      </JobDetailContainer>
      {type && (
        <JobDetailContainer>
          <DetailsRow>
            <Detail>
              <h3>Job Class</h3>
              <span>{jobs?.bookingClass}</span>
            </Detail>
            <Detail>
              <h3>Job Category</h3>
              <span>{jobs?.bookingCategory}</span>
            </Detail>
            <Detail>
              <h3>Job Type</h3>
              <span>{jobs?.bookingType}</span>
            </Detail>
            <Detail>
              <h3>Distance to Me</h3>
              <span>{jobs?.bookingType}</span>
            </Detail>
          </DetailsRow>
        </JobDetailContainer>
      )}
    </GlobalModal>
  );
};

export default UnassignedJobDetails;
