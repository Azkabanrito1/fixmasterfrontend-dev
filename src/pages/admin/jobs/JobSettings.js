import { Stack } from "@mui/system";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { UserCardsContainer } from "../usermanagement/CollaboratorMgmtOptions";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";

const JobSettings = () => {
  const jobsData = [
    {
      id: 1,
      icon: "/images/settings.png",
      title: "Booking Type",
      description: "Add, view and edit booking types",
      to: "booking-type",
    },
    {
      id: 2,
      icon: "/images/settings.png",
      title: "Service Type",
      description: "Add, view and edit service types",
      to: "service-type",
    },
    {
      id: 3,
      icon: "/images/settings.png",
      title: "Jobs Earnings",
      description: "Add, view and edit earnings",
      to: "earnings-setting",
    }
  ];
  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Jobs Setting</PageHeading>
      </div>

      <UserCardsContainer>
        {jobsData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default JobSettings;
