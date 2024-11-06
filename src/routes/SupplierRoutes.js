import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
import Welcome from "../components/layouts/settings/Welcome";

import Materials from "../components/layouts/training/Materials";

import Overviews from "../components/csecomponent/cse/dashboardComponent/account/Overviews";
import StaffHome from "../pages/cse/staffid/StaffHome";
import PreferenceHome from "../pages/cse/setting/PreferencesHome";
import AuthGuard from "../guards/AuthGuard";

import JobFix from "../pages/qamaster/wallet/JobFix";
import WithdrawalHistory from "../pages/qamaster/wallet/WithdrawalHistory";
import TrainingFolder from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";

//========================Supplier==================================
import DashboardContents from "../pages/supplier/dashboard/DashboardContents";
import SupplierSettingsIndex from "../pages/supplier/settings/SupplierSettingsIndex";
import AddressManagement from "../pages/supplier/settings/AddressManagement";
import Profile from "../components/layouts/settings/Profile";
import NewRequest from "../pages/supplier/quote/NewRequest";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import JobsHistory from "../components/csecomponent/cse/dashboardComponent/account/JobsHistory";
import Notifications from "../pages/qamaster/notification/Notifications";
import WalletIndex from "../pages/cse/wallet/WalletIndex";
import WalletReferral from "../components/globalcomponents/wallet/WalletReferral";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";
import ActiveQuotation from "../pages/supplier/quote/ActiveQuotation";
import ClosedQuotation from "../pages/supplier/quote/ClosedQuotation";
import PrePurchase from "../pages/supplier/order/PrePurchase";
import OpenPurchase from "../pages/supplier/order/OpenPurchase";
import ProgressPurchase from "../pages/supplier/order/ProgressPurchase";
import ClosePurchase from "../pages/supplier/order/ClosePurchase";
import NewReplacement from "../pages/supplier/replacement/NewReplacement";
import ProgressReplacement from "../pages/supplier/replacement/ProgressReplacement";
import ClosedReplacement from "../pages/supplier/replacement/ClosedReplacement";
import RetentionTable from "../pages/supplier/account/RetentionTable";
import SupplierHistory from "../components/suppliercomponent/dashboardcomponent/SupplierHistory";
import WarrantyHomes from "../pages/supplier/warranty/WarrantyHome";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import SupplierOnboardingGuard from "../guards/SupplierOnboardingGuard";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import GlobalAccountHome from "../components/globalcomponents/GlobalAccountHome";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";
import PreAddressMgmt from "../pages/supplier/address/PreAddressMgmt";

const SupplierRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="supplier" />}>
        <Route element={<PreDashboard />}>
          <Route element={<SupplierOnboardingGuard stageId={1} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<SupplierOnboardingGuard stageId={2} />}>
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route element={<SupplierOnboardingGuard stageId={3} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<SupplierOnboardingGuard stageId={4} />}>
            <Route path="manage-address" element={<PreAddressMgmt />} />
          </Route>
          <Route element={<SupplierOnboardingGuard stageId={5} />}>
            <Route
              path="guarantor-info"
              element={
                <GuarantorsInfo
                  isTrustedCustomer={true}
                  isTrustedCustomerHeader={true}
                />
              }
            />
          </Route>
          {/* <Route element={<SupplierOnboardingGuard stageId={6} />}> */}
          {/* </Route> */}
          <Route element={<SupplierOnboardingGuard stageId={10} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>
          <Route element={<SupplierOnboardingGuard stageId={14} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>
        <Route path="my-training/exam/:folderId" element={<ExamPage />} />

        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<DashboardContents />} />
          <Route path="dashboard" element={<DashboardContents />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
          <Route path="history" element={<SupplierHistory />} />
          <Route path="feedback-rating" element={<CollaboratorRating />} />

          <Route path="settings">
            <Route index element={<SupplierSettingsIndex />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="guarantor-info"
              element={
                <GuarantorsInfo
                  isTrustedCustomer={true}
                  isTrustedCustomerHeader={true}
                />
              }
            />
            <Route path="manage-address" element={<AddressManagement />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="preferences" element={<PreferenceHome />} />
          </Route>
          <Route path="staff-id" element={<StaffHome />} />

          <Route path="my-training">
            <Route index element={<TrainingFolder />} />
            <Route
              path="materials/:folderId"
              element={<Materials title={"Supplier Training"} />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>

          <Route path="new-quote" element={<NewRequest />} />
          <Route path="active-quote" element={<ActiveQuotation />} />
          <Route path="closed-quote" element={<ClosedQuotation />} />
          <Route path="pre-purchase-order" element={<PrePurchase />} />
          <Route path="open-purchase-order" element={<OpenPurchase />} />
          <Route path="in-progress" element={<ProgressPurchase />} />
          <Route path="completed" element={<ClosePurchase />} />
          <Route path="new-replacement" element={<NewReplacement />} />
          <Route path="warranty" element={<WarrantyHomes />} />
          <Route
            path="progress-replacement"
            element={<ProgressReplacement />}
          />
          <Route
            path="progress-replacement"
            element={<ProgressReplacement />}
          />
          <Route path="closed-replacement" element={<ClosedReplacement />} />

          <Route path="wallet">
            <Route index element={<WalletIndex />} />
            <Route path="jobs-earnings" element={<JobFix />} />
            <Route path="referrals-earning" element={<WalletReferral />} />
            <Route path="withdrawal-history" element={<WithdrawalHistory />} />
            <Route path="retention" element={<RetentionTable />} />
          </Route>

          {/* <Route path="account">
            <Route index element={<AccountContent />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />
            <Route path="retentions" element={<RetentionTable />} />
            <Route path="supplies-history" element={<SupplierHistory />} />
          </Route> */}
          <Route path="account">
            <Route index element={<GlobalAccountHome collaborator={true} />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />{" "}
          </Route>

          <Route path="notifications" element={<Notifications />} />

          <Route path="referrals" element={<CollaboratorReferral />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default SupplierRoutes;
