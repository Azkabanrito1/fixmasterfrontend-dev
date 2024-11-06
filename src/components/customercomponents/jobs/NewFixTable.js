import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import { format } from "date-fns";

const NewFixTable = ({
  data,
  payBookingFee,
  openAddInfo,
  cancelBooking,
  openEditBooking,
}) => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "dateCreated", data);

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "fixNumber",
      label: "Fix ID",
      options: {
        customBodyRender: (value) => value?.split("-")[1],
      },
    },
    {
      name: "bookingCategory",
      label: "Booking Category",
    },
    {
      name: "dateCreated",
      label: "Booked Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "scheduleDate",
      label: "Requested Fix Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "fixStatus",
      label: "Fix Status",
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const status = data[tableMeta.rowIndex].fixStatus;
          const newActions = [
            {
              id: 0,
              name: "Pay Booking Fee",
              action: () => payBookingFee(value),
            },
            {
              id: 2,
              name: "Edit Booking",
              action: () => openEditBooking(value),
            },
            {
              id: 3,
              name: "Cancel Booking",
              action: () => cancelBooking(value),
            },
          ];
          const requestedActions = [
            {
              id: 1,
              name: "View Additional Info",
              action: () => openAddInfo(value, status),
            },

            {
              id: 2,
              name: "Cancel Booking",
              action: () => cancelBooking(value),
            },
          ];
          const actions =
            status.toLowerCase() === "pending" ? newActions : requestedActions;

          return <GlobalTableActions actions={actions} id="new-fix" />;
        },
      },
    },
  ];

  return (
    <GlobalTable
      data={filteredResults}
      columns={columns}
      options={{
        customToolbar: () => (
          <DateFilterToolbar
            dateQueries={dateQueries}
            setDateQueries={setDateQueries}
          />
        ),
      }}
    />
  );
};

export default NewFixTable;
