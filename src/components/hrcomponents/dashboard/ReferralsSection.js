import { useNavigate } from "react-router-dom";
import { timeFilters } from "../../../utils/selectOptions";
import JobCards from "../../franchiseecomponents/dashboardcomponents/JobCards";
import { GridCardsContainer } from "../../globalcomponents/Utilities";

const ReferralsSection = ({ dashboardData }) => {
  const navigate = useNavigate();

  const referrals = {
    totalDay: dashboardData?.dailyReferralEarnings,
    totalWeek: dashboardData?.weeklyReferralEarnings,
    totalMonth: dashboardData?.monthlyReferralEarnings,
    totalYear: dashboardData?.yearlyReferralEarnings,
  };

  const referralCard = {
    title: "Referrals",
    text: "Total Earned",
    img: "/images/green-plane.png",
    ref: "referrals",
    color: "#006717",
    filters: [{ type: "time", details: timeFilters }],
    values: referrals,
  };

  return (
    <GridCardsContainer>
      <JobCards
        key={referralCard.title}
        title={referralCard.title}
        text={referralCard.text}
        img={referralCard.img}
        color={referralCard.color}
        filters={referralCard.filters}
        values={referralCard.values}
        handleCardClick={() => navigate(referralCard.ref)}
      />
    </GridCardsContainer>
  );
};

export default ReferralsSection;
