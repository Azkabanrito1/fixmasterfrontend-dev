import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import CollaboratorMgmtOptions from "../pages/admin/usermanagement/CollaboratorMgmtOptions";
import CSEManaged from "../pages/admin/usermanagement/cse/CSEManaged";
import CollaboratorWorkingType from "../pages/admin/usermanagement/admin/CollaboratorWorkingType";
import ActiveCSEs from "../pages/admin/usermanagement/cse/ActiveCSE";
import CSELogDetails from "../pages/admin/usermanagement/cse/CSELogDetails";
import RejectedCSE from "../pages/admin/usermanagement/cse/RejectedCSE";
import FirstRejectedTable from "../components/admincomponents/usermanagement/FirstRejectedTable";
import LastRejectedTable from "../components/admincomponents/usermanagement/LastRejectedTable";
import CseOnboarding from "../pages/franchisee/cse-management/CseOnboarding";
import CSEStage1Table from "../components/onboardingcomponents/cseonboarding/CSEStage1Table";
import CSEStage2Table from "../components/onboardingcomponents/cseonboarding/CSEStage2Table";
import CSEStage3Table from "../components/onboardingcomponents/cseonboarding/CSEStage3Table";
import CSEStage4Table from "../components/onboardingcomponents/cseonboarding/CSEStage4Table";
import CSEStage5Table from "../components/onboardingcomponents/cseonboarding/CSEStage5Table";
import CollaboratorDeclarationOptions from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationOptions";
import CollaboratorDeclarationsLayout from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationsLayout";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";
import Profile from "../components/layouts/settings/Profile";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreferencesHome from "../pages/cse/setting/PreferencesHome";
import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
import Declaration from "../components/layouts/settings/Declaration";
import CollaboratorTrainingOptions from "../components/admincomponents/usermanagement/training/CollaboratorTrainingOptions";
import CollaboratorTrainingHome from "../components/admincomponents/usermanagement/training/CollaboratorTrainingHome";
import WelcomeMessagesHome from "../pages/admin/usermanagement/welcome-messages/WelcomeMessagesHome";
import WelcomeMessageLayout from "../pages/admin/usermanagement/welcome-messages/WelcomeMessageLayout";
import CseAdminHome from "../pages/admin/usermanagement/cseadmin/CseAdminHome";
import AuthGuard from "../guards/AuthGuard";
import CommentToMgmt from "../components/hrcomponents/dashboard/CommentToMgmt";

const CseAdminRoute = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="cse admin" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<CseAdminHome />} />
          <Route path="dashboard" element={<CseAdminHome />} />
          <Route path="cse-onboarding" element={<CseOnboarding />}>
            <Route index element={<CSEStage1Table />} />
            <Route path="stage-1" element={<CSEStage1Table />} />
            <Route path="stage-2" element={<CSEStage2Table />} />
            <Route path="stage-3" element={<CSEStage3Table />} />
            <Route path="stage-4" element={<CSEStage4Table />} />
            <Route path="stage-5" element={<CSEStage5Table />} />
          </Route>
          <Route path="cse-managed">
            <Route index element={<CSEManaged />} />
            <Route
              path="cse-working-type"
              element={<CollaboratorWorkingType role={`CSE`} />}
            />
            <Route path="active" element={<ActiveCSEs />} />
            <Route path="log" element={<CSELogDetails />} />
            <Route path="rejected" element={<RejectedCSE />}>
              <Route index element={<FirstRejectedTable role="cse" />} />
              <Route path="first" element={<FirstRejectedTable role="cse" />} />
              <Route path="last" element={<LastRejectedTable role="cse" />} />
            </Route>
            <Route path="new" element={<CseOnboarding />}>
              <Route index element={<CSEStage1Table />} />
              <Route path="stage-1" element={<CSEStage1Table />} />
              <Route path="stage-2" element={<CSEStage2Table />} />
              <Route path="stage-3" element={<CSEStage3Table />} />
              <Route path="stage-4" element={<CSEStage4Table />} />
              <Route path="stage-5" element={<CSEStage5Table />} />
            </Route>
          </Route>

          <Route path="cse-training">
            <Route
              index
              element={<CollaboratorMgmtOptions collaborator={"CSE"} />}
            />
            <Route path="welcome-messages">
              <Route
                index
                element={<WelcomeMessagesHome collaborator="Franchisee" />}
              />
              <Route
                path="preboarding"
                element={
                  <WelcomeMessageLayout
                    collaborator={"Franchisee"}
                    messageType="preboarding"
                  />
                }
              />
              <Route
                path="onboarding"
                element={
                  <WelcomeMessageLayout
                    collaborator={"Franchisee"}
                    messageType="onboarding"
                  />
                }
              />
            </Route>

            <Route path="training">
              <Route index element={<CollaboratorTrainingOptions />} />
              <Route
                path="onboarding"
                element={
                  <CollaboratorTrainingHome
                    testTypeId={4}
                    trainingType={"onboarding"}
                    useCategory={false}
                    useDuration={false}
                    role="Franchisee"
                  />
                }
              />
              <Route
                path="active"
                element={
                  <CollaboratorTrainingHome
                    testTypeId={14}
                    trainingType={"active"}
                    useCategory={false}
                    useDuration={false}
                    role="Franchisee"
                  />
                }
              />
            </Route>
            <Route path="managed">
              <Route index element={<CSEManaged />} />
              <Route
                path="cse-working-type"
                element={<CollaboratorWorkingType role={`CSE`} />}
              />
              <Route path="active" element={<ActiveCSEs />} />
              <Route path="log" element={<CSELogDetails />} />
              <Route path="rejected" element={<RejectedCSE />}>
                <Route index element={<FirstRejectedTable role="cse" />} />
                <Route
                  path="first"
                  element={<FirstRejectedTable role="cse" />}
                />
                <Route path="last" element={<LastRejectedTable role="cse" />} />
              </Route>
              <Route path="new" element={<CseOnboarding />}>
                <Route index element={<CSEStage1Table />} />
                <Route path="stage-1" element={<CSEStage1Table />} />
                <Route path="stage-2" element={<CSEStage2Table />} />
                <Route path="stage-3" element={<CSEStage3Table />} />
                <Route path="stage-4" element={<CSEStage4Table />} />
                <Route path="stage-5" element={<CSEStage5Table />} />
              </Route>
            </Route>
            <Route path="declarations">
              <Route
                index
                element={
                  <CollaboratorDeclarationOptions collaborator={"CSE"} />
                }
              />
              <Route
                path="preboarding"
                element={
                  <CollaboratorDeclarationsLayout
                    collaborator={"CSE"}
                    stageName={"Preboarding"}
                  />
                }
              />
              <Route
                path="onboarding"
                element={
                  <CollaboratorDeclarationsLayout
                    collaborator={"CSE"}
                    stageName={"Onboarding"}
                  />
                }
              />
            </Route>
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
export default CseAdminRoute;
