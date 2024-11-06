import { useState } from "react";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { GroupHeading } from "../../globalcomponents/Utilities";
import AddBookingType from "./modals/AddBookingTypes";
import { useAddClassToPlan } from "../../../hooks/useQueries/useAdmin";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const BookingTypeSection = ({ bookingTypes, isLoading, subId }) => {
  // service type is also the same thing as fix class
  const [showAddServiceType, setShowAddServiceType] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onAddSuccess = () => {
    setShowAddServiceType(false);
    enqueueSnackbar("Service type added successfully", { variant: "success" });
  };
  const onAddFailure = (error) => {
    enqueueSnackbar(error.message || error, { variant: "error" });
  };
  const { mutate: addServiceType, isLoading: isSubmitting } = useAddClassToPlan(
    subId,
    onAddSuccess,
    onAddFailure
  );

  const initValues = bookingTypes?.map((type) => String(type.id));

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_value, MUIDataTableMeta) =>
          MUIDataTableMeta.rowIndex + 1,
      },
    },
    { name: "longName", label: "Long Name" },
    { name: "shortName", label: "Short Name" },
  ];

  const CustomToolBar = () => (
    <GlobalBtn
      width="max-content"
      px="1rem"
      py="0.7rem"
      display="inline-block"
      onClick={() => setShowAddServiceType(true)}
    >
      Add Booking Type
    </GlobalBtn>
  );

  return (
    <div className="mb-4">
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          title="Booking Types"
          columns={columns}
          data={bookingTypes}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            pagination: false,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
            customToolbar: () => <CustomToolBar />,
          }}
        />
      )}

      {showAddServiceType && (
        <AddBookingType
          isOpen={showAddServiceType}
          closeModal={() => setShowAddServiceType(false)}
          initValues={initValues}
          addServiceType={addServiceType}
          subId={subId}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default BookingTypeSection;
