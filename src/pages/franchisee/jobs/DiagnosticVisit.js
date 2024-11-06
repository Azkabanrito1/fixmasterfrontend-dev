import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import LargeFileUpload from "../../../components/globalcomponents/LargeFileUpload";
import DiagnosticTiming from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/DiagnosticTiming";
import DiagnosticFinding from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/DiagnosticFinding";
import Recommendation from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/Recommendations";
import QAMasterRequest from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/QAMasterRequest";
import QAMasterFeedback from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/QAMasterFeedback";
import EqpRequest from "../../../components/franchiseecomponents/jobsmanagement/diagnosticvisit/EqpRequest";
import { SectionHeading } from "../../../components/globalcomponents/Utilities";

const DiagnosticVisit = () => {
  return (
    <div className="px-2">
      <DiagnosticTiming />
      <DiagnosticFinding />
      <Recommendation />
      <QAMasterRequest />

      <section className="mb-5">
        <SectionHeading>Add Pictures/Videos</SectionHeading>

        <div className="d-flex justify-content-center mb-3">
          <LargeFileUpload />
        </div>

        <GlobalBtn mx="auto">Send File</GlobalBtn>
      </section>

      <QAMasterFeedback />
      <EqpRequest />
    </div>
  );
};

export default DiagnosticVisit;
