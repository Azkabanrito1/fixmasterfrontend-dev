import React, { useState } from "react";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import {
  useAcceptTechnician,
  useGetTechnicianApplicantStageOne,
  useRejectTechnician,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import { username } from "../../../utils/utilityFxns";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";

const TechStage1 = () => {
  const [showAccepetedModal, setShowAccepetedModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState([]);
  const { data: techApplicantData, isLoading } =
    useGetTechnicianApplicantStageOne();

  const getActiveApplicant = (id) =>
    techApplicantData.technicianApplicant.filter(
      (applicant) => applicant.id === id
    );

  const { enqueueSnackbar } = useSnackbar();

  const openAccepectedHandlers = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowAccepetedModal(true);
  };

  const closeAccepectedHandlers = (id) => setShowAccepetedModal(false);

  const openRejectedHandlers = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRejectedModal(true);
  };

  const closeRejectedHandlers = () => setShowRejectedModal(false);

  const onSuccess = () => {
    enqueueSnackbar("Application successfully accepted", {
      variant: "success",
    });
    closeAccepectedHandlers();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
    closeRejectedHandlers();
    closeAccepectedHandlers();
  };
  const onSuccessReject = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeRejectedHandlers();
    closeAccepectedHandlers();
  };
  const { mutate: acceptApplicant, isLoading: isApproving } =
    useAcceptTechnician(onSuccess, onFailure);
  const { mutate: rejectApplicant, isLoading: isRejecting } =
    useRejectTechnician(onSuccessReject, onFailure);
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    { name: "name", label: "Name" },
    {
      name: "technicianCategory",
      label: "Category",
      options: {
        customBodyRender: (value) => {
          const categories = value?.map((cat) => {
            return cat.categoryName;
          });
          return <span>{categories?.join(", ")}</span>;
        },
      },
    },
    {
      name: "territoryName",
      label: "Territory",
    },
    {
      name: "cv",
      label: "CV",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <a href={value} target="_blank" className="text-danger">
            View
          </a>
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Accept Application",
              action: () => openAccepectedHandlers(value),
            },
            {
              id: 2,
              name: "Reject Application",
              action: () => openRejectedHandlers(value),
            },
          ];

          return (
            <GlobalTableActions actions={actions} id={"tech-onboarding"} />
          );
        },
      },
    },
  ];

  const rejectApplicants = (applicant) => {
    const payload = {
      applicantId: activeApplicant.id,
      comment: applicant.reason,
    };
    rejectApplicant(payload);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={techApplicantData?.technicianApplicant || []}
          options={{
            elevation: 0,
            filter: false,
            search: false,
            viewColumns: false,
            print: false,
            download: false,
            selectableRows: "none",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
          }}
        />
      )}
      {!isLoading && techApplicantData?.technicianApplicant?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {showAccepetedModal && (
        <ConfirmAcceptModal
          open={showAccepetedModal}
          close={closeAccepectedHandlers}
          onDelete={() => acceptApplicant(activeApplicant?.id)}
          pText={`Are you sure you want to approve ${username(
            activeApplicant
          )}'s application`}
          labelText={"Approve Technician Application"}
          actionText={"Approve"}
          isLoading={isApproving}
        />
      )}

      {showRejectedModal && (
        <ConfirmRejectionModal
          isOpen={showRejectedModal}
          closeModal={closeRejectedHandlers}
          labelText="Reject Technician Application"
          actionText={"Reject"}
          onReject={rejectApplicants}
          pText={`Are you sure you want to reject ${username(
            activeApplicant
          )}'s application`}
          isLoading={isRejecting}
        />
      )}
    </>
  );
};

export default TechStage1;
