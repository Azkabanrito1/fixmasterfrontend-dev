import { useParams } from "react-router-dom";
import { useGetFixServiceType } from "../../../hooks/useQueries/useAdmin";
import {
  BackBtn,
  Grid,
  GroupHeading,
  PageHeading,
} from "../../globalcomponents/Utilities";
import { formatTime, formatTimeToHour } from "../../../utils/selectOptions";
import { format } from "date-fns";

const ViewType = () => {
  const { id } = useParams();
  //----------------------------------------------------------data fetching------------------------------------------------
  const { data: serviceData } = useGetFixServiceType();

  const service = serviceData?.data?.find((item) => item.id === +id);

  const toLocaleString = (amount) => {
    return (
      amount?.toLocaleString("en-NG", { style: "currency", currency: "NGN" }) ||
      "N/A"
    );
  };

  const formatMinutes = function (timeStr) {
    const [hour, minute] = timeStr.split(":");
    const formattedHour = hour.padStart(2, "0");
    return `${formattedHour}:${minute}`;
  };

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Services Type Details</PageHeading>
      </div>
      <div
        className="mt-5"
        style={{
          border: "1px solid black",
          paddingLeft: "1rem",
          paddingTop: "1rem",
        }}
      >
        <Grid columns="4" className="mb-4">
          <div>
            <h3>Name</h3>
            <span className="d-block">{service?.longName}</span>
          </div>
          <div>
            <h3>SLA(min)</h3>
            <span className="d-block">{service.sla}</span>
          </div>
          <div>
            <h3>Start Time</h3>
            <span className="d-block">{formatTime(service?.startTime)}</span>
          </div>
          <div>
            <h3>End Time</h3>
            <span className="d-block">{formatTime(service?.endTime)}</span>
          </div>
          <div>
            <h3>Franchisee Escalation Time (min)</h3>
            <span className="d-block">{service?.escalationTime}</span>
          </div>
        </Grid>
      </div>
      <div
        style={{
          border: "1px solid black",
          paddingLeft: "1rem",
          paddingTop: "1rem",
          marginTop: "1rem",
        }}
      >
        <GroupHeading
          // style={{ borderBottom: "1px solid black" }}
          className="pt-3 ps-2"
        >
          Premium
        </GroupHeading>
        <div>
          <p className="text-muted my-3">Booking</p>
          <Grid columns="4" gap="0px" className="mb-4">
            <div>
              <h3>Booking Fee</h3>
              <span className="d-block">{`
              ${service?.bookingFeePremium}
              %`}</span>
            </div>

            <div>
              <h3>Booking Fee Start Date</h3>
              <span className="d-block">
                {format(new Date(service?.bookPremStartDate), "dd-MM-yyyy")}
              </span>
            </div>

            <div>
              <h3>Booking Fee End Date</h3>
              <span className="d-block">
                {format(new Date(service?.bookPremEndDate), "dd-MM-yyyy")}
              </span>
            </div>
          </Grid>
        </div>
        <div>
          <p className="text-muted my-3">Labour</p>
          <Grid columns="4" className="mb-4">
            <div>
              <h3>Labour Fee</h3>
              <span className="d-block">{`${toLocaleString(
                service?.labourPremium
              )}`}</span>
            </div>

            <div>
              <h3>Labour Start Date</h3>
              <span className="d-block">
                {format(new Date(service?.labPremStartDate), "dd-MM-yyyy")}
              </span>
            </div>

            <div>
              <h3>Labour End Date</h3>
              <span className="d-block">
                {format(new Date(service?.labPremEndDate), "dd-MM-yyyy")}
              </span>
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ViewType;
