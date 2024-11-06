import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import styled from "styled-components";

const BookingFix = () => {
  return (
    <>
      <PageContainer>
        <Main>
          <div className="mb-5">
            <BackBtn />
            <PageHeading>Booking a Fix</PageHeading>
          </div>
        </Main>

        <PageAside>
          <PromoBanner banner="/images/ileyaPromofix.png" />
        </PageAside>
      </PageContainer>
    </>
  );
};
export default BookingFix;

const Main = styled.div``;
