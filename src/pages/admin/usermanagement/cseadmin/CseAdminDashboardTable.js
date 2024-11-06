import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
// import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import { Chip } from "@mui/material";
// import { useGetUsersByCategory } from "../../../../hooks/useQueries/useIdentity";
import {
  useGetAllCSEApplicants,
  useGetCSEFifthStageApplicants,
  useGetCSESecondApplicants,
  useGetCSESecondMcq,
  useGetCSEThirdStageApplicants,
} from "../../../../hooks/useQueries/useOnboarding";
import format from "date-fns/format";

const stages = [
  { id: 1, name: "Stage 1" },
  { id: 2, name: "Stage 2" },
  { id: 3, name: "Stage 3" },
  { id: 4, name: "Stage 4" },
  { id: 5, name: "Stage 5" },
];

const CustomToolbar = ({ stage, setStage }) => {
  const urlPath = window.location.pathname;
  const linkTo = urlPath.includes("dashboard")
    ? urlPath.replace("dashboard", "cse-onboarding")
    : "cse-onboarding";
  return (
    <div className="d-inline-flex flex-column flex-sm-row">
      <GlobalSelect
        inputFont="13px"
        className="me-1"
        height="auto"
        valueType="string"
        options={stages}
        handleChange={(e) => setStage(e.target.value)}
        selectValue={stage}
      />
      <Link
        to={linkTo}
        style={{
          padding: "8px 14px",
          backgroundColor: "var(--clr-primary)",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        View All
      </Link>
    </div>
  );
};

const CseAdminDashboardUserTable = ({ data, customerType }) => {
  const [cseStage, setCseStage] = useState("Stage 1");
  const { data: stage1Applicants } = useGetAllCSEApplicants();
  const { data: stage2Applicants } = useGetCSESecondApplicants();
  const { data: stage3Applicants } = useGetCSEThirdStageApplicants();
  const { data: stage4Applicants } = useGetCSESecondMcq();
  const { data: stage5Applicants, isLoading } = useGetCSEFifthStageApplicants();

  const onboardingData =
    cseStage === "Stage 1"
      ? stage1Applicants?.data
      : cseStage === "Stage 2"
      ? stage2Applicants?.data
      : cseStage === "Stage 3"
      ? stage3Applicants?.data
      : cseStage === "Stage 4"
      ? stage4Applicants?.data
      : cseStage === "Stage 5"
      ? stage5Applicants?.data
      : [];

  const column1 = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "dateCreated",
      label: "Date Applied",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    {
      name: "cvAttachment",
      label: "CV",
      options: {
        customBodyRender: (value) => (
          <a href={value} target="_blank">
            View CV
          </a>
        ),
      },
    },
  ];
  const column2 = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "examScore",
      label: "Exam Score",
    },
    {
      name: "grade",
      label: "Grade",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value?.toLowerCase() === "passed" ? "success" : "error"}
          />
        ),
      },
    },
  ];
  const column3 = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "interviewDate",
      label: "Interview Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
  ];
  const column4 = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    {
      name: "numberOfFoldersToPass",
      label: "Total Folders",
    },
  ];
  const column5 = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "interviewDate",
      label: "Interview Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    {
      name: "interviewStatus",
      label: "Interview Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value.toLowerCase() === "pending approval"
                ? "Pending approval"
                : value.toLowerCase() === "accepted"
                ? "Accepted"
                : value.toLowerCase() === "rejected"
                ? "Rejected"
                : null
            }
            color={
              value?.toLowerCase() === "accepted"
                ? "success"
                : value.toLowerCase() === "pending approval"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
  ];

  const onboardingColumn =
    cseStage === "Stage 1"
      ? column1
      : cseStage === "Stage 2"
      ? column2
      : cseStage === "Stage 3"
      ? column3
      : cseStage === "Stage 4"
      ? column4
      : cseStage === "Stage 5"
      ? column5
      : [];

  return (
    <GlobalTable
      columns={onboardingColumn}
      data={onboardingData}
      title="Cse Onboarding"
      options={{
        download: false,
        print: false,
        viewColumns: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10],
        customToolbar: () => (
          <CustomToolbar setStage={setCseStage} stage={cseStage} />
        ),
      }}
    />
  );
};

export default CseAdminDashboardUserTable;
