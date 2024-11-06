import { useNavigate } from "react-router-dom";
import TotalSupply from "./TotalSupply";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import CustomToolbarBtn from "../../globalcomponents/CustomToolbarBtn";
import { format } from "date-fns";
import { Chip } from "@mui/material";

const Order = ({ newSpareRequests, isLoading }) => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    { name: "itemName", label: "Item Name" },
    { name: "itemCategoryName", label: "Category" },
    {
      name: "requestDate",
      label: "Quotation Date",
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
      name: "quantity",
      label: "Quantity",
      options: {
        customBodyRender: (value) => <div className="text-center">{value}</div>,
      },
    },
    {
      name: "requestStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value.toLowerCase() === "quotes submitted"
                ? "Quotes Submitted"
                : ""
            }
            color={
              value.toLowerCase() === "quotes submitted" ? "warning" : "error"
            }
          />
        ),
      },
    },
  ];

  return (
    <>
      {isLoading && <GlobalBallBeat loading={isLoading} />}

      <GlobalTable
        data={newSpareRequests}
        columns={columns}
        title={"New Requests"}
        options={{
          customToolbar: () => (
            <CustomToolbarBtn action={() => navigate("/supplier/new-quote")} />
          ),
          rowsPerPage: 5,
          rowsPerPageOptions: [5],
        }}
      />
    </>
  );
};

export default Order;
