import { useParams } from "react-router-dom";
import {
  BackBtn,
  Grid,
  PageHeading,
  SectionHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetDiagnosisReport } from "../../../hooks/useQueries/useJobs";

const DiagnosisReport = () => {
  const { fixId } = useParams();
  const { data } = useGetDiagnosisReport(fixId);

  console.log(data);

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Diagnosis Report - {fixId}</PageHeading>
      </div>

      <div>
        <SectionHeading>Booking Details</SectionHeading>
        <Grid columns="3">
          <div>
            <h3>Booking Number</h3>
            <span>{data?.data?.fixId}</span>
          </div>
          <div>
            <h3>Booking Type</h3>
            <span>{data?.data?.bookingClass}</span>
          </div>
          <div>
            <h3>Service Type</h3>
            <span>{data?.data?.bookingType}</span>
          </div>
          <div>
            <h3>CSE</h3>
            <span>{data?.data?.cseName}</span>
          </div>
          <div>
            <h3>Scheduled Fix Date</h3>
            <span>{data?.data?.scheduleDate}</span>
          </div>
          <div>
            <h3>Scheduled Fix Time</h3>
            <span>{data?.data?.scheduleTime}</span>
          </div>
          <div>
            <h3>Fix Location</h3>
            <span>{data?.data?.address}</span>
          </div>
        </Grid>
      </div>

      <div className="mb-5">
        <SectionHeading>Issues and Recommendations</SectionHeading>
        {data?.data?.issuesAndRecommendations?.map((issue) => (
          <Grid columns="2" gap="30px">
            <div>
              <h3>Diagnosis Finding</h3>
              <p>{issue.issues}</p>
            </div>

            <div>
              <h3>Recommendation</h3>
              <p>{issue.recommendations}</p>
            </div>
          </Grid>
        ))}
      </div>

      <div>
        <SectionHeading>Additional Comments</SectionHeading>
        <p>{data?.data?.additionalComments}</p>
      </div>
    </>
  );
};

export default DiagnosisReport;
