import { useReducer, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./CustomerHeader";
import SideBar from "./CustomerSidebar";
import { DashboardWrapper, Main } from "../../globalcomponents/Utilities";
import BookaFix from "../../customercomponents/modals/BookaFix";
import PaymentOptions from "../../customercomponents/payment/modals/PaymentOptions";
import PayWithSubscription from "../../customercomponents/payment/modals/PayWithSubscription";
import PayWithWallet from "../../customercomponents/payment/modals/PayWithWallet";
import SwitchProfile from "../../globalcomponents/modals/SwitchProfile";

import { useGetUserDashboard } from "../../../hooks/useQueries/useIdentity";
import NotificationsModal from "../../globalcomponents/modals/NotificationsModal";
import useNotifications from "../../../hooks/useNotifications";
// import CustomerSupport from "../../csecomponent/cse/dashboardComponent/comment/Comment";

const initState = {
  showBookFix: false,
  showPayOpt: false,
  showComToMgt: false,
  showPayWtSub: false,
  showPayWtWallet: false,
  showNotifications: false,
  showSwitchProf: false,
};

const showModalReducer = (state, action) => {
  const { modalName, type } = action;
  switch (type) {
    case "open":
      return {
        ...state,
        [modalName]: true,
      };
    case "close":
      return {
        ...state,
        [modalName]: false,
      };
    default:
      return state;
  }
};

const CustomerDashboard = () => {
  const [promotionId, setPromotionId] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [fixId, setFixId] = useState(null);
  const [modalState, setModalState] = useReducer(showModalReducer, initState);

  // opening the modals
  const controlBookaFix = (action) =>
    setModalState({ modalName: "showBookFix", type: action });
  const controlSwitchProfile = (action) =>
    setModalState({ modalName: "showSwitchProf", type: action });
  // const controlCommentToMgt = (action) =>
  //   setModalState({ modalName: "showComToMgt", type: action });
  const controlPaymentOptions = (action) =>
    setModalState({ modalName: "showPayOpt", type: action });
  const controlPayWithSub = (action) =>
    setModalState({ modalName: "showPayWtSub", type: action });
  const controlPayWithWallet = (action) =>
    setModalState({ modalName: "showPayWtWallet", type: action });
  const controlNotifications = (action) =>
    setModalState({ modalName: "showNotifications", type: action });

  // fetching dashboard data
  const { data: dashboardData } = useGetUserDashboard();
  // const notifications = dashboardData?.data?.pendingFixNotifications;

  const { notifications } = useNotifications();

  return (
    <>
      <Header
        openFixModal={() => controlBookaFix("open")}
        notifications={notifications}
        setShowSideBar={setShowSideBar}
        openNotifications={() => controlNotifications("open")}
      />
      <DashboardWrapper>
        <SideBar
          openBookaFix={() => controlBookaFix("open")}
          openSwitchProfile={() => controlSwitchProfile("open")}
          // openCommentToMgt={() => controlCommentToMgt("open")}
          showSideBar={showSideBar}
          closeSidebar={() => setShowSideBar(false)}
        />

        <Main>
          <Outlet
            context={{
              dashboardData: dashboardData?.data,
              openBookaFix: () => controlBookaFix("open"),
              setPromoId: setPromotionId,
              openPaymentOptions: () => controlPaymentOptions("open"),
              setFixId: setFixId,
            }}
          />
        </Main>
      </DashboardWrapper>

      {/* modals */}
      {modalState.showBookFix && (
        <BookaFix
          promotionId={promotionId}
          isOpen={modalState.showBookFix}
          openPaymentOptions={() => controlPaymentOptions("open")}
          closeModal={() => controlBookaFix("close")}
          setFixId={setFixId}
        />
      )}

      {/* Notifications modal */}
      {modalState.showNotifications && (
        <NotificationsModal
          notifications={notifications}
          isOpen={modalState.showNotifications}
          closeModal={() => controlNotifications("close")}
        />
      )}

      {/* swith profile modal */}
      {modalState.showSwitchProf && (
        <SwitchProfile
          isOpen={modalState.showSwitchProf}
          closeModal={() => controlSwitchProfile("close")}
        />
      )}

      {/* {modalState.showComToMgt && (
        <CustomerSupport isOpen={modalState.showComToMgt} close={() => controlCommentToMgt("open")} />
      )} */}

      {/* modals for payment */}
      {modalState.showPayOpt && (
        <PaymentOptions
          closeModal={() => controlPaymentOptions("close")}
          fixId={fixId}
          isOpen={modalState.showPayOpt}
          openPayWithSub={() => controlPayWithSub("open")}
          openPayWithWallet={() => controlPayWithWallet("open")}
        />
      )}

      {modalState.showPayWtSub && (
        <PayWithSubscription
          isOpen={modalState.showPayWtSub}
          fixId={fixId}
          closeModal={() => controlPayWithSub("close")}
          openPaymentOptions={() => controlPaymentOptions("open")}
        />
      )}

      {modalState.showPayWtWallet && (
        <PayWithWallet
          isOpen={modalState.showPayWtWallet}
          closeModal={() => controlPayWithWallet("close")}
          fixId={fixId}
          openPaymentOptions={() => controlPaymentOptions("open")}
        />
      )}
    </>
  );
};

export default CustomerDashboard;
