import GlobalSettingsTemplate from "../../../components/globalcomponents/GlobalSettingsTemplate";

const settingOptions = [
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
    title: "Guarantor Details",
    linkUrl: "guarantor-info",
    description: "Submit and manage guarantor information",
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

const CollaboratorSettingsHome = () => {
  return <GlobalSettingsTemplate settingOptions={settingOptions} />;
};

export default CollaboratorSettingsHome;
