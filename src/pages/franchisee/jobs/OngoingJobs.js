import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { format } from "date-fns";
import FixDetails from "../../../components/customercomponents/jobs/modals/FixDetails";
import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { jobTypes } from "../../../utils/selectOptions";

const OngoingJobs = () => {
  const { data: ongoingJobsData } = useGetCollaboratorJobs(jobTypes.ongoing);
  const [viewJobDetails, setViewJobDetails] = useState(false);
  const [activeId, setActiveId] = useState(false);

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
                  ongoingJobsData?.data?.[meta.rowIndex]?.scheduleTime
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
                setActiveId(value);
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
        <PageHeading>Ongoing Jobs</PageHeading>
      </div>

      <div className="text-center">
        <GlobalBallBeat color="var(--clr-primary)" />
      </div>
      <GlobalTable columns={columns} data={ongoingJobsData?.data} />

      {viewJobDetails && (
        <FixDetails
          isOpen={viewJobDetails}
          closeModal={() => setViewJobDetails(false)}
          fixId={activeId}
        />
      )}
    </>
  );
};

export default OngoingJobs;
