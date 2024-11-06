import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./CollaboratorDashboardHeader";
import SideBar from "./CollaboratorDashboardSidebar";
import scriptLoader from "react-async-script-loader";
import { DashboardWrapper, Main } from "../../globalcomponents/Utilities";
import GetStarted from "../../franchiseecomponents/modals/GetStarted";
import SwitchProfile from "../../globalcomponents/modals/SwitchProfile";
import {
  useGetUserDashboard,
  useGetUserRole,
} from "../../../hooks/useQueries/useIdentity";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { useGetStageId } from "../../../hooks/useQueries/useOnboarding";
import useGoogleGeocode from "../../../hooks/useGoogleGeocode";
import NotificationsModal from "../../globalcomponents/modals/NotificationsModal";
import useNotifications from "../../../hooks/useNotifications";

const CollaboratorsDashboard = ({ isScriptLoadSucceed }) => {
  const { role } = useLoginDetails();
  const { data: stageData } = useGetStageId();

  const { data: dashboardData, isLoading: loadingDashboardData } =
    useGetUserDashboard();
  const { data: roleData } = useGetUserRole();
  const defaultRole = roleData?.filter((role) => role.isDefault)[0];
  useGoogleGeocode({
    isScriptLoadSucceed:
      isScriptLoadSucceed &&
      // condition to only fire this function when user is a technician or cse
      (defaultRole?.name?.toLowerCase() === "cse" ||
        defaultRole?.name?.toLowerCase() === "technician"),
  });

  const [showSideBar, setShowSideBar] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [showSwitchProfile, setShowSwitchProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // const notifications = dashboardData?.data?.pendingFixNotifications;

  const { notifications } = useNotifications();

  useEffect(() => {
    if (typeof stageData?.data?.isCompleted !== "undefined") {
      const started = localStorage.getItem("started");
      const usersWithoutOnboarding = [
        "super admin",
        "hr admin",
        "cse admin",
        "customer admin",
        "technician admin",
        "supplier admin",
      ];

      const showStarted = !(
        usersWithoutOnboarding.includes(role.toLowerCase()) ||
        stageData?.data?.isCompleted ||
        started === "true"
      );

      setShowGetStarted(showStarted);
    }
  }, [stageData?.data?.isCompleted]);

  const closeGetStarted = () => setShowGetStarted(false);
  const closeSwitchProfile = () => setShowSwitchProfile(false);
  const openSwitchProfile = () => setShowSwitchProfile(true);
  const openNotifications = () => setShowNotifications(true);
  const closeNotifications = () => setShowNotifications(false);

  return (
    <>
      <Header
        loggedIn={true}
        setShowSideBar={setShowSideBar}
        notifications={notifications}
        openNotifications={openNotifications}
      />
      <DashboardWrapper>
        <SideBar
          openSwitchProfile={openSwitchProfile}
          closeSidebar={() => setShowSideBar(false)}
          showSideBar={showSideBar}
        />
        <Main>
          <Outlet
            context={{
              dashboardData: dashboardData?.data || {},
              loadingDashboardData: loadingDashboardData,
            }}
          />
        </Main>
      </DashboardWrapper>
      <GetStarted isOpen={showGetStarted} closeModal={closeGetStarted} />

      {/* Switch profile modal */}
      {showSwitchProfile && (
        <SwitchProfile
          isOpen={showSwitchProfile}
          closeModal={closeSwitchProfile}
        />
      )}

      {/* Notifications modal */}
      {showNotifications && (
        <NotificationsModal
          isOpen={showNotifications}
          closeModal={closeNotifications}
          notifications={notifications}
        />
      )}
    </>
  );
};

export default scriptLoader([process.env.REACT_APP_GEOCODE_API_URL])(
  CollaboratorsDashboard
);
