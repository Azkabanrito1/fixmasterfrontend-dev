import React, { useState } from "react";
import GlobalModal from "../../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../../layouts/modal/AltModalHeader";
import GlobalTable from "../../../../../../globalcomponents/GlobalTable";
import { format } from "date-fns";
import GlobalTableActions from "../../../../../../globalcomponents/GlobalTableActions";
import ConfirmDeleteModal from "../../../../../../globalcomponents/modals/ConfirmDeleteModal";
import { useDeleteCustomerServicesListing } from "../../../../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";

const ViewServices = ({ isOpen, closeModal, serviceData }) => {
  const [shownDeleteModal, setShownDeleteModal] = useState(false);
  const [activeId, setActiveId] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const showDeleteModalHandler = (id) => {
    setActiveId(id);
    setShownDeleteModal(true);
  };
  const closeDeleteModalHandler = () => {
    setActiveId(null);
    setShownDeleteModal(false);
  };

  // ------------------------------mutate fn & mutate callbacks ------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeDeleteModalHandler();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: deleteService, isLoading } = useDeleteCustomerServicesListing(
    onSuccess,
    onFailure
  );
  const serviceColumns = [
    {
      name: "fixId",
      label: "Fix Id",
    },
    {
      name: "equipmentName",
      label: "Equipment Name",
    },
    {
      name: "serviceName",
      label: "Service Name",
    },
    {
      name: "dateCreated",
      label: "Requested Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Delete Services",
              action: () => showDeleteModalHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];
  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader heading={"Services"} closeModal={closeModal} />
        <GlobalTable
          columns={serviceColumns}
          data={serviceData?.data}
          options={{ selection: "none" }}
        />
      </GlobalModal>
      {shownDeleteModal && (
        <ConfirmDeleteModal
          open={shownDeleteModal}
          close={closeDeleteModalHandler}
          labelText="Are you sure you want to delete this services"
          actionText="Delete"
          onDelete={() => deleteService(activeId)}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ViewServices;
