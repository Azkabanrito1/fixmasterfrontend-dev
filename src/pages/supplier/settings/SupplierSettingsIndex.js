import GlobalSettingsTemplate from "../../../components/globalcomponents/GlobalSettingsTemplate";

const SupplierSettingsIndex = () => {
  const settingItems = [
    {
      id: 0,
      img: "/images/personal-info.png",
      title: "Personal Details",
      linkUrl: "profile",
      description: "Review and change your personal details",
    },
    {
      id: 1,
      img: "/images/guarantor-info.png",
      title: "Trusted Customer",
      linkUrl: "guarantor-info",
      description: "Submit and manage trusted customer information",
    },

    {
      id: 2,
      img: "/images/postboarding.png",
      title: "Address Management",
      linkUrl: "manage-address",
      description: "Manage address and locations of your branches",
    },

    {
      id: 3,
      img: "/images/preferences.png",
      title: "Preferences",
      linkUrl: "preferences",
      description: "Set notification and other preferneces for your account",
    },
    {
      id: 4,
      img: "/images/security.png",
      title: "Password & Security",
      linkUrl: "security",
      description: "Change your account security information",
    },
  ];
  const settingOptions = settingItems;
  return (
    <div>
      <GlobalSettingsTemplate settingOptions={settingOptions} />
    </div>
  );
};

export default SupplierSettingsIndex;
