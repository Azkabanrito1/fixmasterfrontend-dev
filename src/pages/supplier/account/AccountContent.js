import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import AccountCards from "../../../components/suppliercomponent/account/AccountCards";
import AccountTable from "../../../components/suppliercomponent/account/AccountTable";
import SuppliesCard from "../../../components/suppliercomponent/account/SuppliesCard";

const AccountContent = () => {
  return (
    <>
      <PageContainer>
        <div>
          {/* <TechUserData /> */}
          <AccountCards />
        </div>
        <PageAside>
          <SuppliesCard />
        </PageAside>
      </PageContainer>
      <AccountTable />
    </>
  );
};

export default AccountContent;
