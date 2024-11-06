import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import { AssignmentContainer } from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import {
  GridCardsContainer,
  GroupHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useGetUsersByCategory } from "../../../../hooks/useQueries/useIdentity";

const CustomersManaged = ({ data }) => {
  const { data: individualData } = useGetUsersByCategory("Individual customer");
  const { data: commercialData } = useGetUsersByCategory("Commercial customer");
  const MANAGEDUSER = [
    {
      id: 1,
      icon: "/images/adminIcon3.png",
      title: "Individual Customers",
      description: "Total Individual Customers managed",
      to: "customer-mgt/corporate/individual",
      param: individualData || [],
    },
    {
      id: 2,
      icon: "/images/adminIcon3.png",
      title: "Commercial Customers",
      description: "Total Commercial Customers managed",
      to: "customer-mgt/corporate/commercial",
      param: commercialData || [],
    },
  ];
  const userArr = MANAGEDUSER.map((user) => {
    return {
      ...user,
      totalUsers: user?.param?.length,
    };
  });

  return (
    <AssignmentContainer>
      <GroupHeading>Customers Managed</GroupHeading>

      <GridCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </GridCardsContainer>
    </AssignmentContainer>
  );
};

export default CustomersManaged;
