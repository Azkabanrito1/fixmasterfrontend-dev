import { format } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import JobDetails from "../../../components/franchiseecomponents/jobsmanagement/modals/JobDetails";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useGetFranchiseAndCseOngoingJobs,
  useGetWarrantyAndCompletedJobsForCseAndFranchise,
} from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import JobsDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/completed/JobsDetails";
import Cards from "../../../components/csecomponent/cse/dashboardComponent/jobs/ongoings/Cards";

const MyJobs = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [openWarrantyJobModal, setOpenWarrantyJobModal] = useState(false);
  const [fixId, setFixId] = useState("");

  const openJobDetails = () => {
    setOpenJobModal(true);
  };
  const closeJobDetails = () => {
    setOpenJobModal(false);
  };

  const openWarrantyJob = (id) => {
    setOpenWarrantyJobModal(true);
    setFixId(id);
  };
  const closeWarrantyJob = (id) => {
    setOpenWarrantyJobModal(false);
    setFixId(id);
  };

  //---------------------------------------data fetching--------------------------------
  const completed = "Completed";
  const { data: completedJobs, isLoading } =
    useGetWarrantyAndCompletedJobsForCseAndFranchise(completed);

  const { data: ongoingJobs, isLoading: loadingOngoingJobs } =
    useGetFranchiseAndCseOngoingJobs();
  const warranty = "Warranty";
  const { data: warrantyJobs, isLoading: warrantyLoading } =
    useGetWarrantyAndCompletedJobsForCseAndFranchise(warranty);

  const columns = [
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
      name: "bookingType",
      label: "Job Type",
    },
    {
      name: "id",
      label: "------",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Add Services",
              action: () => {
                console.log(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "View Services",
              action: () => console.log(true),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

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
                openWarrantyJob(value);
              }}
            >
              View details
            </a>
          );
        },
      },
    },
  ];

  const CustomToolbar = ({ action }) => (
    <GlobalBtn
      height="auto"
      width="max-width"
      py="8px"
      px="20px"
      fs="16px"
      fw="600"
      onClick={action}
      className="d-inline"
    >
      View All
    </GlobalBtn>
  );

  return (
    <>
      <div className="mb-5">
        <PageHeading>My Jobs</PageHeading>
        <BackBtn />
      </div>

      <OngoingJobsContainer className="mb-5">
        <AssignmentHeader>
          <h2 className="fw-bold">Ongoing Jobs</h2>
        </AssignmentHeader>

        <GlobalBallBeat loading={loadingOngoingJobs} />

        <div>
          {ongoingJobs?.data?.map((job, index) => {
            return <Cards key={index} job={job} />;
          })}
        </div>

        {!ongoingJobs?.data?.length && !loadingOngoingJobs && (
          <p className="text-center">There are no ongoing jobs</p>
        )}
      </OngoingJobsContainer>

      <AssignmentContainer className="mb-5">
        <div>
          <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
        </div>

        <GlobalTable
          columns={columns}
          data={completedJobs?.data}
          title="Completed Jobs"
          options={{
            selection: "none",
            rowsPerPage: 5,
            rowsPerPageOptions: [5],
            customToolbar: () => <CustomToolbar action={openJobDetails} />,
          }}
        />
      </AssignmentContainer>

      <AssignmentContainer>
        {!warrantyLoading && (
          <GlobalTable
            title={"Warranty Jobs"}
            columns={warrantyJobsColumns}
            data={warrantyJobs?.data}
            options={{
              selectableRows: "none",
              rowsPerPage: 5,
              rowsPerPageOptions: [5],
              customToolbar: () => <CustomToolbar action={openJobDetails} />,
            }}
          />
        )}
      </AssignmentContainer>

      {openJobDetails && (
        <JobDetails
          isOpen={openJobModal}
          closeModal={closeJobDetails}
          title="Completed Jobs"
          jobs={completedJobs?.data}
        />
      )}

      {openWarrantyJob && (
        <JobsDetails
          isOpen={openWarrantyJobModal}
          closeModal={closeWarrantyJob}
          title="Warranty Jobs"
          jobId={fixId}
          jobs={warrantyJobs?.data}
        />
      )}
    </>
  );
};

export default MyJobs;

const OngoingJobsContainer = styled(AssignmentContainer)`
  padding: 1rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.2rem;
  }
`;
