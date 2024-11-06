import Collapsible from "react-collapsible";
import { StyledForm } from "../../modals/BookaFix";
import styled from "styled-components";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import moment from "moment";
import { Fields, FormGroup, Grid } from "../../../globalcomponents/Utilities";
import GlobalInput from "../../../globalcomponents/GlobalInput";

// from bookafix
import { StyledCollapsible } from "../../BookaFix/BookingInfo";
import { useGetJobDetails } from "../../../../hooks/useQueries/useJobs";
import GlobalRadio from "../../../globalcomponents/GlobalRadio";
import { useGetPreferenceMaster } from "../../../../hooks/useQueries/useAdmin";

const FixDetails = ({ isOpen, closeModal, fixId }) => {
  const { data: jobData } = useGetJobDetails(fixId);
  const { data: contactPrefData } = useGetPreferenceMaster();
  console.log(jobData?.data);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Fix Details"} closeModal={closeModal} />

      <StyledForm>
        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Booking Information</h3>
                <p className="sub-heading">What you want us to do for you</p>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <Detail columns="3">
            <div>
              <h3>Booking Number</h3>
              <span>{fixId}</span>
            </div>
            <div>
              <h3>Booking Type</h3>
              <span>{jobData?.data?.bookingType}</span>
            </div>
            <div>
              <h3>Booking Class</h3>
              <span>{jobData?.data?.bookingClass}</span>
            </div>
            <div>
              <h3>Fix Date</h3>
              <span>
                {moment(jobData?.data?.scheduleDate).format("DD-MM-YYYY")}
              </span>
            </div>
            <div>
              <h3>Fix Time</h3>
              <span>{jobData?.data?.scheduleTime}</span>
            </div>
          </Detail>
        </Collapsible>

        {Object.values(jobData?.data?.productsInformation || {}).some(
          (info) => Boolean(info) === true
        ) && (
          <Collapsible
            trigger={
              <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="heading">Product Details</h3>
                  <p className="sub-heading">Products that require attention</p>
                </div>
                <i className="fas fa-chevron-right collapsible-icon"></i>
              </StyledCollapsible>
            }
          >
            {jobData?.data?.productsInformation?.map((product, index) => (
              <div key={index}>
                <h3 className="fw-bold text-dark fs-6">Product {index + 1}</h3>
                <Detail columns="3">
                  <div>
                    <h3>Manufacturer Name</h3>
                    <span>{product.manufacturerName}</span>
                  </div>
                  {product.modelNumber && (
                    <div>
                      <h3>Model Number</h3>
                      <span>{product.modelNumber}</span>
                    </div>
                  )}
                  {product.modelYear && (
                    <div>
                      <h3>Model Year</h3>
                      <span>{product.modelYear}</span>
                    </div>
                  )}
                  {product.serialNumber && (
                    <div>
                      <h3>Serial Number </h3>
                      <span>{product.serialNumber}</span>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <h3>Color</h3>
                      <span>{product.color}</span>
                    </div>
                  )}
                  {typeof product.units !== "undefined" && (
                    <div>
                      <h3>Units</h3>
                      <span>{product.units}</span>
                    </div>
                  )}
                </Detail>
                {product.description && (
                  <Detail columns="1">
                    <div>
                      <h3>Product Description</h3>
                      <p>{product.description}</p>
                    </div>
                  </Detail>
                )}
              </div>
            ))}
          </Collapsible>
        )}

        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Pictures & Videos</h3>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <div>
            <Grid columns="3">
              {jobData?.data?.fixMultiMedias?.map((media) =>
                media.contentType === "image" ? (
                  <div className="image" key={media.contentId}>
                    <img
                      src={media.content}
                      alt={media.content}
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : (
                  <div className="video">
                    {media.content && (
                      <video
                        src={media.content}
                        controls
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                )
              )}
            </Grid>
          </div>
        </Collapsible>

        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Service Delivery Location</h3>
                <p className="sub-heading">Where the fix is to be delivered</p>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <div className="px-4">
            <div className="mb-4">
              <h4
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Contact Person Location
              </h4>

              <Detail columns="3">
                <div>
                  <h3>City</h3>
                  <span>{jobData?.data?.addressDetails?.cityName}</span>
                </div>
                <div>
                  <h3>Landmark</h3>
                  <span>{jobData?.data?.addressDetails?.nearestLandMark}</span>
                </div>
              </Detail>
              <Detail columns="1">
                <div>
                  <h3>Address</h3>
                  <span>{jobData?.data?.addressDetails?.address}</span>
                </div>
              </Detail>
            </div>

            <div className="mb-4">
              <h4
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Contact Person Details
              </h4>

              <Detail columns="1">
                <div>
                  <h3>Name</h3>
                  <span>{jobData?.data?.contactName}</span>
                </div>
                <div>
                  <h3>Email</h3>
                  <span>{jobData?.data?.contactEmail}</span>
                </div>
                <div>
                  <h3>Phone Number</h3>
                  <span>{jobData?.data?.contactPhone}</span>
                </div>
              </Detail>
            </div>
          </div>
        </Collapsible>

        {Object.values(jobData?.data?.fixMultiMedias || {}).some(
          (media) => media == true
        ) && (
          <Collapsible
            trigger={
              <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="heading">Pictures and Videos</h3>
                  <p className="sub-heading">
                    Pictures and videos of the fix required
                  </p>
                </div>
                <i className="fas fa-chevron-right collapsible-icon"></i>
              </StyledCollapsible>
            }
          >
            <Detail columns="2">
              {jobData?.data?.fixMultiMedias.map((media, index) => {
                if (media.contentType === "image") {
                  return (
                    <div className="image" key={index}>
                      <img src={media.content} alt={`product ${index}`} />
                    </div>
                  );
                } else if (media.contentType === "video") {
                  return (
                    <div className="video" key={index}>
                      <video controls>
                        <source src={media.content} type="video/mp4" />
                      </video>
                    </div>
                  );
                }
              })}
            </Detail>
          </Collapsible>
        )}

        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Contact Preferences</h3>
                <p className="sub-heading">How you want us to contact you</p>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            Fix Contact Person and Account Holder
          </h4>
          <Fields>
            <div className="mb-4">
              {contactPrefData?.data?.map((preference) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={preference.id}
                  inputName="contactPreference.contactPreferenceId"
                  inputValue={preference.id}
                  checked={preference.id === jobData?.data?.contactPreferenceId}
                  labelText={preference.name}
                  disabled
                />
              ))}
            </div>
          </Fields>
          <div className="px-4">
            <div className="mb-4">
              <h4
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Preferences
              </h4>

              <Detail columns="2">
                <div className="d-flex justify-content-between">
                  <GlobalInput
                    labelText="Contact From"
                    labelColor="var(--clr-primary)"
                    inputType="time"
                    inputValue={jobData?.data?.contactFromTime}
                    readOnly
                    disabled
                  />
                  <GlobalInput
                    labelText="Contact To"
                    labelColor="var(--clr-primary)"
                    inputType="time"
                    inputValue={jobData?.data?.contactToTime}
                    readOnly
                    disabled
                  />
                </div>
              </Detail>
            </div>
            <h4
              style={{
                marginBottom: "8px",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Notifications
            </h4>
            <Fields>
              <FormGroup>
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  inputName="contactPreference.notificationPreferenceId"
                  inputValue={0}
                  labelText="Send all quotation to both the account holder and fix contact person"
                  checked={0 === jobData?.data?.notificationPreferenceId}
                />

                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  width="fit-content"
                  inputName="contactPreference.notificationPreferenceId"
                  inputValue={1}
                  checked={1 === jobData?.data?.notificationPreferenceId}
                  labelText="Send quotation and billing notifications to the account holder only; All other notifications will be sent to the fix contact person"
                />
              </FormGroup>
            </Fields>
          </div>
        </Collapsible>
      </StyledForm>
    </GlobalModal>
  );
};

export default FixDetails;

const Detail = styled(FormGroup)`
  row-gap: 20px;
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 6px;
    color: var(--clr-primary);
    font-size: 1rem;
  }

  .image,
  .video {
    aspect-ratio: 16 / 9;
  }
`;
