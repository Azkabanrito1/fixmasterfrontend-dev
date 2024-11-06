import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteServiceListing,
  useGetCategoryDetailsById,
  useGetCategoryServiceById,
  useUpdateServiceListing,
} from "../../../hooks/useQueries/useAdmin";
import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import AddServices from "./AddServices";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useSnackbar } from "notistack";

const ViewServiceByCategory = () => {
  const [modalState, setModalState] = useState({
    type: null,
    isOpen: false,
    service: {},
  });

  const { id } = useParams();

  //Data fetching
  const { data: categoryDetailsData } = useGetCategoryDetailsById(id);

  const { data: serviceData, isLoading } = useGetCategoryServiceById(
    id || categoryDetailsData?.data?.parentId
  );

  const { enqueueSnackbar } = useSnackbar();

  // Success and failure handlers for mutations
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeModal();
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  // Mutations for updating and deleting services
  const { mutate: updateService, isLoading: isUpdating } =
    useUpdateServiceListing(onSuccess, onFailure);
  const { mutate: deleteService, isLoading: isDeleting } =
    useDeleteServiceListing(onSuccess, onFailure);

  const deactivateService = () => {
    deleteService({
      id: modalState.service.id,
      moduleType: 2,
      actionType: 2,
    });
  };

  // Open Update Service Modal
  const handleUpdateService = (serviceId) => {
    const activeService = serviceData?.data?.find(
      (service) => service.id === serviceId
    );

    setModalState({
      type: "update",
      isOpen: true,
      service: activeService,
    });
  };

  // Open Delete Service Modal
  const handleDeleteService = (serviceId) => {
    const activeService = serviceData?.data?.find(
      (service) => service.id === serviceId
    );
    setModalState({
      type: "delete",
      isOpen: true,
      service: activeService,
    });
  };

  // Close any modal
  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
      service: {},
    });
  };

  // Columns for the service table
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "categoryName",
      label: "Category",
    },
    {
      name: "fixClass",
      label: "Booking Type",
    },
    {
      name: "levels",
      label: "Level",
      options: {
        customBodyRender: (value) => <div>{`L${value}`}</div>,
      },
    },
    {
      name: "name",
      label: "Services",
    },
    {
      name: "amount",
      label: "Standard Rate",
      options: {
        customBodyRender: (value) => `₦${value?.toLocaleString()}`,
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
              name: "Update service",
              action: () => handleUpdateService(value),
            },
            // {
            //   id: 2,
            //   name: "Delete service",
            //   action: () => handleDeleteService(value),
            // },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  // Helper for rendering the modals
  const renderModals = () => {
    const { type, isOpen, service } = modalState;
    if (!isOpen) return null;

    if (type === "update") {
      return (
        <AddServices
          isOpen={isOpen}
          closeModal={closeModal}
          heading="Update Services"
          textAction="Save"
          data={service}
          update={(updatedData) =>
            updateService({ ...service, ...updatedData })
          }
          isLoading={isUpdating}
        />
      );
    }

    if (type === "delete") {
      return (
        <ConfirmDeleteModal
          open={isOpen}
          close={closeModal}
          labelText="Delete Service"
          pText="Are you sure you want to delete this service?"
          actionText="Delete"
          onDelete={() => deactivateService()}
          isLoading={isDeleting}
        />
      );
    }

    return null;
  };

  return (
    <>
      <div>
        <PageHeading>Services</PageHeading>
        <BackBtn />
      </div>

      <GlobalBallBeat loading={isLoading} />

      <GlobalTable columns={columns} data={serviceData?.data || []} />

      {renderModals()}
    </>
  );
};

export default ViewServiceByCategory;
