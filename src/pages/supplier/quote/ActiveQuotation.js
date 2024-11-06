import { format } from "date-fns";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import ViewActivQuotationDetails from "../../../components/suppliercomponent/quote/ViewActivQuotationDetails";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const ActiveQuotation = () => {
  const [activeSupplyId, setActiveSupplyId] = useState("");
  const [openActiveQuote, setOpenActiveQuote] = useState(false);

  const OpenActiveQuoteHandler = (id) => {
    setActiveSupplyId(id);
    setOpenActiveQuote(true);
  };
  const closeOrderDetailsHandler = () => {
    setOpenActiveQuote(false);
  };
 // data --- api for main data hasnt been provided, use it to replace empty array when available
  const [selectedDate, setSelectedDate] = useState("requestedDate");
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    []
  );
  const columns = [
    {
      name: "s/name",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "requestedDate",
      label: "Requested Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "requestedTime",
      label: "Requested Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "itemName",
      label: "Item Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "responseDate",
      label: "Response Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "responseTime",
      label: "Response Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "supplyId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "View Active Detail",
              action: () => {
                OpenActiveQuoteHandler(value);
              },
            },
          ];
          return <GlobalTableActions actions={actions} id="supplyId" />;
        },
      },
    },
  ];
  return (
    <div>
      <GlobalTable
        title="Active Quotes"
        columns={columns}
        data={filteredResults}
        options={{
          elevation: 0,
          selectableRows: "none",
          rowsPerPage: 20,
          rowsPerPageOptions: [20, 50, 100],
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              firstDate="requestedDate"
              secondDate="responseDate"
            />
          ),
        }}
      />
      {openActiveQuote && (
        <ViewActivQuotationDetails
          isOpen={openActiveQuote}
          closeModal={closeOrderDetailsHandler}
          quotes={{}}
          title="Active Quotes Details"
        />
      )}
    </div>
  );
};

export default ActiveQuotation;
