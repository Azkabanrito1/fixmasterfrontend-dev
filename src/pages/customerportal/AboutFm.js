import { Link } from "react-router-dom";
import PromoBanner from "../../components/customercomponents/dashboardcomponents/PromoBanner";
import { CardContainer } from "../../components/franchiseecomponents/dashboardcomponents/JobCards";
import {
  PageAside,
  PageContainer,
} from "../../components/layouts/dashboard/DashboardUtilities";
import {
  Folder,
  FolderContainer,
} from "../../components/layouts/training/TrainingFolder";

const AboutFm = () => {
  return (
    <PageContainer>
      <FolderContainer>
        <Folder>
          <img src="/images/folder.png" alt="" />
          <Link to=""></Link>
        </Folder>
        <Folder>
          <img src="/images/folder.png" alt="" />
          <Link to=""></Link>
        </Folder>
        <Folder>
          <img src="/images/folder.png" alt="" />
          <Link to=""></Link>
        </Folder>
      </FolderContainer>
      <PageAside>
        <PromoBanner banner="/images/ileyaPromofix.png" />
      </PageAside>
    </PageContainer>
  );
};

export default AboutFm;
