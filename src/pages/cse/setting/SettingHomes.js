import GlobalSettingsTemplate from "../../../components/globalcomponents/GlobalSettingsTemplate";

const preboardingSettingsOptions = [
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
    linkUrl: "guarantor",
    description: "Submit and manage guarantor information",
  },
  {
    id: 2,
    img: "/images/preboarding.png",
    title: "Pre-boarding Declarations",
    linkUrl: "pre-declarations",
    description: "Accept our terms and conditions",
  },
  {
    id: 3,
    img: "/images/postboarding.png",
    title: "Post-boarding Declarations",
    linkUrl: "post-declarations",
    description: "Accept our terms and conditions",
  },
  {
    id: 4,
    img: "/images/preferences.png",
    title: "Preferences",
    linkUrl: "preferences",
    description: "Set notification and other preferneces for your account",
  },
  {
    id: 5,
    img: "/images/security.png",
    title: "Password & Security",
    linkUrl: "security",
    description: "Change your account security information",
  },
];

const mainSettingsOptions = [
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
    linkUrl: "guarantor",
    description: "Submit and manage guarantor information",
  },
  {
    id: 2,
    img: "/images/postboarding.png",
    title: "Post-boarding Declarations",
    linkUrl: "post-declarations",
    description: "Accept our terms and conditions",
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

const SettingsHomes = () => {
  const loginDetails = JSON.parse(
    localStorage.getItem("loginDetails")
  ).onboarding;

  const isCompleted = loginDetails?.onboarding?.isCompleted;

  const settingOptions = isCompleted
    ? mainSettingsOptions
    : preboardingSettingsOptions;

  return <GlobalSettingsTemplate settingOptions={settingOptions} />;
};

export default SettingsHomes;
