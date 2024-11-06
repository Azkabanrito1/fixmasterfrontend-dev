import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { format } from "date-fns";
import { Chip } from "@mui/material";

const AddedCities = ({
  columnNames = {},
  cities = [],
  title,
  removeCity,
  deactivateCity,
  editCityDates,
  isSelected,
}) => {
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: columnNames.state,
      label: "State Name",
    },
    {
      name: columnNames.lga,
      label: "LGA Name",
    },
    {
      name: columnNames.city,
      label: "City Name",
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
      name: "endDate",
      label: "End Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "_",
      },
    },
    {
      name: "cityStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value?.toLowerCase() === "expired" ? "Expired" : "Active"}
            color={value?.toLowerCase() === "expired" ? "warning" : "success"}
          />
        ),
      },
    },
    {
      name: "cityId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const city = cities[tableMeta.rowIndex];
          const actionsForSelectedCity = [
            {
              id: 1,
              name: "Deactivate city",
              action: () => deactivateCity(city.recId),
            },
            {
              id: 3,
              name: "Edit city end date",
              action: () => editCityDates(city),
            },
          ];

          const actionsForNewCity = [
            {
              id: 2,
              name: "Remove city",
              action: () => removeCity(value),
            },
          ];

          const actions = isSelected
            ? actionsForSelectedCity
            : actionsForNewCity;

          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="add-cities" />
            </div>
          );
        },
      },
    },
  ];

  return <GlobalTable data={cities} columns={columns} title={title} />;
};

export default AddedCities;
