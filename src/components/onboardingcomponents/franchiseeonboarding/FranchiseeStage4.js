import React from "react";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useApproveCollaboratorOnboarding,
  useGetCollaboratorRating,
  useGetFranchiseeForFinalApproval,
  useRateApplicantInterview,
  useRejectCollaboratorFinalStage,
} from "../../../hooks/useQueries/useOnboarding";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { Chip } from "@mui/material";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import GradeTechApplicant from "../../../pages/qamaster/techmanagement/GradeTechApplicant";

const FranchiseeStage4 = () => {
  const [ratingsData, setRatingsData] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  // -------------------data fetching ----------------
  const { data: applicantData, isLoading } = useGetFranchiseeForFinalApproval();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "discussionDate",
    applicantData?.data
  );

  const applicants = applicantData?.data?.map((applicant) => {
    return {
      name: `${applicant.firstName} ${applicant.lastName}`,
      ...applicant,
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
  const { mutate: ratingCriteria } = useGetCollaboratorRating(onSuccess);
  const { mutate: rateApplicant } = useRateApplicantInterview({
    onSuccess: onSuccessfullRAting,
    onFailed: onFailure,
    roleId: 1,
  });

  const showRatingModal = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRating(true);
    const payload = {
      role: 1,
      type: 1,
    };
    ratingCriteria(payload);
  };

  const closeShowRatingModal = (id) => {
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
      label: "Name",
      name: "firstName",
      options: {
        customBodyRender: (value, tableMeta) => {
          return `${value} ${
            applicantData?.data[tableMeta.rowIndex]?.lastName
          }`;
        },
      },
    },
    {
      name: "territory",
      label: "Territory",
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
              value.toLowerCase() === "awaiting final approval"
                ? "Awaiting final approval"
                : value.toLowerCase() === "approved"
                ? "Approved"
                : value.toLowerCase() === "rejected"
                ? "Rejected"
                : null
            }
            color={
              value.toLowerCase() === "awaiting final approval"
                ? "warning"
                : value.toLowerCase() === "approved"
                ? "success"
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
      role: 1,
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
      <GlobalBallBeat style={{ textAlign: "center" }} loading={isLoading} />
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
        />
      )}
    </>
  );
};

export default FranchiseeStage4;
