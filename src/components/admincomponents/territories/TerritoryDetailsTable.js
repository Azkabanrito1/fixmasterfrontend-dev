import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { format } from "date-fns";

const TerritoryDetailsTable = ({ details, isLoading }) => {
  const columns = [
    { name: "sn", label: "S/N" },
    { name: "countryName", label: "Country" },
    { name: "stateName", label: "State" },
    { name: "lgaName", label: "LGA" },
    { name: "cityName", label: "City" },
    {
      name: "createdAt",
      label: "Date Added",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
  ];

  return (
    <>
      <h3 className="fs-5 mb-3 text-bold">Cities</h3>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <GlobalTable
          data={details}
          columns={columns}
          options={{
            displayToolbar: false,
          }}
        />
      )}
    </>
  );
};

export default TerritoryDetailsTable;
