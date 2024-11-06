import React, { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  useActivateOrDeactivatBookingTypeAndServiceType,
  useCreateServieType,
  useDeleteServices,
  useGetFixServiceType,
  useUpdateFixService,
} from "../../../hooks/useQueries/useAdmin";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import Qualification from "../../../components/admincomponents/masterdata/Qualification";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import { formatTime, formatTimeToHour } from "../../../utils/selectOptions";
import { Chip } from "@mui/material";

const ServicesType = () => {
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  //----------------------------------------------------------data fetching------------------------------------------------
  const { data: serviceData, isLoading } = useGetFixServiceType();

  //---------------------------------------------------mutations------------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenAddServiceModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: serviceType, isLoading: isCreating } = useCreateServieType(
    onSuccess,
    onFailure
  );
  const { mutate: updateServiceType, isLoading: isUpdating } =
    useUpdateFixService(onSuccess, onFailure);
  const { mutate: deleteServiceType, isLoading: isDeleting } =
    useDeleteServices(onSuccess, onFailure);

  const { mutate: activateOrDeactivate } =
    useActivateOrDeactivatBookingTypeAndServiceType(onSuccess, onFailure);

  //------------------------------------------------------modal handlers----------------------------------------------------

  const showAddServices = () => setOpenAddServiceModal(true);
  const showUpdateService = function (id) {
    const service = serviceData?.data?.find((cat) => cat.id === id);
    setActiveService(service);
    setOpenUpdateModal(true);
  };

  //ActionType Enum remains the same
  // 1= Activate
  // 2= Deactivate

  // ModuleType is for the module(tables)
  // 1 = BookingType,
  // 2 = ServiceType

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "longName",
      label: "Name",
    },
    {
      name: "sla",
      label: "Service Level Agreement (min)",
    },
    {
      name: "startTime",
      label: "Start Time",
      options: {
        customBodyRender: (value) => formatTime(value),
      },
    },
    {
      name: "endTime",
      label: "End Time",
      options: {
        customBodyRender: (value) => formatTime(value),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <Chip
              label={value.toLowerCase() === "active" ? "Active" : "Inactive"}
              color={value.toLowerCase() === "active" ? "success" : "error"}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const activatePayload = {
            id: value,
            moduleType: 2,
            actionType: 1,
          };
          const deactivatePayload = {
            id: value,
            moduleType: 2,
            actionType: 2,
          };
          const actions = [
            {
              id: 0,
              name: "View details",
              action: () => navigate(`../service-type/${value}`),
            },
            {
              id: 1,
              name: "Update Service",
              action: () => showUpdateService(value),
            },
            {
              id: 2,
              name: "Activate",
              action: () => activateOrDeactivate(activatePayload),
            },
            {
              id: 3,
              name: "Deactivate",
              action: () => activateOrDeactivate(deactivatePayload),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  const addService = (initPayload) => {
    const payload = {
      longName: initPayload.longName,
      sla: initPayload.sla,
      startTime: initPayload.startTime,
      endTime: initPayload.endTime,
      bookingFeePremium: initPayload.bookingFee,
      bookPremStartDate: initPayload.bookingFeeStartDate,
      bookPremEndDate: initPayload.bookingFeeEndDate,
      escalationTime: initPayload.escalationTime,
      labourPremium: initPayload.labour,
      labPremStartDate: initPayload.labourStartDate,
      labPremEndDate: initPayload.labourEndDate,
    };
    serviceType(payload);
  };

  const updateServices = (initPayload) => {
    const payload = {
      longName: initPayload.longName,
      id: activeService?.id,
      sla: initPayload.sla,
      startTime: initPayload.startTime,
      endTime: initPayload.endTime,
      bookingFeePremium: initPayload.bookingFee,
      bookPremStartDate: initPayload.bookingFeeStartDate,
      bookPremEndDate: initPayload.bookingFeeEndDate,
      escalationTime: initPayload.escalationTime,
      labourPremium: initPayload.labour,
      labPremStartDate: initPayload.labourStartDate,
      labPremEndDate: initPayload.labourEndDate,
    };
    updateServiceType(payload);
  };

  const deleteServices = () => {
    const payload = activeService?.id;
    deleteServiceType(payload);
  };

  const formatMinutes = function (timeStr) {
    // Only take the first part before the first colon, assuming it's minutes
    let minutes = timeStr.split(":")[0];

    // Format minutes by padding with '0' if necessary
    minutes = minutes.padStart(2, "0");

    // Return formatted string in 00:mm format
    return `00:${minutes}`;
  };

  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Service Type</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={showAddServices}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Service Type
          </Link>
        </div>
      </div>{" "}
      <GlobalTable columns={columns} data={serviceData?.data} />
      {openAddServiceModal && (
        <Qualification
          heading="Service Type"
          name="Category"
          isOpen={openAddServiceModal}
          closeModal={() => setOpenAddServiceModal(false)}
          isCreating={isCreating}
          submit={addService}
          lText="Name"
          lPlaceHolder={"Service e.g standard"}
          sPlaceHolder="Enter a short name e.g STD"
          service={true}
          actionText="Add Service"
        />
      )}
      {openUpdateModal && (
        <Qualification
          heading="Update Service Type"
          name="Category"
          placeHolder="Specialization e.g Electrical"
          isOpen={openUpdateModal}
          closeModal={() => setOpenUpdateModal(false)}
          isCreating={isUpdating}
          submit={updateServices}
          lText="Name"
          lPlaceHolder={"Service e.g standard"}
          sPlaceHolder="Enter a short name e.g STD"
          data={activeService}
          service={true}
          actionText="Update Service"
        />
      )}
      {openDeleteModal && (
        <ConfirmDeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          labelText="Delete Service"
          pText="Are you sure you want to delete this service?"
          actionText="Delete"
          onDelete={deleteServices}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default ServicesType;
