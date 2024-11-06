import { Chip } from "@mui/material";
import {
  useApproveCCOFifthStage,
  useGetCCOFifthStageApplicants,
  useGetCollaboratorRating,
  useRateApplicantInterview,
  useRejectCCOFifthStage,
  useRejectCollaboratorFinalStage,
} from "../../../../../hooks/useQueries/useOnboarding";
import { useState } from "react";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../../globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../../globalcomponents/modals/ConfirmDeleteModal";
import { format } from "date-fns";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import ConfirmRejectionModal from "../../../../globalcomponents/modals/ConfirmRejectionModal";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";
import GradeTechApplicant from "../../../../../pages/qamaster/techmanagement/GradeTechApplicant";

const CCOStage5Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showGradeApplicant, setShowGradeApplicant] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const { data: stage5ApplicantsData, isLoading } =
    useGetCCOFifthStageApplicants();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    stage5ApplicantsData?.data
  );

  const getActiveCco = (applicantId) =>
    stage5ApplicantsData?.data.filter(
      (applicant) => applicant.cseUserId === applicantId
    );
  const openGradeApplicant = (id) => {
    const applicant = getActiveCco(id);
    setActiveApplicant(applicant[0]);
    setShowGradeApplicant(true);
    const payload = {
      role: 4,
      type: 1,
    };
    ratingCriteria(payload);
  };
  const closeGradeApplicant = () => {
    setActiveApplicant(null);
    setShowGradeApplicant(false);
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

  // ----------------mutations-----------------------
  const { mutate: ratingCriteria } = useGetCollaboratorRating(onSuccess);
  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 4,
    });

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
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
      name: "status",
      label: "Interview Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value?.toLowerCase() === "pending approval"
                ? "Pending"
                : value?.toLowerCase() === "accepted"
                ? "Accepted"
                : value?.toLowerCase() === "rejected"
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

          return <GlobalTableActions actions={actions} id="cco-fifth-stage" />;
        },
      },
    },
  ];
  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 4,
      type: 3,
      applicantId: activeApplicant?.id,
      additionalComment: "",
      ratings: initpayload.ratings,
      collabUserId: activeApplicant?.cseUserId
    };
    rateApplicant(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
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
      {showGradeApplicant && (
        <GradeTechApplicant
          isOpen={showGradeApplicant}
          closeModal={closeGradeApplicant}
          criteriaData={ratingsData}
          gradeApplicant={gradeApplicant}
          isGrading={isGrading}
        />
      )}
    </>
  );
};

export default CCOStage5Table;
