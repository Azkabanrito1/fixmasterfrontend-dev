import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import { format } from "date-fns";
import { PATH_CUSTOMER } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";

const CustomerQuotationsTable = ({
  data,
  acceptQuoteAction,
  rejectQuoteAction,
}) => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "scheduleDate", data);
  const navigate = useNavigate();

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "jobNumber",
      label: "Fix ID",
    },
    {
      name: "quoteId",
      label: "Quote ID",
    },
    {
      name: "fixDate",
      label: "Fix Date",
    },
    {
      name: "amountDue",
      label: "Amount Due",
      options: {
        customBodyRender: (value) => <span>&#8358;{value}</span>,
      },
    },
    {
      name: "jobNumber",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const action = [
            {
              id: 0,
              name: "View Quotation",
              action: () => navigate(PATH_CUSTOMER.quoteForFix(value)),
            },
            {
              id: 1,
              name: "Accept Quotation",
              action: () => acceptQuoteAction(value, true),
            },
            {
              id: 2,
              name: "Reject Quotation",
              action: () => rejectQuoteAction(value, true),
            },
          ];

          return <GlobalTableActions actions={action} id="ongoing-jobs" />;
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

export default CustomerQuotationsTable;
