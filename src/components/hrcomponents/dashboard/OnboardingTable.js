import { useState } from "react";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Link } from "react-router-dom";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const roles = [
  { id: 0, name: "Franchisee" },
  { id: 1, name: "QA" },
  { id: 2, name: "CCO" },
  { id: 3, name: "Supplier" },
];

const stages = [
  { id: 1, name: "Stage 1" },
  { id: 2, name: "Stage 2" },
];

const territoryTableOption = [{ name: "territoryName", label: "Territory" }];

const CustomToolbar = ({ setStage, setRole, stage, role }) => {
  return (
    <div className="d-inline-flex flex-column flex-sm-row">
      <GlobalSelect
        className="me-1"
        inputFont="13px"
        height="auto"
        options={roles}
        handleChange={(e) => setRole(e.target.value)}
        valueType="string"
        selectValue={role}
      />
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
        to="user-mgmt"
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

const OnboardingTable = ({ data }) => {
  const [stage, setStage] = useState("Stage 1");
  const [role, setRole] = useState("Franchisee");
  const [activeId, setActiveId] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const openApproveModal = (id) => {
    setActiveId(id);
    setShowApproveModal(true);
  };
  const openRejectModal = (id) => {
    setActiveId(id);
    setShowRejectModal(true);
  };

  let filteredResults = data?.filter(
    (datum) => datum.roleAppliedFor.toLowerCase() === role.toLowerCase()
  );

  filteredResults = filteredResults?.filter(
    (result) => result.applicationStage.toLowerCase() === stage.toLowerCase()
  );

  const columns = [
    { name: "applicationDate", label: "Date" },
    { name: "applicantName", label: "Name" },
    ...(role === "Franchisee" ? territoryTableOption : []),
    {
      name: "cvUrl",
      label: "CV",
      options: {
        customBodyRender: (value) => (
          <a href={value} target="_blank">
            View CV
          </a>
        ),
      },
    },
    {
      name: "applicationId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const stage1Actions = [
            {
              id: 0,
              name: "Approve Application",
              action: () => openApproveModal(value),
              disabled: true,
            },
            {
              id: 1,
              name: "Reject Application",
              action: () => openRejectModal(value),
              disabled: true,
            },
          ];

          const stage2Actions = [];

          const actions = stage === "Stage 1" ? stage1Actions : stage2Actions;

          return (
            <div className="text-center">
              <GlobalTableActions id="onboarding-menu" actions={actions} />
            </div>
          );
        },
      },
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={filteredResults}
      title="User Onboarding"
      options={{
        download: false,
        print: false,
        viewColumns: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10],
        customToolbar: () => (
          <CustomToolbar
            setRole={setRole}
            setStage={setStage}
            role={role}
            stage={stage}
          />
        ),
      }}
    />
  );
};

export default OnboardingTable;
