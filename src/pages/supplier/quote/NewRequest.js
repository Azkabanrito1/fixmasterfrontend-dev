import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useGetSupplyRfq } from "../../../hooks/useQueries/useJobs";
import QuotationModal from "../../../components/suppliercomponent/quote/modal/QuotationModal";
import { useState } from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import { Chip } from "@mui/material";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const NewRequest = () => {
  const [openQuotation, setOpenQuotation] = useState(false);
  const [activeSupplyId, setActiveSupplyId] = useState("");
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const openQuotationhandler = (id) => {
    setActiveSupplyId(id);
    setOpenQuotation(true);
  };
  const closeQuotationhandler = () => {
    setOpenQuotation(false);
  };

  const openOrderDetailsHandler = (id) => {
    setActiveSupplyId(id);
    setOpenOrderDetails(true);
  };
  const closeOrderDetailsHandler = () => {
    setOpenOrderDetails(false);
  };
  //------------------------------------------data fetching------------------------------------------
  const { data: suppliesData, isLoading } = useGetSupplyRfq();
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "requestDate",
    suppliesData?.data
  );

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "requestId",
      label: "Request ID",
    },
    {
      name: "requestDate",
      label: "Request Date",
    },

    {
      name: "itemName",
      label: "Item Name",
    },
    {
      name: "itemCategoryName",
      label: "Category",
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        customBodyRender: (value) => <div className="text-center">{value}</div>,
      },
    },
    {
      name: "distanceToFixLocation",
      label: "Distance to Me",
      options: {
        customBodyRender: (value) => (
          <div className="text-center">
            {`${new Intl.NumberFormat(navigator.language).format(
              Math.trunc(value)
            )}m`}
          </div>
        ),
      },
    },
    {
      name: "requestStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={
              value.toLowerCase() === "quotes submitted" ? "warning" : "error"
            }
          />
        ),
      },
    },
    {
      name: "requestId",
      label: "Action",

      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "View Other Details",
              action: () => {
                openOrderDetailsHandler(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "Submit Quote",
              action: () => {
                openQuotationhandler(value);
              },
              disabled: false,
            },
            {
              id: 3,
              name: "Contact CSE",
              action: () => {
                console.log(value);
              },
              disabled: true,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="requestId" />
            </div>
          );
        },
      },
    },
  ];
  return (
    <>
      <div>
        <PageHeading>New Requests</PageHeading>
      </div>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        data={filteredResults}
        columns={columns}
        options={{
          rowsPerPageOptions: [5, 10, 20, 50],
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
      {openQuotation && (
        <QuotationModal
          isOpen={openQuotation}
          closeModal={closeQuotationhandler}
          activeSupplyId={activeSupplyId}
        />
      )}

      {openOrderDetails && (
        <OrderDetails
          isOpen={openOrderDetails}
          closeModal={closeOrderDetailsHandler}
          order={suppliesData?.data}
          title="Order Details"
          activeId={activeSupplyId}
        />
      )}
    </>
  );
};

export default NewRequest;
