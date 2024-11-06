import {
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import { PATH_ADMIN } from "../../../routes/paths";

const OPTIONS = [
  {
    id: 0,
    icon: "/images/adminIcon1.jpg",
    title: "Quotation Overview",
    descripton: "Quotation overview",
    to: PATH_ADMIN.quotationOverview,
  },
  {
    id: 1,
    icon: "/images/settings.png",
    title: "Quotation Settings",
    descripton: "Quotation engine settings",
    to: PATH_ADMIN.quotationSettings,
  },
  {
    id: 2,
    icon: "/images/settings.png",
    title: "Logistics Settings",
    descripton: "Add, update and delete Logistics settings",
    to: PATH_ADMIN.logisticsSettings,
  },
];

const QuotationHome = () => {
  return (
    <>
      <div className="mb-3">
        <PageHeading>Quotation</PageHeading>
      </div>

      <GridCardsContainer>
        {OPTIONS.map((option) => (
          <UserCard key={option.id} user={option} />
        ))}
      </GridCardsContainer>
    </>
  );
};

export default QuotationHome;
