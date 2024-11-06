import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GroupHeading } from "../../globalcomponents/Utilities";
import { BallBeat } from "react-pure-loaders";
import { PATH_ADMIN } from "../../../routes/paths";
import { targetIntervals } from "../../../utils/selectOptions";
import { Button, Chip } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";

const CustomToolBar = () => {
  const { id, collaborator } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  if (pathname !== PATH_ADMIN.targets(id, collaborator)) {
    return (
      <Button
        onClick={() => navigate(PATH_ADMIN.targets(id, collaborator))}
        className="btn"
        style={{
          backgroundColor: "var(--clr-primary)",
          color: "#fff ",
          textTransform: "none",
        }}
        width="max-content"
        px="1em"
      >
        All Targets
      </Button>
    );
  }

  return (
    <Button
      onClick={() => navigate(PATH_ADMIN.createTarget(id, collaborator))}
      className="btn"
      style={{
        backgroundColor: "var(--clr-primary)",
        color: "#fff ",
        textTransform: "none",
      }}
      width="max-content"
      px="1em"
    >
      New Target
    </Button>
  );
};

const TargetsSection = ({ targets, isLoading }) => {
  const { id, collaborator } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    { name: "roleName", label: "Role" },
    { name: "name", label: "Name" },
    {
      name: "interval",
      label: "Interval",
      options: {
        customBodyRender: (value) => {
          const intervalArray = targetIntervals.filter(
            (interval) => interval.id === value
          );

          return intervalArray[0]?.name;
        },
      },
    },
    { name: "type", label: "Type" },
    {
      name: "value",
      label: "Value",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Edit Target",
              action: () =>
                navigate(`${PATH_ADMIN.editTarget(id, collaborator)}/${value}`),
            },
            {
              id: 1,
              name: "Deactivate Target",
              action: () => console.log("Deactivate Target"),
              disabled: true,
            },
          ];

          return <GlobalTableActions actions={actions} id="targets" />;
        },
      },
    },
  ];

  return (
    <section aria-labelledby="targets" className="mb-5">
      {isLoading && (
        <div className="text-center">
          <BallBeat loading={isLoading} color="var(--clr-primary)" />
        </div>
      )}

      <GlobalTable
        title="Targets"
        columns={columns}
        data={targets}
        options={{
          rowsPerPage:
            pathname !== PATH_ADMIN.targets(id, collaborator) ? 5 : 20,
          rowsPerPageOptions:
            pathname !== PATH_ADMIN.targets(id, collaborator)
              ? [5, 10]
              : [20, 50, 100],
          customToolbar: () => <CustomToolBar />,
        }}
      />

      <div className="text-center mt-3">
        <Button
          onClick={() => navigate(PATH_ADMIN.createTarget(id, collaborator))}
          className="btn"
          style={{
            backgroundColor: "var(--clr-primary)",
            color: "#fff ",
            textTransform: "none",
          }}
          width="max-content"
          px="1em"
        >
          New Target
        </Button>
      </div>
    </section>
  );
};

export default TargetsSection;
