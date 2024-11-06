import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import GlobalSettingsTemplate from "../../../components/globalcomponents/GlobalSettingsTemplate";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";

const settingOptions = [
  {
    id: 0,
    img: "/images/personal-info.png",
    title: "Account Information",
    linkUrl: "account-info",
    description: "Review and change your personal details",
  },
  {
    id: 1,
    img: "/images/services.png",
    title: "Service Address",
    linkUrl: "service-location",
    description: "Add, review and change service location address",
  },
  {
    id: 2,
    img: "/images/preferences.png",
    title: "Preferences",
    linkUrl: "preferences",
    description: "Set notification and other preferneces for your account",
  },
  {
    id: 3,
    img: "/images/security.png",
    title: "Password & Security",
    linkUrl: "security",
    description: "Change your account security information",
  },
];

const CustomerSettingsHome = () => {
  return (
    <PageContainer>
      <GlobalSettingsTemplate settingOptions={settingOptions} />

      <PageAside>
        <PromoBanner banner={"/images/ileya-fix-promo-acts.png"} />
      </PageAside>
    </PageContainer>
  );
};

export default CustomerSettingsHome;
