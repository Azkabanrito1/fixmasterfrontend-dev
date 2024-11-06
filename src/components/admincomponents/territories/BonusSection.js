import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BallBeat } from "react-pure-loaders";
import { PATH_ADMIN } from "../../../routes/paths";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { targetIntervals } from "../../../utils/selectOptions";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import { Button, Chip } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const CustomToolBar = () => {
  const { id, collaborator } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  if (pathname !== PATH_ADMIN.bonuses(id, collaborator)) {
    return (
      <Button
        onClick={() => navigate(PATH_ADMIN.bonuses(id, collaborator))}
        className="btn"
        style={{
          backgroundColor: "var(--clr-primary)",
          color: "#fff ",
          textTransform: "none",
        }}
        width="max-content"
        px="1em"
      >
        All Bonuses
      </Button>
    );
  }

  return (
    <Button
      onClick={() => navigate(PATH_ADMIN.createBonus(id, collaborator))}
      className="btn"
      style={{
        backgroundColor: "var(--clr-primary)",
        color: "#fff ",
        textTransform: "none",
      }}
      width="max-content"
      px="1em"
    >
      New Bonus
    </Button>
  );
};

const BonusSection = ({ bonuses, isLoading }) => {
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
        customBodyRender: (_value, MUIDataTableMeta) => {
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
              name: "Edit Bonus",
              action: () =>
                navigate(`${PATH_ADMIN.editBonus(id, collaborator)}/${value}`),
            },
            {
              id: 1,
              name: "Deactivate Bonus",
              action: () => console.log("Deactivate Bonus"),
              disabled: true,
            },
          ];

          return <GlobalTableActions actions={actions} id="bonuses" />;
        },
      },
    },
  ];

  return (
    <section aria-labelledby="bonuses" className="mb-5">
      {isLoading && (
        <div className="text-center">
          <BallBeat loading={isLoading} color="var(--clr-primary)" />
        </div>
      )}

      <GlobalTable
        title="Bonus"
        columns={columns}
        data={bonuses}
        options={{
          rowsPerPage:
            pathname !== PATH_ADMIN.bonuses(id, collaborator) ? 5 : 20,
          rowsPerPageOptions:
            pathname !== PATH_ADMIN.bonuses(id, collaborator)
              ? [5, 10]
              : [20, 50, 100],
          customToolbar: () => <CustomToolBar />,
        }}
      />

      <div className="mt-3 text-center">
        <Button
          onClick={() => navigate(PATH_ADMIN.createBonus(id, collaborator))}
          className="btn"
          style={{
            backgroundColor: "var(--clr-primary)",
            color: "#fff ",
            textTransform: "none",
          }}
          width="max-content"
          px="1em"
        >
          New Bonus
        </Button>
      </div>
    </section>
  );
};

export default BonusSection;
