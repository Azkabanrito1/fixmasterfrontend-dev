import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";

import Welcome from "../components/layouts/settings/Welcome";
import Materials from "../components/layouts/training/Materials";

//Cse
import ExamWelcome from "../components/layouts/exam/ExamWelcome";

//csePredashoard
import CseInterview from "../components/layouts/interview/Interview";
import StaffHome from "../pages/cse/staffid/StaffHome";
import AuthGuard from "../guards/AuthGuard";

import InterviewStarted from "../components/layouts/interview/InterviewWelcome";
import TrainingFolder from "../components/layouts/training/TrainingFolder";
import Declaration from "../components/layouts/settings/Declaration";
import GuarantorsInfo from "../components/layouts/settings/GuarantorsInfo";
import PreDashboard from "../components/layouts/dashboard/PreDashboard";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import ExamPage from "../components/layouts/exam/ExamPage";
import CollaboratorSettingsHome from "../components/layouts/settings/CollaboratorSettingsHome";

import CallHome from "../pages/callcenter/dashboard/CallHome";
import Profile from "../components/layouts/settings/Profile";
import PostDeclaration from "../components/layouts/settings/PostDeclaration";
import ManagementHome from "../pages/callcenter/callmanagement/ManagementHome";
import MissedCall from "../components/callcentercomponent/management/MissedCall";
import ReceivedCall from "../components/callcentercomponent/management/ReceivedCall";
import LogsHome from "../pages/callcenter/callmanagement/LogsHome";
import CallAction from "../pages/callcenter/callmanagement/CallAction";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import CcoOnboardingGuard from "../guards/CcoOnboardingGuard";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";

const CcoRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole={"cco"} />}>
        <Route element={<PreDashboard />}>
          <Route element={<CcoOnboardingGuard stageId={1} />}>
            <Route
              path="exam/welcome"
              element={<ExamWelcome collaborator={"CCO"} messageType={"mcq"} />}
            />
          </Route>
          <Route
            path="call-center/exam"
            element={<ExamPage examType="general" collaborator={"CCO"} />}
          />
          <Route element={<CcoOnboardingGuard stageId={3} />}>
            <Route path="startinterview" element={<InterviewStarted />} />
            <Route
              path="interview"
              element={<CseInterview collaborator={"CCO"} />}
            />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={6} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={2} />}>
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={8} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={9} />}>
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={13} />}>
            <Route path="post-declarations" element={<PostDeclaration />} />
          </Route>
          <Route element={<CcoOnboardingGuard stageId={17} />}>
            <Route path="onboarding-welcome" element={<Welcome />} />
          </Route>
        </Route>
        <Route path="my-training/exam/:folderId" element={<ExamPage collaborator={"CCO"} />} />
        <Route path="exam" element={<ExamPage examType="general" collaborator={"CCO"} />} />

        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<CallHome />} />
          <Route path="dashboard" element={<CallHome />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
          <Route path="my-training">
            <Route index element={<TrainingFolder />} />
            <Route
              path="materials/:folderId"
              element={<Materials title={"My Training"} />}
            />
            <Route
              path="materials/:folderId/"
              element={<Materials title={"My Training"} />}
            />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>
          <Route path="settings">
            <Route index element={<CollaboratorSettingsHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guarantor-info" element={<GuarantorsInfo />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="pre-declarations" element={<Declaration />} />
          </Route>
          <Route path="call-management" element={<ManagementHome />} />
          <Route path="call-logs">
            <Route index element={<LogsHome />} />
            <Route path="missed" element={<MissedCall />} />
            <Route path="received" element={<ReceivedCall />} />
          </Route>
          <Route path="call-actions">
            <Route index element={<CallAction />} />
          </Route>
        </Route>
        <Route path="staff-id" element={<StaffHome />} />
      </Route>
    </Routes>
  );
};
export default CcoRoutes;
