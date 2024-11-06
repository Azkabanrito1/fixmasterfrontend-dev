import { Stack } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import styled from "styled-components";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import { useSearchParams } from "react-router-dom";
import { useGetCustomerTypesOptions } from "../../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";

const CustomerManagementHome = () => {
  const { data: customerTypes, isLoading } = useGetCustomerTypesOptions();
  const [searchParams] = useSearchParams();
  const territoryId = searchParams.get("territoryId");
  
  const customerData = customerTypes?.data?.map((item) => ({
    id: item.id,
    icon: "/images/adminIcon2.jpg",
    title: item.name,
    description: item.description,
    to: !!territoryId
      ? `${item.name.toLowerCase()}?territoryId=${territoryId}`
      : `${item.name.toLowerCase()}`,
    totalUsers: item.count,
  }));
  const customersTypeData = isLoading
    ? []
    : [
        ...customerData,
        {
          id: 0,
          icon: "/images/adds.png",
          title: "Customer Type",
          description: "Add, view and edit customer type",
          to: "customer-type",
        },
        {
          icon: "/images/adminIcon2.jpg",
          to: "log",
          id: 3,
          title: "Customer Login Details",
          description: "View Customers' Login Details",
        },
      ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Customers</PageHeading>
      </div>
      <GlobalBallBeat loading={isLoading} />

      <UserCardsContainer>
        {!isLoading && (
          <>
            {customersTypeData?.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </>
        )}
      </UserCardsContainer>
    </Stack>
  );
};

export default CustomerManagementHome;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
