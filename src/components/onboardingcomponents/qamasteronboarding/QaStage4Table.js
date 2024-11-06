import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useApproveCollaboratorOnboarding,
  useGetCollaboratorRating,
  useGetQaForFinalApproval,
  useRateApplicantInterview,
  useRejectCollaboratorFinalStage,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { Chip } from "@mui/material";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import GradeTechApplicant from "../../../pages/qamaster/techmanagement/GradeTechApplicant";

const QaStage4Table = () => {
  const [showRating, setShowRating] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);
  const [showApproved, setShowApproved] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showRejectedModal, setShowRejectedModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  // ---------------------------------data fecthing --------------------------------
  const { data: applicantData, isLoading } = useGetQaForFinalApproval();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "discussionDate",
    applicantData?.data
  );

  const applicants = applicantData?.data?.map((applicant) => {
    return {
      ...applicant,
      name: `${applicant.firstName} ${applicant.lastName}`,
    };
  });

  const getActiveApplicant = (applicantId) =>
    applicantData?.data?.filter(
      (applicant) => applicant.userId === applicantId
    );

  //-------------------------------------mutate fn and call-back---------------------------------------
  const onSuccess = (response) => {
    setRatingsData(response);
  };
  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.data, {
      variant: "success",
    });
    closeShowRatingModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: ratingCriteria, isLoading: loadingRatingData } =
    useGetCollaboratorRating(onSuccess);

  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailure,
      roleId: 2,
    });

  const showRatingModal = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRating(true);
    const payload = {
      role: 2,
      type: 1,
    };
    ratingCriteria(payload);
  };
  const closeShowRatingModal = () => {
    setShowRating(false);
  };
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, value) => value.rowIndex + 1,
      },
    },
    {
      name: "firstName",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta) =>
          value + " " + applicantData?.data[tableMeta.rowIndex].lastName,
      },
    },

    {
      name: "discussionDate",
      label: "Discussion Date",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value?.toLowerCase() === "approved"
                ? "Approved"
                : value?.toLowerCase() === "pending"
                ? "Pending"
                : value?.toLowerCase() === "rejected"
                ? "Rejected"
                : null
            }
            color={
              value?.toLowerCase() === "approved"
                ? "success"
                : value?.toLowerCase() === "pending"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Grade Applicant",
              action: () => showRatingModal(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="userId" />;
        },
      },
    },
  ];

  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 2,
      type: 3,
      applicantId: activeApplicant.id,
      additionalComment: "",
      ratings: initpayload.ratings,
      collabUserId: activeApplicant?.userId,
    };
    rateApplicant(payload);
  };
  return (
    <>
      <div className="text-align-center">
        <GlobalBallBeat isLoading={isLoading} />
      </div>
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
      {showRating && (
        <GradeTechApplicant
          isOpen={showRating}
          closeModal={closeShowRatingModal}
          criteriaData={ratingsData}
          gradeApplicant={gradeApplicant}
          isLoading={loadingRatingData}
          isGrading={isGrading}
        />
      )}
    </>
  );
};

export default QaStage4Table;
