import { useOutletContext } from "react-router-dom";
import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import FixCards from "../../../components/customercomponents/fix/FixCards";
import UpcomingEvents from "../../../components/globalcomponents/UpcomingEvents";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";

const JobsHome = () => {
  const { dashboardData } = useOutletContext();

  return (
    <PageContainer>
      <div>
        <FixCards fixData={dashboardData} />
        {dashboardData?.promoBanner && (
          <PromoBanner banner={dashboardData?.promoBanner} />
        )}
      </div>
      <PageAside>
        <UpcomingEvents events={dashboardData?.fixSchedule} />
      </PageAside>
    </PageContainer>
  );
};

export default JobsHome;
