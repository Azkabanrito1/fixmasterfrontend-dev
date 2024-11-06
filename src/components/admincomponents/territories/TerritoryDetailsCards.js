import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const TerritoryDetailsCards = ({ territoryData }) => {
  const { id } = useParams();

  return (
    <>
      <h3 className="fs-5 mb-3 mt-4 text-bold">Basic Info</h3>
      <GridInfoCards>
        <div>
          <h4 className="orange text-bold fs-6">Managed by</h4>
          <span>{territoryData?.managerName || "N/A"}</span>
        </div>
        <Link to={`/admin/user-mgmt/customer?territoryId=${id}`}>
          <h4 className="orange text-bold fs-6">Total Customer</h4>
          <span>{territoryData?.totalCustomerCount}</span>
        </Link>
        <Link to={`/admin/user-mgmt/cse/managed/active?territoryId=${id}`}>
          <h4 className="orange text-bold fs-6">Total CSE</h4>
          <span>{territoryData?.totalCSECount}</span>
        </Link>
        <Link
          to={`/admin/user-mgmt/technician/managed/active?territoryId=${id}`}
        >
          <h4 className="orange text-bold fs-6">Total Technician</h4>
          <span>{territoryData?.totalTechnicianCount}</span>
        </Link>
        <Link to={`/admin/user-mgmt/supplier/managed/active?territoryId=${id}`}>
          <h4 className="orange text-bold fs-6">Total Supplier</h4>
          <span>{territoryData?.totalSupplierCount}</span>
        </Link>
      </GridInfoCards>
    </>
  );
};

export default TerritoryDetailsCards;

const GridInfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;

  & > div,
  & > a {
    padding: 0.7rem 1.4rem;
    border-radius: 1em;
    box-shadow: 0px 1px 4px 0px #00000040;
    background-color: #fff;
    text-decoration: none;
    color: inherit;
  }
`;
