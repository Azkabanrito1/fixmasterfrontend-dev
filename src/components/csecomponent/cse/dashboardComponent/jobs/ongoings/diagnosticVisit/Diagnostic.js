import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import DiagnosticTime from "./DiagnosticTime";
import QAMasterFeedback from "./QAMasterFeedback";
import QAMasterRequest from "./QAMasterRequest";
import FindingAndRecommendation from "./FindingAndRecommendation";
import {
  useCheckDiagnosisStatus,
  useCloseDiagnosisVisit,
  useExtendDiagnosisTime,
  useGetDiagnosisTime,
  useGetFixCategories,
  useLogDiagnosisEnd,
  useLogDiagnosisStart,
} from "../../../../../../../hooks/useQueries/useJobs";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ExtendedDiagnosticTime from "../../modal/ExtendedDiagnosticTime";
import ServiceListing from "../jobinfo/ServiceListing";
import EquipmentDelivered from "../jobinfo/EquipmentDelivered";

const Diagnostic = () => {
  const { jobDetails = {} } = useOutletContext();
  const { fixId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [showConfirmSupplies, setShowConfirmSupplies] = useState(false);
  const [openExtendedDiagnosisModal, setOpenExtendedDiagnosisModal] =
    useState(true);
  const navigate = useNavigate();

  //-------------------------data fetching------------
  const { data: diagnosisTime } = useGetDiagnosisTime();
  const { data: categories } = useGetFixCategories();
  const { data: diagnosisStatus } = useCheckDiagnosisStatus(fixId);

  useEffect(() => {
    if (diagnosisStatus?.data?.includes("doesnt")) {
      setOpenExtendedDiagnosisModal(true);
    } else {
      setOpenExtendedDiagnosisModal(false);
    }
  }, [diagnosisStatus?.data]);

  //-------------------mutations---------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenExtendedDiagnosisModal(false);
    setShowConfirmSupplies(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: logStart } = useLogDiagnosisStart(onSuccess, onFailure);
  const { mutate: logEnd } = useLogDiagnosisEnd(onSuccess, onFailure, fixId);

  const { mutate: extendTime, isLoading: isExtendingTime } =
    useExtendDiagnosisTime(onSuccess, onFailure);
  const { mutate: closeDiagnosis } = useCloseDiagnosisVisit(
    onSuccess,
    onFailure
  );

  // -----------------------actions----------------------
  const endDiagnosisAction = (isPartRequested) => {
    closeDiagnosis({
      fixId: +fixId,
      isPartRequested,
    });
    logEnd({
      fixId,
      endTime: new Date().toISOString(),
    });
  };

  return (
    <div className="px-2 position-relative">
      <DiagnosticTime
        fixId={+fixId}
        startDiagnosis={logStart}
        endDiagnosis={endDiagnosisAction}
        showConfirmSupplies={showConfirmSupplies}
        setShowConfirmSupplies={setShowConfirmSupplies}
      />
      <ServiceListing jobDetails={jobDetails} />
      <EquipmentDelivered fixId={fixId} />
      <FindingAndRecommendation fixId={fixId} />
      <QAMasterRequest categories={categories?.data} fixId={fixId} />

      <QAMasterFeedback fixId={fixId} stage={true} />

      {openExtendedDiagnosisModal && (
        <ExtendedDiagnosticTime
          fixId={+fixId}
          isOpen={openExtendedDiagnosisModal}
          closeModal={() => {
            enqueueSnackbar(
              "Please fill the form to continue Diagnostic Visit",
              { variant: "info" }
            );
            navigate(-1);
          }}
          diagnosisTime={diagnosisTime?.data}
          isExtendingTime={isExtendingTime}
          respond={extendTime}
        />
      )}
    </div>
  );
};

export default Diagnostic;
