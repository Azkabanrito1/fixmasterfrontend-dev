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

const FmWarranty = () => {
  return (
    <>
      <PageContainer>
        <Main>
          <div className="mb-5">
            <BackBtn />
            <PageHeading>FixMaster Warranty</PageHeading>
          </div>
        </Main>

        <PageAside>
          <PromoBanner banner="/images/ileyaPromofix.png" />
        </PageAside>
      </PageContainer>
    </>
  );
};
export default FmWarranty;

const Main = styled.div``;
