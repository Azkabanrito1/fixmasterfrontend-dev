import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import {
  useAcceptTechnician,
  useGetTechnicianApplicantStageOne,
  useRejectTechnician,
} from "../../../hooks/useQueries/useOnboarding";
import { BallBeat } from "react-pure-loaders";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import ConfirmRejectionModal from "../../../components/globalcomponents/modals/ConfirmRejectionModal";
import { username } from "../../../utils/utilityFxns";
import ViewTechnicianApplicantInfoModal from "./modal/ViewTechnicianApplicantInfoModal";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const StageOne = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [showAccepetedModal, setShowAccepetedModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState([]);
  const { data: techApplicantData, isLoading } =
    useGetTechnicianApplicantStageOne();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateApplied",
    techApplicantData?.technicianApplicant
  );

  const getActiveApplicant = (id) =>
    techApplicantData.technicianApplicant.filter(
      (applicant) => applicant.id === id
    );

  const { enqueueSnackbar } = useSnackbar();

  // modal control
  const openViewMoreModal = (id) => {
    setOpenViewModal(true);
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
  };
  const closeViewMoreModal = (id) => {
    setOpenViewModal(false);
    setActiveApplicant({});
  };

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
  };
  const onSuccessReject = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeRejectedHandlers();
  };
  const { mutate: acceptApplicant, isLoading: isApproving } =
    useAcceptTechnician(onSuccess, onFailure);
  const { mutate: rejectApplicant, isLoading: isRejecting } =
    useRejectTechnician(onSuccessReject, onFailure);

  const techColumns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => {
          return meta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "dateApplied",
      label: "Application Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "technicianCategory",
      label: "Category",
      options: {
        customBodyRender: (value) => {
          const categories = value?.flatMap((cat) => {
            return cat.categoryName;
          });
          if (categories.length >= 2) {
            return <span>{`${categories?.[0]}, ${categories?.[1]}`}</span>;
          } else {
            return <span>{`${categories?.[0]}`}</span>;
          }
        },
      },
    },
    {
      name: "technicianLanguage",
      label: "Language",
      options: {
        customBodyRender: (value) => {
          const language = value?.map((lang) => lang.languageName);
          if (language.length >= 2) {
            return <span>{`${language?.[0]}, ${language?.[1]}`}</span>;
          } else {
            return <span>{`${language?.[0]}`}</span>;
          }
        },
      },
    },
    {
      name: "cv",
      label: "CV",
      options: {
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="blank"
              className="text-danger font-weight-bold"
            >
              View
            </a>
          );
        },
      },
    },
    {
      name: "coverLetterAttachment",
      label: "Cover Letter",
      options: {
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="blank"
              className="text-danger font-weight-bold"
            >
              View
            </a>
          );
        },
      },
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
                : "Rejected"
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
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value, meta) => {
          const status =
            techApplicantData?.technicianApplicant?.[meta.rowIndex]?.status;

          const actions = [
            {
              id: 0,
              name: "View Application",
              action: () => openViewMoreModal(value),
            },
            {
              id: 1,
              name: "Accept Application",
              action: () => {
                openAccepectedHandlers(value);
              },
              disabled: status.toLowerCase() === "pending" ? false : true,
            },
            {
              id: 2,
              name: "Reject Application",
              action: () => {
                openRejectedHandlers(value);
              },
              disabled: status.toLowerCase() === "pending" ? false : true,
            },
          ];

          return <GlobalTableActions actions={actions} id="id" />;
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
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={techColumns}
          data={filteredResults || []}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
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
      {openViewModal && (
        <ViewTechnicianApplicantInfoModal
          open={openViewModal}
          close={closeViewMoreModal}
          applicantId={activeApplicant.id}
          headerText={`TECHNICIAN APPLICANT INFORMATION`}
        />
      )}
    </>
  );
};

export default StageOne;
