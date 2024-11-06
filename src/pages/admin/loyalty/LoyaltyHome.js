import { Link } from "react-router-dom";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetLoyalties } from "../../../hooks/useQueries/useAdmin";
import LoyaltyTable from "../../../components/admincomponents/loyalty/LoyaltyTable";

const AdminLoyaltyHome = () => {
  const { data: loyaltyData, isLoading } = useGetLoyalties();

  const loyalties = loyaltyData?.loyalties;

  return (
    <>
      <div className="mb-5 d-flex d-column d-md-row justify-content-between align-items-center">
        <PageHeading className="mb-0">Loyalties</PageHeading>
        <Link
          to={`${PATH_ADMIN.createLoyalty}`}
          className="btn"
          style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
          width="max-content"
          px="1em"
        >
          New Loyalty Setting
        </Link>
      </div>

      <LoyaltyTable loyalties={loyalties} isLoading={isLoading} />
    </>
  );
};

export default AdminLoyaltyHome;
