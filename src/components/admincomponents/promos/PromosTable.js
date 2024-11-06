import GlobalTable from "../../globalcomponents/GlobalTable";
import { Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { PATH_ADMIN } from "../../../routes/paths";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { format } from "date-fns";

const PromosTable = ({ promos, isLoading }) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "discountName",
      label: "Discount Name",
    },
    {
      name: "promoStatus",
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
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "expiryDate",
      label: "Expiry Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "promoId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Edit Promo",
              action: () => navigate(`${PATH_ADMIN.editPromos}/${value}`),
              disabled: true,
            },
            {
              id: 1,
              name: "Deactivate Promo",
              action: () => {},
              disabled: true,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="promo" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        title="Promotions"
        data={promos}
        columns={columns}
        options={{
          customToolbar: () => (
            <Link
              to={`${PATH_ADMIN.createPromos}`}
              className="btn"
              style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
              width="max-content"
              px="1em"
            >
              Setup Promotion
            </Link>
          ),
        }}
      />
    </>
  );
};

export default PromosTable;
