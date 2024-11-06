import { Link } from "react-router-dom";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Chip } from "@mui/material";
import Qualification from "../../../components/admincomponents/masterdata/Qualification";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  useActivateOrDeactivatBookingTypeAndServiceType,
  useCreateBookingClass,
  useGetAllFixClasses,
  useUpdateBookingClass,
} from "../../../hooks/useQueries/useAdmin";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";

const BookingClass = () => {
  const [showBookingClass, setShowBookingClass] = useState(false);
  const [showUpdatedClass, setShowUpdatedClass] = useState(false);
  const [showDeleteClass, setShowDeleteClass] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [activeClass, setActiveClass] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //------------------------------------------------------fetching ----------------------------------------------------------------

  const { data: bookingClassData, isLoading } = useGetAllFixClasses();

  //------------------------------------------------------mutation & mutate fn -------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowBookingClass(false);
    setShowUpdatedClass(false);
    setShowDeleteClass(false);
    setShowActivateModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: createFixClass, isLoading: isCreating } =
    useCreateBookingClass(onSuccess, onFailure);
  const { mutate: updateFixClass, isLoading: isUpdating } =
    useUpdateBookingClass(onSuccess, onFailure);
  const { mutate: activateOrDeactivate, isLoading: isActivateOrDeactivate } =
    useActivateOrDeactivatBookingTypeAndServiceType(onSuccess, onFailure);

  //----------------------------------------------------------------modal controller----------------------------------------------
  const getActiveClass = function (id) {
    return bookingClassData?.data?.filter((item) => item.id === id);
  };
  const addShowBookingHandler = () => {
    setShowBookingClass(true);
  };
  const addShowUpdatedHandler = (id) => {
    const active = getActiveClass(id);
    setActiveClass(active[0]);
    setShowUpdatedClass(true);
  };
  const showDeactivateHandler = (id) => {
    const active = getActiveClass(id);
    setActiveClass(active[0]);
    setShowDeleteClass(true);
  };

  const showactivateHandler = (id) => {
    const active = bookingClassData?.data?.find(
      (activeClass) => activeClass.id === id
    );
    setActiveClass(active);
    setShowActivateModal(true);
  };

  const submitBooking = (initPayload) => {
    const payload = {
      description: initPayload.description,
      longName: initPayload.longName,
    };
    createFixClass(payload);
  };
  const updateBookingClass = (initPayload) => {
    const payload = {
      description: initPayload.description,
      longName: initPayload.longName,
      id: activeClass?.id,
    };
    updateFixClass(payload);
  };

  const activate = () => {
    const payload = {
      id: activeClass?.id,
      moduleType: 1,
      actionType: 1,
    };
    activateOrDeactivate(payload);
  };

  const deactivate = () => {
    const payload = {
      id: activeClass?.id,
      moduleType: 1,
      actionType: 2,
    };
    activateOrDeactivate(payload);
  };

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Booking Type",
    },
    {
      name: "description",
      label: "Description",
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
          const bookingClass = bookingClassData?.data.find(
            (item) => item.id === value
          );

          const actions = [
            {
              id: 1,
              name: "Edit",
              action: () => addShowUpdatedHandler(value),
              disabled: bookingClass?.status?.toLowerCase() !== "active",
            },
            {
              id: 2,
              name: "Activate",
              action: () => showactivateHandler(value),
              disabled: bookingClass?.status?.toLowerCase() === "active",
            },
            {
              id: 3,
              name: "Deactivate",
              action: () => showDeactivateHandler(value),
              disabled: bookingClass?.status?.toLowerCase() === "inactive",
            },
          ];

          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Booking Type</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={addShowBookingHandler}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Booking Type
          </Link>
        </div>
      </div>

      <GlobalTable columns={columns} data={bookingClassData?.data} />

      {showBookingClass && (
        <Qualification
          heading="Add Booking Type"
          name="booking"
          placeHolder="Specialization e.g Electrical"
          isOpen={showBookingClass}
          closeModal={() => setShowBookingClass(false)}
          isCreating={isCreating}
          submit={submitBooking}
          lText="Booking Type"
          sText="Short Name"
          lPlaceHolder={"Booking type e.g Installation"}
          sPlaceHolder="Enter a short name e.g Int"
          actionText="Submit"
          description="Description"
        />
      )}
      {showUpdatedClass && (
        <Qualification
          heading="Update Booking Type"
          name="booking"
          placeHolder="Specialization e.g Electrical"
          isOpen={showUpdatedClass}
          closeModal={() => setShowUpdatedClass(false)}
          isCreating={isUpdating}
          submit={updateBookingClass}
          lText="Long Name"
          sText="Short Name"
          lPlaceHolder={"Booking Type e.g Installation"}
          sPlaceHolder="Enter a short name e.g Int"
          actionText="Save"
          booking={activeClass}
          description="Description"
        />
      )}

      {showDeleteClass && (
        <ConfirmDeleteModal
          open={showDeleteClass}
          close={() => setShowDeleteClass(false)}
          labelText="Deactivate Booking Type"
          pText="Are you sure you want to deactivate this booking type?"
          actionText="Deactivate"
          onDelete={deactivate}
          isLoading={isActivateOrDeactivate}
          irreversible={false}
        />
      )}
      {showActivateModal && (
        <ConfirmAcceptModal
          open={showActivateModal}
          close={() => setShowActivateModal(false)}
          labelText="Activate Booking Type"
          pText="Are you sure you want to activate this booking type?"
          actionText="Activate"
          onDelete={activate}
          isLoading={isActivateOrDeactivate}
          irreversible={false}
        />
      )}
    </>
  );
};

export default BookingClass;
