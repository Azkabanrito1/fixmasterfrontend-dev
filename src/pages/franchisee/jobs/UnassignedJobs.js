import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useAssignJobToSelf,
  useGetCollaboratorJobs,
} from "../../../hooks/useQueries/useJobs";
import { useState } from "react";
import AssignFixToCse from "../../../components/franchiseecomponents/csemanagement/modals/AssignFixToCse";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import FixDetails from "../../../components/customercomponents/jobs/modals/FixDetails";
import { jobTypes } from "../../../utils/selectOptions";

const UnassignedJobs = () => {
  const [openAssignJobModal, setOpenAssignJobModal] = useState(false);
  const [viewJobDetails, setViewJobDetails] = useState(false);
  const [activeId, setActiveId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const openAssignEqpModalHandler = (fixId) => {
    setActiveId(fixId);
    setOpenAssignJobModal(true);
  };
  const closeAssignEqpModalHandler = () => {
    setOpenAssignJobModal(false);
  };
  //----------------------------------data fetching------------------------------
  const { data: unassignedJobsData, isLoading } = useGetCollaboratorJobs(
    jobTypes.unAssigned
  );

  //--------------------------------------------mutatefn----------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: assignJobsToSelf } = useAssignJobToSelf(
    2,
    onSuccess,
    onFailure
  );

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "fixId",
      label: "Fix ID",
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
                  unassignedJobsData?.data?.[meta.rowIndex]?.scheduleTime
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
          const payload = {
            fixId: value,
          };
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
            {
              id: 1,
              name: "Assign to CSE",
              action: () => {
                setActiveId(value);
                openAssignEqpModalHandler(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "Assign to Self",
              action: () => {
                setActiveId(value);
                assignJobsToSelf(payload);
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
        <PageHeading>Unassigned Jobs</PageHeading>
      </div>
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      <GlobalTable
        columns={columns}
        data={unassignedJobsData?.data || []}
        options={{ selection: "none" }}
      />
      {openAssignJobModal && (
        <AssignFixToCse
          isOpen={openAssignJobModal}
          closeModal={closeAssignEqpModalHandler}
          fixId={activeId}
        />
      )}

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

export default UnassignedJobs;
