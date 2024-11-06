import styled from "styled-components";
import GlobalTable from "../../../../globalcomponents/GlobalTable";

const SupplyIndex = ({ data }) => {
  const columns = [
    {
      name: "requestId",
      label: "Request Id",
    },
    {
      name: "partName",
      label: "Item Name",
    },
    {
      name: "unitOfMeasurement",
      label: "Units of Measurement",
    },
    {
      name: "requestedQuantity",
      label: "Quantity",
    },
    {
      name: "requestStatus",
      label: "Status",
    },
  ];

  return (
    <div className="mt-3">
      <GlobalTable
        title="Supply Requests"
        columns={columns}
        data={data?.spareRequests}
        options={{
          elevation: 0,
          filter: false,
          search: false,
          viewColumns: false,
          print: false,
          download: false,
          selectableRows: "none",
          rowsPerPage: 5,
          rowsPerPageOptions: [5, 10, 15],
        }}
      />
    </div>
  );
};

export default SupplyIndex;

const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;

  h2,
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
