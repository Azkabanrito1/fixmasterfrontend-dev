import React from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import useDateQueries from "../../../hooks/useDateQueries";

const WarrantyJobs = () => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableIndex) => tableIndex.rowIndex + 1,
      },
    },
    {
      name: "fixNumber",
      label: "Job Id",
    },

    {
      name: "jobType",
      label: "Booking Type",
    },
    {
      name: "territory",
      label: "Territory",
    },
    { name: "dateCreated", label: "Date Posted" },
    {
      name: "jobId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 2,
              name: "Accept Job",
              action: () => {
                console.log(value);
              },
              disabled: false,
            },
            {
              id: 3,
              name: "View Details",
              action: () => {
                console.log(value);
              },
              disabled: false,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="jobId" />
            </div>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Warranty Jobs</PageHeading>
      </div>
      <div className="text-center">
        {/* <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" /> */}
      </div>
      <GlobalTable
        columns={columns}
        data={[]}
        options={{
          elevation: 0,
          selectableRows: "none",
          rowsPerPage: 20,
          rowsPerPageOptions: [20, 50, 100],
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

export default WarrantyJobs;
