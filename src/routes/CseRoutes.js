import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// =====================Customer Routes=============================
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";

// =======================FRANCHISEEE==========================
// ----------------------onboarding-------------------
import Welcome from "../components/layouts/settings/Welcome";
import Materials from "../components/layouts/training/Materials";

//Cse
import ExamWelcome from "../components/layouts/exam/ExamWelcome";

//csePredashoard
import CseInterview from "../components/layouts/interview/Interview";
import DasboardContent from "../pages/cse/dasboard/DasboardContent";
import JobManagements from "../pages/cse/jobs/JobManagements";
import UnassignedIndex from "../pages/cse/jobs/UnassignedIndex";
import OngoingHome from "../pages/cse/jobs/OngoingHome";
import ViewJob from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/ViewJobDetails";
import CompleteJobs from "../pages/cse/jobs/CompleteJobs";
import RejectedJob from "../pages/cse/jobs/RejectedJob";
import WarrantyHome from "../pages/cse/jobs/WarrantyHome";
import Diagnostic from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/diagnosticVisit/Diagnostic";
import SupplyReq from "../components/csecomponent/cse/dashboardComponent/supplier/SupplyReq";
import OngoingTemplate from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/OngoingTemplate";
import Overviews from "../components/csecomponent/cse/dashboardComponent/account/Overviews";
import CompletionHome from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/CompletionHome";
import Notification from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/notification/Notification";
import Fix from "../components/csecomponent/cse/dashboardComponent/wallet/Fix";
import ReferralEarning from "../components/csecomponent/cse/dashboardComponent/wallet/ReferralEarning";
import WalletHome from "../components/csecomponent/cse/dashboardComponent/wallet/WalletHome";
import HistoryEarning from "../components/csecomponent/cse/dashboardComponent/wallet/HistoryEarning";
import StaffHome from "../pages/cse/staffid/StaffHome";
import CommentHome from "../pages/cse/comment/CommentHome";
import Warrantys from "../pages/cse/jobs/ongoingsJobsDetails/Warrantys";
import PreferenceHome from "../pages/cse/setting/PreferencesHome";
import AuthGuard from "../guards/AuthGuard";
import JobFix from "../pages/qamaster/wallet/JobFix";
import WithdrawalHistory from "../pages/qamaster/wallet/WithdrawalHistory";

import InterviewStarted from "../components/layouts/interview/InterviewWelcome";
import TrainingFolder from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";

import ContactInitial from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/ContactInitial";
import Profile from "../components/layouts/settings/Profile";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import JobsHistory from "../components/csecomponent/cse/dashboardComponent/account/JobsHistory";
import Notifications from "../pages/qamaster/notification/Notifications";
import GlobalAccountHome from "../components/globalcomponents/GlobalAccountHome";
import WalletIndex from "../pages/cse/wallet/WalletIndex";
import WalletReferral from "../components/globalcomponents/wallet/WalletReferral";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import CseOnboardingGuard from "../guards/CseOnboardingGuard";
import UnAcceptedJobs from "../pages/cse/jobs/UnAcceptedJobs";
import JobMessages from "../pages/franchisee/jobs/Messages";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";

const CseRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="cse" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<DasboardContent />} />
          <Route path="dashboard" element={<DasboardContent />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />

          <Route path="cse-wallet">
            <Route index element={<WalletHome />} />
            <Route path="jobs-earning" element={<Fix />} />
            <Route path="referrals-earning" element={<ReferralEarning />} />
            <Route path="retention" element={<HistoryEarning />} />
          </Route>

          {/* ongoing jobs */}
          <Route
            path="job-management/ongoing/:fixId"
            element={<OngoingTemplate />}
          >
            <Route index path="job-details" element={<ViewJob />} />
            <Route path="initial-contact" element={<ContactInitial />} />
            <Route path="diagnostic-visits" element={<Diagnostic />} />
            <Route path="supplies" element={<SupplyReq />} />
            <Route path="completion" element={<CompletionHome />} />
            <Route path="warranty" element={<Warrantys />} />
            <Route path="notification" element={<Notification />} />
            {/* <Route path="messages" element={<JobMessages />} /> */}
          </Route>

          <Route path="job-management">
            <Route index element={<JobManagements />} />
            <Route path="unassigned" element={<UnassignedIndex />} />
            <Route path="unaccepted" element={<UnAcceptedJobs />} />
            <Route path="completed" element={<CompleteJobs />} />
            <Route path="rejected" element={<RejectedJob />} />
            <Route path="warranty" element={<WarrantyHome />} />
            <Route path="ongoing" element={<OngoingHome />} />
          </Route>

          <Route path="account">
            <Route index element={<GlobalAccountHome />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />
          </Route>

          <Route path="referrals" element={<CollaboratorReferral />} />
          {/* <Route path="notification" element={<Notification />} /> */}
          <Route path="staff-id" element={<StaffHome />} />
          <Route path="support" element={<CommentHome />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="wallet">
            <Route index element={<WalletIndex />} />
            <Route path="jobs-earnings" element={<JobFix />} />
            <Route path="referrals-earning" element={<WalletReferral />} />
            <Route path="withdrawal-history" element={<WithdrawalHistory />} />
          </Route>

          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route
              path="preferences"
              element={<PreferenceHome employmentType={true} earnings={true} />}
            />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>

          <Route path="feedback-rating" element={<CollaboratorRating />} />

          <Route path="my-training">
            <Route index element={<TrainingFolder />} />
            <Route
              path="materials/:folderId"
              element={<Materials title={" Training"} />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>
        </Route>

        {/* onboarding */}
        <Route element={<PreDashboard />}>
          <Route element={<CseOnboardingGuard stageId={2} />}>
            <Route
              path="exam/welcome"
              element={<ExamWelcome collaborator={"CSE"} messageType={"mcq"} />}
            />
            <Route
              path="my-training/cse/welcome/:folderId"
              element={
                <ExamWelcome collaborator={"CSE"} messageType={"onboarding"} />
              }
            />
          </Route>
          <Route element={<CseOnboardingGuard stageId={5} />}>
            <Route path="startinterview" element={<InterviewStarted />} />
            <Route
              path="interview"
              element={<CseInterview collaborator={"CSE"} />}
            />
          </Route>
          <Route element={<CseOnboardingGuard stageId={8} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<CseOnboardingGuard stageId={19} />}>
            <Route path="preboarding-declarations" element={<Declaration />} />
          </Route>
          <Route element={<CseOnboardingGuard stageId={9} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<CseOnboardingGuard stageId={10} />}>
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
          </Route>
          <Route element={<CseOnboardingGuard stageId={15} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>
          <Route element={<CseOnboardingGuard stageId={18} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>

        <Route path="exam" element={<ExamPage examType="general" collaborator={"CSE"} />} />
        <Route path="my-training/exam/:folderId" element={<ExamPage collaborator={"CSE"} />} />
      </Route>
    </Routes>
  );
};
export default CseRoutes;
