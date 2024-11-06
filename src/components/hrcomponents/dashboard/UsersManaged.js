import UserCard from "../../admincomponents/usermanagement/UserCard";
import { AssignmentContainer } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import {
  GridCardsContainer,
  GroupHeading,
} from "../../globalcomponents/Utilities";

const MANAGEDUSER = [
  {
    id: 1,
    icon: "/images/adminIcon3.png",
    title: "Franchisee",
    description: "Total Franchise managed",
    to: "franchisee",
  },
  {
    id: 2,
    icon: "/images/adminIcon3.png",
    title: "QA Master",
    description: "Total QA Master managed",
    to: "qa",
  },
];

const UsersManaged = ({ data }) => {
  const userArr = MANAGEDUSER.map((user) => {
    const currentUser = data?.userCategories?.filter(
      (currUser) =>
        currUser.userCategoryName.toLowerCase() === user.to.toLowerCase()
    );

    return {
      ...user,
      totalUsers: currentUser?.[0]?.totalCount,
    };
  });

  return (
    <AssignmentContainer>
      <GroupHeading>Users Managed</GroupHeading>

      <GridCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </GridCardsContainer>
    </AssignmentContainer>
  );
};

export default UsersManaged;
