import { useState } from "react";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../../globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../../globalcomponents/modals/ConfirmDeleteModal";
import { useSnackbar } from "notistack";
import {
  useApproveSupplier,
  useGetSupplierApplicants,
  useRejectSupplier,
} from "../../../../../hooks/useQueries/useOnboarding";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import ViewSupplierApplication from "../../../../suppliercomponent/modal/ViewSupplierApplication";
import ConfirmRejectionModal from "../../../../globalcomponents/modals/ConfirmRejectionModal";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const SupplierStage1Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: supplierApplicants, isLoading } = useGetSupplierApplicants();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateApplied",
    supplierApplicants?.data
  );

  // modal controls

  const openApplicationModal = (value) => {
    setShowApplicationModal(true);
    let applicantIndex = supplierApplicants.data.findIndex(
      (x) => x.id === value
    );
    setActiveApplicant(supplierApplicants.data[applicantIndex]);
  };
  const openAcceptModal = (value) => {
    setShowAcceptModal(true);
    let applicantIndex = supplierApplicants.data.findIndex(
      (x) => x.id === value
    );
    setActiveApplicant(supplierApplicants.data[applicantIndex]);
  };
  const openRejectModal = (value) => {
    setShowRejectModal(true);
    let applicantIndex = supplierApplicants.data.findIndex(
      (x) => x.id === value
    );
    setActiveApplicant(supplierApplicants.data[applicantIndex]);
  };
  const closeApplicationModal = (value) => {
    setShowApplicationModal(false);
  };
  const closeAcceptModal = () => {
    setShowAcceptModal(false);
    setActiveApplicant({});
  };
  const closeRejectModal = () => {
    setShowRejectModal(false);
    setActiveApplicant({});
  };

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeAcceptModal();
    closeRejectModal();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  // ----------------mutations------------------------

  const { mutate: acceptApplicant, isLoading: isApproving } =
    useApproveSupplier(onSuccess, onFailed);
  const { mutate: rejectApplicant, isLoading: isRejecting } = useRejectSupplier(
    onSuccess,
    onFailed
  );

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
          value + " " + supplierApplicants.data[tableMeta.rowIndex].lastName,
      },
    },
    {
      name: "dateApplied",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "cacAttachment",
      label: "CAC",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="_blank"
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
      label: "Cover letter",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="_blank"
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
              value === "approved"
                ? "Approved"
                : value === "pending"
                ? "Pending"
                : "Rejected"
            }
            color={
              value === "approved"
                ? "success"
                : value === "pending"
                ? "warning"
                : "error"
            }
          />
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
        customBodyRender: (value, tableMeta) => {
          const actions = [
            {
              id: 0,
              name: "View Application",
              action: () => openApplicationModal(value),
              // disabled:
              //   applicantData[tableMeta.rowIndex].status === "approved" ||
              //   applicantData[tableMeta.rowIndex].status === "rejected",
            },
            {
              id: 1,
              name: "Accept Candidate",
              action: () => openAcceptModal(value),
              disabled:
                supplierApplicants.data[tableMeta.rowIndex].status ===
                  "approved" ||
                supplierApplicants.data[tableMeta.rowIndex].status ===
                  "rejected",
            },
            {
              id: 2,
              name: "Reject Candidate",
              action: () => openRejectModal(value),
              disabled:
                supplierApplicants.data[tableMeta.rowIndex].status ===
                  "approved" ||
                supplierApplicants.data[tableMeta.rowIndex].status ===
                  "rejected",
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="supplier-stage-1" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && supplierApplicants.data?.length > 0 && (
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

      {!isLoading && !supplierApplicants?.data && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {showApplicationModal && (
        <ViewSupplierApplication
          isLoading={isRejecting}
          isOpen={showApplicationModal}
          closeModal={closeApplicationModal}
          applicantId={activeApplicant.id}
          headerText={`SUPPLIER APPLICANT INFORMATION`}
        />
      )}

      {showAcceptModal && (
        <ConfirmAcceptModal
          isLoading={isApproving}
          open={showAcceptModal}
          close={closeAcceptModal}
          onDelete={() => acceptApplicant(activeApplicant)}
          pText={`Are you sure you want to approve ${activeApplicant.firstName}'s application`}
          labelText={"Approve Supplier Candidate?"}
          actionText={"Approve"}
        />
      )}

      {showRejectModal && (
        <ConfirmRejectionModal
          isLoading={isRejecting}
          // open={showRejectModal}
          isOpen={showRejectModal}
          // close={closeRejectModal}
          closeModal={closeRejectModal}
          onReject={() => rejectApplicant(activeApplicant)}
          pText={`Are you sure you want to reject ${activeApplicant.firstName}'s application`}
          labelText={"Reject Supplier Candidate"}
          actionText={"Reject"}
        />
      )}
    </div>
  );
};

export default SupplierStage1Table;
