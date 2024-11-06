import { Button } from "@mui/material";
import React from "react";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";

const Notifications = () => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "date", []);

  const columns = [
    {
      name: "date",
      label: "Date",
      option: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "type",
      label: "Type",
    },

    {
      name: "description",
      label: "Description",
    },

    {
      name: "time",
      label: "Time",
      option: {
        customBodyRender: (value, row) => {
          const time = new Date(
            `${new Date(row.rowData[0]).toISOString().split("T")[0]}T${value}`
          );
          formatDistanceToNow(time);
        },
      },
    },

    {
      name: "notificationId",
      label: "----",
      option: {
        customeBodyRender: (value) => {
          <Button onClick={() => console.log(value)}>View Details</Button>;
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Notifications</PageHeading>
      </div>

      <GlobalTable
        columns={columns}
        data={filteredResults}
        options={{
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
    </>
  );
};

export default Notifications;
