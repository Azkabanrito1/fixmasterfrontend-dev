import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { PATH_ADMIN } from "../../../routes/paths";
import { Link, useNavigate } from "react-router-dom";

const WarrantyTable = ({ warranties, isLoading }) => {
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
      name: "warrantyName",
      label: "Name",
    },
    {
      name: "warrantyType",
      label: "Type",
    },
    {
      name: "maxNoOfDays",
      label: "Max No of Days",
      options: {
        customBodyRender: (value) => <div className="text-center">{value}</div>,
      },
    },
    {
      name: "maxNoOfClaims",
      label: "Max Claims",
      options: {
        customBodyRender: (value) => <div className="text-center">{value}</div>,
      },
    },
    {
      name: "warrantyFee",
      label: "Fee",
      options: {
        customBodyRender: (value) => <div className="text-center">{value}</div>,
      },
    },
    {
      name: "warrantyId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View Info",
              disabled: true,
              action: () => navigate(`${PATH_ADMIN.editPromos}/${value}`),
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

      {!isLoading && (
        <GlobalTable
          data={warranties}
          columns={columns}
          title="Warranties"
          options={{
            customToolbar: () => (
              <Link
                to={`${PATH_ADMIN.createWarranty}`}
                className="btn"
                style={{
                  backgroundColor: "var(--clr-primary)",
                  color: "#fff ",
                }}
                width="max-content"
                px="1em"
              >
                Add Warranty
              </Link>
            ),
          }}
        />
      )}
    </>
  );
};

export default WarrantyTable;
