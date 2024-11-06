import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// =====================Customer Routes=============================
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
// =======================FRANCHISEEE==========================
// ----------------------onboarding-------------------
import Welcome from "../components/layouts/settings/Welcome";

import Materials from "../components/layouts/training/Materials";

//Cse
import ExamWelcome from "../components/layouts/exam/ExamWelcome";

import ViewJob from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/ViewJobDetails";
import StaffHome from "../pages/cse/staffid/StaffHome";
import PreferenceHome from "../pages/cse/setting/PreferencesHome";
import AuthGuard from "../guards/AuthGuard";
import TrainingFolder from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";
import TechnicianHome from "../pages/technician/DashboardHome";
import CustomerInformationHome from "../pages/supplier/settings/CustomerInformationHome";
import Profile from "../components/layouts/settings/Profile";
import TechJobsHome from "../pages/technician/jobmanagement/TechJobsHome";
import TechUnassignedJobs from "../pages/technician/jobmanagement/TechUnassignedJobs";
import TechCompletedJobs from "../pages/technician/jobmanagement/TechCompletedJobs";
import TechRejectedJobs from "../pages/technician/jobmanagement/TechRejectedJobs";
import TechWarrantyJobs from "../pages/technician/jobmanagement/TechWarranty";
import TechOngoingJobs from "../pages/technician/jobmanagement/TechOngoingJobs";
import TechTemplate from "../pages/technician/jobmanagement/TechTemplate";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import TechnicianOnboardingGuard from "../guards/TechnicianOnboardingGuard";
import TechAssignedJob from "../pages/technician/jobmanagement/TechAssigned";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import GlobalAccountHome from "../components/globalcomponents/GlobalAccountHome";
import JobsHistory from "../components/csecomponent/cse/dashboardComponent/account/JobsHistory";
import Overviews from "../components/csecomponent/cse/dashboardComponent/account/Overviews";
import WalletIndex from "../pages/cse/wallet/WalletIndex";
import JobFix from "../pages/qamaster/wallet/JobFix";
import WalletReferral from "../components/globalcomponents/wallet/WalletReferral";
import WithdrawalHistory from "../pages/qamaster/wallet/WithdrawalHistory";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";

const TechnicianRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="technician" />}>
        {/* onboarding */}
        <Route element={<PreDashboard />}>
          <Route element={<TechnicianOnboardingGuard stageId={2} />}>
            <Route
              path="exam/welcome"
              element={
                <ExamWelcome collaborator={"Technician"} messageType={"mcq"} />
              }
            />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={6} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={8} />}>
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={9} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={10} />}>
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={16} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>
          <Route element={<TechnicianOnboardingGuard stageId={19} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>
        {/* exams */}
        <Route path="exam" element={<ExamPage examType="general" collaborator={"Technician"} />} />
        <Route path="my-training/exam/:folderId" element={<ExamPage collaborator={"Technician"} />} />

        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<TechnicianHome />} />
          <Route path="dashboard" element={<TechnicianHome />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
          <Route path="job-management">
            <Route index element={<TechJobsHome />} />
            <Route path="unassigned" element={<TechUnassignedJobs />} />
            <Route path="assigned" element={<TechAssignedJob />} />
            <Route path="completed" element={<TechCompletedJobs />} />
            <Route path="rejected" element={<TechRejectedJobs />} />
            <Route path="warranty" element={<TechWarrantyJobs />} />
            <Route path="ongoing" element={<TechOngoingJobs />} />
          </Route>

          <Route
            path="job-management/ongoing/:fixId"
            element={<TechTemplate />}
          >
            <Route index path="job-details" element={<ViewJob />} />
          </Route>
          <Route path="account">
            <Route index element={<GlobalAccountHome />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />
          </Route>

          <Route path="my-training">
            <Route index element={<TrainingFolder />} />
            <Route
              path="materials/:folderId"
              element={<Materials title={"Technician Training"} />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>

          <Route path="wallet">
            <Route index element={<WalletIndex />} />
            <Route path="jobs-earnings" element={<JobFix />} />
            <Route path="referrals-earning" element={<WalletReferral />} />
            <Route path="withdrawal-history" element={<WithdrawalHistory />} />
          </Route>
          <Route path="feedback-rating" element={<CollaboratorRating />} />

          <Route path="referrals" element={<CollaboratorReferral />} />
          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route
              path="preferences"
              element={
                <PreferenceHome
                  employmentType={true}
                  location={true}
                  earnings={true}
                />
              }
            />
          </Route>
          <Route path="staff-id" element={<StaffHome />} />
        </Route>

        <Route
          path="supplier/customer-info"
          element={<CustomerInformationHome />}
        />
      </Route>
    </Routes>
  );
};
export default TechnicianRoutes;
