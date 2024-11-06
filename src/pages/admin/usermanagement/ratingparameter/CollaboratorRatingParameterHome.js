import { Stack } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import { PATH_ADMIN } from "../../../../routes/paths";

const CollaboratorRatingParameterHome = () => {
  const ratingsData = [
    {
      id: 1,
      icon: "/images/adds.png",
      title: "Rating type",
      description: "Add, view and edit Rating type",
      to: `${PATH_ADMIN.ratingType}`,
    },
    {
      id: 2,
      icon: "/images/adds.png",
      title: "Rating default",
      description: "Add, view and edit Rating engine attributes",
      to: `${PATH_ADMIN.ratingDefault}`,
    },
    {
      id: 3,
      icon: "/images/adds.png",
      title: "Rating bonuses",
      description: "Add, view and edit Rating bonuses",
      to: `${PATH_ADMIN.ratingBonus}`,
    },
    {
      id: 4,
      icon: "/images/adds.png",
      title: "Rating management",
      description: "Add, view and edit Rating management",
      to: `${PATH_ADMIN.ratingMgt}`,
    },
  ];
  return (
    <Stack spacing={4}>
      <div>
        <PageHeading>Ratings Parameters & Settings </PageHeading>
        <BackBtn />
        {/* <RatingsIndex collaborator={collaborator} />
        <RatingTime /> */}
      </div>
      <GridCardsContainer>
        {ratingsData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </GridCardsContainer>
    </Stack>
  );
};

export default CollaboratorRatingParameterHome;
