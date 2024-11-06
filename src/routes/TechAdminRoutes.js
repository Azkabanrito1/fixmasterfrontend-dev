import { Routes, Route } from "react-router-dom";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import AuthGuard from "../guards/AuthGuard";
import TechnicianAdminHome from "../pages/admin/usermanagement/technician-admin/TechnicianAdminHome";
import TechnicianManaged from "../pages/admin/usermanagement/technician/TechnicianManaged";
import ActiveTechnicians from "../pages/admin/usermanagement/technician/ActiveTechnicians";
import TechnicianMappings from "../pages/admin/usermanagement/technician/TechnicianMappings";
import CollaboratorWorkingType from "../pages/admin/usermanagement/admin/CollaboratorWorkingType";
import NewTechnician from "../pages/admin/usermanagement/technician/NewTechnician";
import StageOne from "../pages/qamaster/techmanagement/StageOne";
import StageTwo from "../pages/qamaster/techmanagement/StageTwo";
import StageThree from "../pages/qamaster/techmanagement/StageThree";
import StageFour from "../pages/qamaster/techmanagement/StageFour";
import StageFive from "../pages/qamaster/techmanagement/StageFive";
import RejectedTechnician from "../pages/admin/usermanagement/technician/RejectedTechnicians";
import FirstRejectedTable from "../components/admincomponents/usermanagement/FirstRejectedTable";
import LastRejectedTable from "../components/admincomponents/usermanagement/LastRejectedTable";
import TechnicianLogDetails from "../pages/admin/usermanagement/technician/TechnicianLogDetails";
import CollaboratorDeclarationOptions from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationOptions";
import CollaboratorDeclarationsLayout from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationsLayout";
import WelcomeMessagesHome from "../pages/admin/usermanagement/welcome-messages/WelcomeMessagesHome";
import WelcomeMessageLayout from "../pages/admin/usermanagement/welcome-messages/WelcomeMessageLayout";
import CollaboratorTrainingOptions from "../components/admincomponents/usermanagement/training/CollaboratorTrainingOptions";
import CollaboratorTrainingHome from "../components/admincomponents/usermanagement/training/CollaboratorTrainingHome";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";
import Profile from "../components/layouts/settings/Profile";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreferencesHome from "../pages/cse/setting/PreferencesHome";
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
import Declaration from "../components/layouts/settings/Declaration";
import CommentToMgmt from "../components/hrcomponents/dashboard/CommentToMgmt";

const TechnicianAdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="technician admin" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<TechnicianAdminHome />} />
          <Route path="dashboard" element={<TechnicianAdminHome />} />

          <Route path="tech-onboarding">
            <Route index element={<TechnicianManaged />} />
            <Route path="active" element={<ActiveTechnicians />} />
            <Route path="mappings" element={<TechnicianMappings />} />
            <Route
              path="technician-working-type"
              element={<CollaboratorWorkingType role={`Technician`} />}
            />
            <Route path="new" element={<NewTechnician />}>
              <Route index element={<StageOne />} />
              <Route path="stage-1" element={<StageOne />} />
              <Route path="stage-2" element={<StageTwo />} />
              <Route path="stage-3" element={<StageThree />} />
              <Route path="stage-4" element={<StageFour />} />
              <Route path="stage-5" element={<StageFive />} />
            </Route>
            <Route path="rejected" element={<RejectedTechnician />}>
              <Route index element={<FirstRejectedTable role="technician" />} />
              <Route
                path="first"
                element={<FirstRejectedTable role="technician" />}
              />
              <Route
                path="last"
                element={<LastRejectedTable role="technician" />}
              />
            </Route>
            <Route path="log" element={<TechnicianLogDetails />} />
          </Route>
          <Route path="declarations">
            <Route
              index
              element={
                <CollaboratorDeclarationOptions collaborator={"Technician"} />
              }
            />
            <Route
              path="preboarding"
              element={
                <CollaboratorDeclarationsLayout
                  collaborator={"Technician"}
                  stageName={"Preboarding"}
                />
              }
            />
            <Route
              path="onboarding"
              element={
                <CollaboratorDeclarationsLayout
                  collaborator={"Technician"}
                  stageName={"Onboarding"}
                />
              }
            />
          </Route>
          <Route path="welcome-messages">
            <Route
              index
              element={
                <WelcomeMessagesHome
                  hasInterviewStage={true}
                  hasMCQStage={true}
                  collaborator="Technician"
                />
              }
            />
            <Route
              path="preboarding"
              element={
                <WelcomeMessageLayout
                  collaborator={"Technician"}
                  messageType="preboarding"
                />
              }
            />
            <Route
              path="onboarding"
              element={
                <WelcomeMessageLayout
                  collaborator={"Technician"}
                  messageType="onboarding"
                />
              }
            />
            <Route
              path="preboarding"
              element={
                <WelcomeMessageLayout
                  collaborator={"Technician"}
                  messageType="interview"
                />
              }
            />
            <Route
              path="onboarding"
              element={
                <WelcomeMessageLayout
                  collaborator={"Technician"}
                  messageType="mcq"
                />
              }
            />
          </Route>

          <Route path="training">
            <Route
              index
              element={<CollaboratorTrainingOptions hasMCQStage={true} />}
            />
            <Route
              path="onboarding"
              element={
                <CollaboratorTrainingHome
                  testTypeId={7}
                  trainingType={"onboarding"}
                  useCategory={true}
                  useDuration={false}
                  role="Technician"
                />
              }
            />
            <Route
              path="active"
              element={
                <CollaboratorTrainingHome
                  testTypeId={16}
                  trainingType={"active"}
                  useCategory={true}
                  useDuration={false}
                  role="Technician"
                />
              }
            />
            <Route
              path="aptitude"
              element={
                <CollaboratorTrainingHome
                  testTypeId={6}
                  trainingType={"aptitude"}
                  useCategory={true}
                  useDuration={false}
                  role="Technician"
                />
              }
            />
          </Route>
          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route
              path="preferences"
              element={<PreferencesHome employmentType={true} />}
            />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route
            path="comment-to-management"
            element={<CommentToMgmt rowNumber={20} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default TechnicianAdminRoutes;
