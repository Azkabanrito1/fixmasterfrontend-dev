import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import { format } from "date-fns";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import FixDetails from "../../../components/customercomponents/jobs/modals/FixDetails";
import { jobTypes } from "../../../utils/selectOptions";

const CompletedJobs = () => {
  const [viewJobDetails, setViewJobDetails] = useState(false);
  const [fixId, setFixId] = useState("");
  const { data: completedJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.completed
  );

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
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
      name: "fixStatus",
      label: "Fix Status",
    },
    {
      name: "dateCreated",
      label: "Booked Date",
      options: {
        customBodyRender: (value) =>
          !!value ? format(new Date(value), "dd-MM-yyyy hh:mm a") : "N/A",
      },
    },
    {
      name: "scheduleDate",
      label: "Scheduled Fix Date",
      options: {
        customBodyRender: (value, meta) => {
          if (!!value) {
            return format(
              new Date(
                `${value.slice(0, 10)}T${
                  completedJobs?.data?.[meta.rowIndex]?.scheduleTime
                }`
              ),
              "dd-MM-yyyy hh:mm a"
            );
          } else {
            return "N/A";
          }
        },
      },
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View Fix Details",
              action: () => {
                setFixId(value);
                setViewJobDetails(true);
              },
              disabled: false,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="fixId" />
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
        <PageHeading>Completed Jobs</PageHeading>
      </div>

      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={completedJobs?.data}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}

      {viewJobDetails && (
        <FixDetails
          isOpen={viewJobDetails}
          closeModal={() => setViewJobDetails(false)}
          fixId={fixId}
        />
      )}
    </>
  );
};

export default CompletedJobs;
