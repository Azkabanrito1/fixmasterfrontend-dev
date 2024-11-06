import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { Chip } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { format } from "date-fns";

const UpliftSection = ({ uplifts, isLoading }) => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    { name: "serviceName", label: "Service Name" },
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
      name: "dateCreated",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View rate uplift",
              action: () => navigate(`${PATH_ADMIN.createUplift}/${value}`),
              disabled: true,
            },
            {
              id: 1,
              name: "Edit rate uplift",
              action: () => navigate(`${PATH_ADMIN.createUplift}/${value}`),
              disabled: true,
            },
          ];

          return <GlobalTableActions actions={actions} id="rate-uplift" />;
        },
      },
    },
  ];

  const CustomToolbar = () => (
    <Link
      to={`${PATH_ADMIN.createUplift}/${id}`}
      className="btn ms-2"
      style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
      width="max-content"
      px="1em"
    >
      Create New Uplift
    </Link>
  );

  return (
    <section aria-labelledby="uplifts" className="mb-5">
      {<GlobalBallBeat loading={isLoading} />}

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={uplifts}
          options={{ customToolbar: () => <CustomToolbar /> }}
        />
      )}
    </section>
  );
};

export default UpliftSection;
