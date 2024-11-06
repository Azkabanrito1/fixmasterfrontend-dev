import {
  PageHeading,
  BackBtn,
  NoData,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { format } from "date-fns";
import {
  useGetCollaboratorJobs,
  useGetWarrantyAndCompletedJobsForCseAndFranchise,
} from "../../../hooks/useQueries/useJobs";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import JobsDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/completed/JobsDetails";
import { useState } from "react";
import { jobTypes } from "../../../utils/selectOptions";

const Warranty = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");

  const warranty = "Warranty";
  const { data: warrantyJobs, isLoading: isLoading } =
    useGetWarrantyAndCompletedJobsForCseAndFranchise(warranty);

  const openJobDetails = (id) => {
    setOpenJobModal(true);
    setFixId(id);
  };
  const closeJobDetails = (id) => {
    setOpenJobModal(false);
    setFixId(id);
  };
  const warrantyJobsColumns = [
    {
      name: "fixNumber",
      label: "Fix ID",
      options: {
        customBodyRender: (value) => value?.split("-")[1],
      },
    },
    {
      name: "bookingClass",
      label: "Job Class",
    },
    {
      name: "bookingCategory",
      label: "Job Category",
    },
    {
      name: "bookingType",
      label: "Job Type",
    },
    {
      name: "dateCreated",
      label: "Date Booked",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "scheduleDate",
      label: "Date Accepted",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          return (
            <a
              href={"#"}
              className="text-danger fw-bold"
              id="fixId"
              style={{ cursor: "pointer" }}
              onClick={() => {
                openJobDetails(value);
              }}
            >
              View details
            </a>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Warranty Claims</PageHeading>
      </div>

      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      {!isLoading && (
        <GlobalTable
          columns={warrantyJobsColumns}
          data={warrantyJobs?.data}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}

      {openJobModal && (
        <JobsDetails
          isOpen={openJobModal}
          closeModal={closeJobDetails}
          title="Warranty Jobs"
          jobId={fixId}
          jobs={warrantyJobs?.data}
        />
      )}
    </>
  );
};

export default Warranty;
