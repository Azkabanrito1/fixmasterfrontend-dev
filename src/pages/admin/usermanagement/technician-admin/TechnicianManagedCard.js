import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import { AssignmentContainer } from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import {
  GridCardsContainer,
  GroupHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useGetUsersByCategory } from "../../../../hooks/useQueries/useIdentity";
// import CseManaged from "../../../franchisee/cse-management/CseManaged";

const TechnicianManagedCard = ({ collaborator }) => {
  const { data: usersData, isLoading } = useGetUsersByCategory(
    collaborator.toLowerCase()
  );
  const MANAGEDUSER = [
    {
      id: 1,
      icon: "/images/adminIcon3.png",
      title: "Active Technicians",
      description: "Total number of technicians",
      to: "technician-mgt/managed/active",
      param: usersData || [],
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
      <GroupHeading>Technicians Managed</GroupHeading>

      <GridCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </GridCardsContainer>
    </AssignmentContainer>
  );
};

export default TechnicianManagedCard;
