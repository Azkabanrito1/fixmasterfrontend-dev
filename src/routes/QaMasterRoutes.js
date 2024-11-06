import React from "react";
import { Route, Routes } from "react-router-dom";

// =====================Customer Routes=============================
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";

// =======================FRANCHISEEE==========================
// ----------------------onboarding-------------------
import Welcome from "../components/layouts/settings/Welcome";

import Materials from "../components/layouts/training/Materials";

import Overviews from "../components/csecomponent/cse/dashboardComponent/account/Overviews";
import PreferenceHome from "../pages/cse/setting/PreferencesHome";
import AuthGuard from "../guards/AuthGuard";

//QaMaster
import QaMasterHome from "../pages/qamaster/dasboard/QaMasterHome";
import TechOnboarding from "../pages/qamaster/techmanagement/TechOnboarding";
import TechManage from "../pages/qamaster/techmanagement/TechManage";
import TechAnalysis from "../pages/qamaster/techmanagement/TechAnalysis";
import TechTraining from "../pages/qamaster/techmanagement/TechTraining";
import Support from "../pages/qamaster/support/Support";
import JobFix from "../pages/qamaster/wallet/JobFix";
import QaMasterReferrals from "../components/globalcomponents/wallet/WalletReferral";
import WithdrawalHistory from "../pages/qamaster/wallet/WithdrawalHistory";
import TrainingFolder from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";

//========================Supplier==================================
import ViewTraining from "../pages/qamaster/techmanagement/ViewTraining";
import Profile from "../components/layouts/settings/Profile";
import SupportHome from "../pages/qamaster/support/SupportHome";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import JobsHistory from "../components/csecomponent/cse/dashboardComponent/account/JobsHistory";
import Notifications from "../pages/qamaster/notification/Notifications";
import GlobalWallet from "../components/globalcomponents/wallet/GlobalWallet";
import GlobalAccountHome from "../components/globalcomponents/GlobalAccountHome";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import QaMasterOnboardingGuard from "../guards/QaMasterOnboardingGuard";
import StaffHome from "../pages/cse/staffid/StaffHome";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";

const QaMasterRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="qa" />}>
        <Route element={<PreDashboard />}>
          <Route element={<QaMasterOnboardingGuard stageId={1} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<QaMasterOnboardingGuard stageId={2} />}>
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route element={<QaMasterOnboardingGuard stageId={3} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<QaMasterOnboardingGuard stageId={4} />}>
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
          </Route>
          <Route element={<QaMasterOnboardingGuard stageId={8} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>
          <Route element={<QaMasterOnboardingGuard stageId={11} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>

        <Route path="my-training/exam/:folderId" element={<ExamPage />} />
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index path="dashboard" element={<QaMasterHome />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
          <Route path="my-training">
            <Route index element={<TrainingFolder />} />
            <Route
              path="materials/:folderId"
              element={<Materials title={"Training"} />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>
          <Route path="tech-onboarding" element={<TechOnboarding />} />
          <Route path="tech-managed" element={<TechManage />} />
          <Route path="tech-analysis/:userId" element={<TechAnalysis />} />
          <Route path="tech-training" element={<TechTraining />} />
          <Route path="tech-training" element={<TechTraining />} />
          <Route path="training-info/:startDate" element={<ViewTraining />} />
          <Route path="support-request" element={<SupportHome />} />
          <Route path="supports/:requestId" element={<Support />} />
          <Route path="account">
            <Route index element={<GlobalAccountHome />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />
          </Route>

          <Route path="referrals" element={<CollaboratorReferral />} />
          <Route path="feedback-rating" element={<CollaboratorRating />} />

          <Route path="staff-id" element={<StaffHome />} />
          <Route path="wallet">
            <Route index element={<GlobalWallet />} />
            <Route path="jobs-earnings" element={<JobFix />} />
            <Route path="referrals-earning" element={<QaMasterReferrals />} />
            <Route path="withdrawal-history" element={<WithdrawalHistory />} />
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route
              path="profile"
              element={<Profile canSelectContractType={false} />}
            />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route
              path="preferences"
              element={<PreferenceHome maximumTechnician={true} />}
            />
          </Route>
        </Route>

        {/* <Route path="tech-analysis" element={<TechAnalysis />} /> */}
      </Route>
    </Routes>
  );
};
export default QaMasterRoutes;
