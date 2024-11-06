import { Route, Routes } from "react-router-dom";

// =====================Customer Routes=============================
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
import DiagnosticVisit from "../pages/franchisee/jobs/DiagnosticVisit";
// =======================FRANCHISEEE==========================
// ----------------------onboarding-------------------
import Welcome from "../components/layouts/settings/Welcome";
// -----------------------dashboard----------------------
import FranchiseeHome from "../pages/franchisee/dashboard/FranchiseeHome";
// ---------------------training---------------------
import FranchiseeCourses from "../components/layouts/training/TrainingFolder";
import Materials from "../components/layouts/training/Materials";

// -------------------------jobs-----------------------
import JobManagement from "../pages/franchisee/dashboard/JobManagement";
import OngoingJobs from "../pages/franchisee/jobs/OngoingJobs";
import RejectedJobs from "../pages/franchisee/jobs/RejectedJobs";
import CompletedJobs from "../pages/franchisee/jobs/CompletedJobs";
import UnassignedJobs from "../pages/franchisee/jobs/UnassignedJobs";
import UrgentUnassignedJobs from "../pages/franchisee/jobs/UrgentUnassignedJobs";
import MyJobs from "../pages/franchisee/jobs/MyJobs";
import Warranty from "../pages/franchisee/jobs/WarrantyClaims";
import MyCompletedJobs from "../pages/franchisee/jobs/MyCompletedJobs";
// --------------------------cse management--------------------
import CseOnboarding from "../pages/franchisee/cse-management/CseOnboarding";
import CseTraining from "../pages/franchisee/cse-management/CseTraining";
import CseManaged from "../pages/franchisee/cse-management/CseManaged";
import CseAnalysisReport from "../pages/franchisee/cse-management/CseAnalysisReport";
// ------------------------equipment management---------------------
import HireRequests from "../pages/franchisee/hire-request/HireRequest";
import EquipmentMgt from "../pages/franchisee/hire-request/EquipmentMgt";
import EquipmentActivity from "../pages/franchisee/hire-request/EquipmentActivity";
// ------------------estate and commercial customers------------------
import EstateListing from "../pages/franchisee/estate/EstateListing";
import CommercialCustomerListing from "../pages/franchisee/commercial/CommercialCustomers";
import ViewJob from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/ViewJobDetails";
import Diagnostic from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/diagnosticVisit/Diagnostic";
import SupplyReq from "../components/csecomponent/cse/dashboardComponent/supplier/SupplyReq";
import OngoingTemplate from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/OngoingTemplate";
import CompletionHome from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/CompletionHome";
import StaffHome from "../pages/cse/staffid/StaffHome";
import Warrantys from "../pages/cse/jobs/ongoingsJobsDetails/Warrantys";
import PreferenceHome from "../pages/cse/setting/PreferencesHome";
import AuthGuard from "../guards/AuthGuard";
import FranchiseeOnboardingGuard from "../guards/FranchiseeOnboardingGuard";
import TrainingCourses from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";
import CSEStage1Table from "../components/onboardingcomponents/cseonboarding/CSEStage1Table";
import CSEStage2Table from "../components/onboardingcomponents/cseonboarding/CSEStage2Table";
import CSEStage3Table from "../components/onboardingcomponents/cseonboarding/CSEStage3Table";
import CSEStage5Table from "../components/onboardingcomponents/cseonboarding/CSEStage5Table";
import CSEStage4Table from "../components/onboardingcomponents/cseonboarding/CSEStage4Table";
import ContactInitial from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/ContactInitial";
import Profile from "../components/layouts/settings/Profile";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import Notification from "../components/csecomponent/cse/dashboardComponent/jobs/ongoings/notification/Notification";
import DispatchEquipment from "../pages/franchisee/hire-request/EquipmentDispatch";
import JobMessages from "../pages/franchisee/jobs/Messages";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import GlobalAccountHome from "../components/globalcomponents/GlobalAccountHome";
import JobsHistory from "../components/csecomponent/cse/dashboardComponent/account/JobsHistory";
import Overviews from "../components/csecomponent/cse/dashboardComponent/account/Overviews";
import WalletIndex from "../pages/cse/wallet/WalletIndex";
import JobFix from "../pages/qamaster/wallet/JobFix";
import WalletReferral from "../components/globalcomponents/wallet/WalletReferral";
import WithdrawalHistory from "../pages/qamaster/wallet/WithdrawalHistory";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";

const FranchiseeRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="franchisee" />}>
        {/* onboarding */}
        <Route element={<PreDashboard />}>
          {/* onboarding stage 1 */}
          <Route element={<FranchiseeOnboardingGuard stageId={1} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          {/* onboarding stage 2 */}
          <Route element={<FranchiseeOnboardingGuard stageId={2} />}>
            <Route path="preboarding-declarations" element={<Declaration />} />
          </Route>
          {/* onboarding stage 3 */}
          <Route element={<FranchiseeOnboardingGuard stageId={3} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* onboarding stage 4 */}
          <Route element={<FranchiseeOnboardingGuard stageId={4} />}>
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
          </Route>
          {/* onboarding stage 8 */}
          <Route element={<FranchiseeOnboardingGuard stageId={8} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>

          {/* onboarding stage 11 */}
          <Route element={<FranchiseeOnboardingGuard stageId={11} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>

        {/* onboarding stage 5 */}
        <Route element={<FranchiseeOnboardingGuard stageId={5} />}>
          <Route path="training" element={<FranchiseeCourses />} />
          <Route path="training/materials" element={<Materials />} />
          {/* <Route path="franchisee/exams" element={<FranchiseeExam />} /> */}
        </Route>

        {/* franchisee exams */}
        <Route path="my-training/exam/:folderId" element={<ExamPage />} />

        {/* completed onboarding */}
        <Route path="/" element={<CollaboratorsDashboard />}>
          {/* dashboard */}
          <Route index path="dashboard" element={<FranchiseeHome />} />
          <Route path="job-management">
            <Route index element={<JobManagement />} />
            <Route path="unassigned" element={<UnassignedJobs />} />
            <Route
              path="urgent-unassigned"
              element={<UrgentUnassignedJobs />}
            />
            <Route path="ongoing" element={<OngoingJobs />} />
            <Route path="rejected" element={<RejectedJobs />} />
            <Route path="completed" element={<CompletedJobs />} />
            <Route path="warranty" element={<Warranty />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="my-jobs/completed" element={<MyCompletedJobs />} />
            <Route path="my-jobs/:fixId" element={<OngoingTemplate />}>
              <Route index path="job-details" element={<ViewJob />} />
              <Route path="initial-contact" element={<ContactInitial />} />
              <Route path="diagnostic-visits" element={<Diagnostic />} />
              <Route path="supplies" element={<SupplyReq />} />
              <Route path="completion" element={<CompletionHome />} />
              <Route path="warranty" element={<Warrantys />} />
              <Route path="diagnostic-visit" element={<DiagnosticVisit />} />
              <Route path="notification" element={<Notification />} />
              {/* <Route path="messages" element={<JobMessages />} /> */}
            </Route>
          </Route>
          <Route path="referrals" element={<CollaboratorReferral />} />
          <Route path="account">
            <Route index element={<GlobalAccountHome collaborator={true} />} />
            <Route path="jobs-history" element={<JobsHistory />} />
            <Route path="account-history" element={<Overviews />} />{" "}
          </Route>
          <Route path="wallet">
            <Route index element={<WalletIndex />} />
            <Route path="jobs-earnings" element={<JobFix />} />
            <Route path="referrals-earning" element={<WalletReferral />} />
            <Route path="withdrawal-history" element={<WithdrawalHistory />} />
          </Route>
          <Route path="my-training">
            <Route index element={<TrainingCourses />} />
            <Route
              path="materials/:folderId"
              element={<Materials title="Franchisee Training" />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
            {/* franchisee exams */}
            <Route path="exam/:folderId" element={<ExamPage />} />
          </Route>
          <Route path="feedback-rating" element={<CollaboratorRating />} />

          <Route path="cse-onboarding" element={<CseOnboarding />}>
            <Route index element={<CSEStage1Table />} />
            <Route path="stage-1" element={<CSEStage1Table />} />
            <Route path="stage-2" element={<CSEStage2Table />} />
            <Route path="stage-3" element={<CSEStage3Table />} />
            <Route path="stage-4" element={<CSEStage4Table />} />
            <Route path="stage-5" element={<CSEStage5Table />} />
          </Route>
          <Route path="cse-managed" element={<CseManaged />} />
          <Route path="cse-training" element={<CseTraining />} />
          <Route path="cse-analysis/:id" element={<CseAnalysisReport />} />
          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="preferences" element={<PreferenceHome />} />
          </Route>
          <Route path="hire-requests" element={<HireRequests />} />
          <Route path="staff-id" element={<StaffHome />} />

          <Route path="equipment-management" element={<EquipmentMgt />} />
          <Route path="equipment-activity" element={<EquipmentActivity />} />
          <Route path="estate" element={<EstateListing />} />
          <Route path="equipment_dispatch" element={<DispatchEquipment />} />
          <Route
            path="commercial-customers"
            element={<CommercialCustomerListing />}
          />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default FranchiseeRoutes;
