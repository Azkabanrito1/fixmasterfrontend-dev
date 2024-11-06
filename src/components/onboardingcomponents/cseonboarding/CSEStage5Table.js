import { Chip } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import {
  useApproveCSEFifthStage,
  useGetCollaboratorRating,
  useGetCSEFifthStageApplicants,
  useRateApplicantInterview,
  useRejectCSEFifthStage,
} from "../../../hooks/useQueries/useOnboarding";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import GradeApplicant from "../../qamastercomponent/techmanagement/modal/GradeApplicant";

const CSEStage5Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showGradeApplicant, setShowGradeApplicant] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showApproveCSE, setShowApproveCSE] = useState(false);
  const [showRejectCSE, setShowRejectCSE] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { data: stage5ApplicantsData, isLoading } =
    useGetCSEFifthStageApplicants();

  let stage5Applicants = stage5ApplicantsData?.data?.filter(
    (applicant) => applicant.stageStatusId <= 14
  );
  stage5Applicants =
    stage5ApplicantsData?.data.map((applicant, index) => ({
      ...applicant,
      sn: index + 1,
    })) || [];

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    stage5Applicants
  );
  const getActiveApplicant = (applicantId) => {
    const applicant= stage5ApplicantsData?.data?.filter(
      (applicant) => applicant.cseUserId === applicantId
    );
    setActiveApplicant(applicant[0]);
  };

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    setRatingsData(response);
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.data, {
      variant: "success",
    });
    closeGradeApplicant();
  };
  // ----------------mutations------------------------
  const { mutate: ratingCriteria, isLoading: isLoadings } =
    useGetCollaboratorRating(onSuccess);
  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 6,
    });

  // ------------------grading---------------------------
  const openGradeApplicant = (id) => {
    getActiveApplicant(id);
    const payload = {
      role: 6,
      type: 1,
    };
    ratingCriteria(payload);
    setShowGradeApplicant(true);
  };
  const closeGradeApplicant = () => {
    setShowGradeApplicant(false);
  };
  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 6,
      type: 3,
      applicantId: activeApplicant.applicantId,
      additionalComment: "",
      ratings: initpayload.ratings,
      collabUserId: activeApplicant.cseUserId
      
    };
    rateApplicant(payload);
  };

  const columns = [
    { name: "sn", label: "S/N" },
    { name: "name", label: "Name" },
    {
      name: "interviewDate",
      label: "Interview Date",
      options: {
        customBodyRender: (value) =>
          format(new Date(value), "dd-MM-yyyy") || "N/A",
      },
    },
    {
      name: "interviewStatus",
      label: "Interview Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value.toLowerCase() === "pending approval"
                ? "Pending approval"
                : value.toLowerCase() === "accepted"
                ? "Accepted"
                : value.toLowerCase() === "rejected"
                ? "Rejected"
                : null
            }
            color={
              value?.toLowerCase() === "accepted"
                ? "success"
                : value.toLowerCase() === "pending approval"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "cseUserId",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const actions = [
            {
              id: 1,
              name: "Grade Applicant",
              action: () => openGradeApplicant(value),
            },
          ];

          return <GlobalTableActions actions={actions} id="cse-fifth-stage" />;
        },
      },
    },
  ];


  return (
    <>
      <div>
        {!isLoading && stage5Applicants?.length > 0 && (
          <GlobalTable
            columns={columns}
            data={filteredResults}
            options={{
              customToolbar: () => (
                <DateFilterToolbar
                  dateQueries={dateQueries}
                  setDateQueries={setDateQueries}
                />
              ),
            }}
          />
        )}
        {!isLoading && !stage5Applicants?.length && (
          <p className="text-center">There are no applicants in this stage</p>
        )}
        {showGradeApplicant && (
          <GradeApplicant
            isOpen={showGradeApplicant}
            closeModal={closeGradeApplicant}
            criteriaData={ratingsData}
            isLoading={isLoadings}
            gradeApplicant={gradeApplicant}
            isGrading={isGrading}
          />
        )}
      </div>
    </>
  );
};

export default CSEStage5Table;
