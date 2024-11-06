import { Stack } from "@mui/material";
import useLoginDetails from "../../../hooks/useLoginDetails";

const DashboardAccountStats = ({ accountData, supplier = false }) => {
  const { role } = useLoginDetails();

  const { dateLoggedIn } = useLoginDetails();

  if (role.toLowerCase() === "customer") {
    return (
      <div className="stats">
        <div>
          <h4>Jobs Booked: </h4>
          <span>{accountData?.totalBookedJobs}</span>
        </div>
        <div>
          <h4>Subscription: </h4>
          {accountData?.accountSubScription?.length && (
            <span>{accountData?.accountSubScription[0].shortName}</span>
          )}
        </div>
        <div>
          <h4>Last Login: </h4>
          <span>
            {new Date(dateLoggedIn).toLocaleDateString()},{" "}
            {new Date(dateLoggedIn).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  } else if (supplier && !role.toLowerCase().includes("admin")) {
    return (
      <div className="stats mt-1">
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Supplies Fulfilled: </h4>
          <span>
            {accountData?.totalJobCount || accountData?.allCompletedSupplies}
          </span>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Referrals: </h4>
          <span>{accountData?.referralCount}</span>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Collaborator: </h4>
          <span>{role}</span>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Last Login: </h4>
          <span>
            {new Date(dateLoggedIn).toLocaleDateString()},{" "}
            {new Date(dateLoggedIn).toLocaleTimeString()}
          </span>
        </Stack>
      </div>
    );
  } else {
    return (
      <div className="stats mt-1">
        {!role.toLowerCase().includes("admin") && (
          <Stack direction={"row"} alignItems={"center"}>
            <h4>Jobs Done: </h4>
            <span>
              {accountData?.totalJobCount || accountData?.allCompletedSupplies}
            </span>
          </Stack>
        )}
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Referrals: </h4>
          <span>{accountData?.referralCount}</span>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Collaborator: </h4>
          <span>{role}</span>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <h4>Last Login: </h4>
          <span>
            {new Date(dateLoggedIn).toLocaleDateString()},{" "}
            {new Date(dateLoggedIn).toLocaleTimeString()}
          </span>
        </Stack>
      </div>
    );
  }
};

export default DashboardAccountStats;
