import { useState } from "react";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import ConfirmAcceptModal from "../../../../globalcomponents/modals/ConfirmAcceptModal";
import { useSnackbar } from "notistack";
import {
  useApproveCollaboratorOnboarding,
  useGetCollaboratorRating,
  useGetFinalSupplier,
  useRateApplicantInterview,
  useRejectCollaboratorFinalStage,
} from "../../../../../hooks/useQueries/useOnboarding";
import { Chip } from "@mui/material";
import ConfirmRejectionModal from "../../../../globalcomponents/modals/ConfirmRejectionModal";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";
import GradeTechApplicant from "../../../../../pages/qamaster/techmanagement/GradeTechApplicant";

const SupplierStage3Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showGradeApplicant, setShowGradeApplicant] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { data: supplierFinalApproval, isLoading } = useGetFinalSupplier();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "discussionDate",
    supplierFinalApproval?.data
  );
  const getActiveSupplier = (applicantId) =>
    supplierFinalApproval?.data.filter(
      (applicant) => applicant.userId === applicantId
    );

  const openGradeApplicant = (id) => {
    const applicant = getActiveSupplier(id);
    setActiveApplicant(applicant[0]);
    setShowGradeApplicant(true);
    const payload = {
      role: 3,
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
      roleId: 3,
    });
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "firstName",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta) =>
          value + " " + supplierFinalApproval.data[tableMeta.rowIndex].lastName,
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
                : value?.toLowerCase() === "pending approval"
                ? "Pending"
                : value?.toLowerCase() === "rejected"
                ? "Rejected"
                : null
            }
            color={
              value?.toLowerCase() === "approved"
                ? "success"
                : value?.toLowerCase() === "pending approval"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "userId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Grade Applicant",
              action: () => openGradeApplicant(value),
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="supplier-stage-3" />
            </div>
          );
        },
      },
    },
  ];

  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 3,
      type: 3,
      applicantId: activeApplicant?.id,
      additionalComment: "",
      ratings: initpayload.ratings,
      collabUserId: activeApplicant?.userId,
    };
    rateApplicant(payload);
  };
  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
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
export default SupplierStage3Table;
