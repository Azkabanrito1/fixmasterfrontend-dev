import DiagnosticTiming from "./completion/DiagnosticTiming";
import CompletionDetails from "./completion/CompletionDetails";
import QAMasterFeedback from "./diagnosticVisit/QAMasterFeedback";
import QAMasterRequest from "./diagnosticVisit/QAMasterRequest";
import CustomerCompletion from "./completion/CustomerCompletion";
import FeedBack from "./diagnosticVisit/FeedBack";
import { useGetDiagnosisTime } from "../../../../../../hooks/useQueries/useJobs";
import { useParams } from "react-router-dom";
// import

const CompletionHome = () => {
  const { fixId } = useParams();
  const { data: diagnosisTime } = useGetDiagnosisTime();

  return (
    <div className="px-2">
      <DiagnosticTiming workTime={diagnosisTime?.data} fixId={fixId} />
      <QAMasterRequest fixId={fixId} stage={true} />
      <QAMasterFeedback fixId={fixId} />
      <CustomerCompletion />
      {/* <FeedBack /> */}
    </div>
  );
};

export default CompletionHome;
