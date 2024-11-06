import React from "react";
import { StyledAccount } from "../../globalcomponents/Utilities";
import DashboardWallet from "./DashboardWallet";
import DashboardProfile from "../../dashboardcomponents/dashboardaccountinfo/DashboardProfile";

const DashboardAccountSum = () => {
  return (
    <StyledAccount>
      <div>
        <DashboardProfile profileData={{}} />
      </div>
      <DashboardWallet accountData={{}} />
    </StyledAccount>
  );
};

export default DashboardAccountSum;
