import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthGuard from "../guards/AuthGuard";

import NewFranchisee from "../pages/admin/usermanagement/franchisee/NewFranchisee";
import NewQaMaster from "../pages/admin/usermanagement/qamaster/NewQaMaster";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import CollaboratorMgmtOptions from "../pages/admin/usermanagement/CollaboratorMgmtOptions";
import FranchiseeStage1 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage1";
import FranchiseeStage2 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage2";
import FranchiseeStage3 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage3";
import QAStage1Table from "../components/onboardingcomponents/qamasteronboarding/QAStage1Table";
import QAStage2Table from "../components/onboardingcomponents/qamasteronboarding/QAStage2Table";
import QAStage3Table from "../components/onboardingcomponents/qamasteronboarding/QAStage3Table";
import HrAdminHome from "../pages/hr/HrAdminHome";
import FranchiseeStage4 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage4";
import QaStage4Table from "../components/onboardingcomponents/qamasteronboarding/QaStage4Table";
import UserOnboarding from "../pages/hr/usermanagement/UserOnboarding";
import UserManage from "../pages/hr/usermanagement/UserManage";
import CommentToMgmt from "../components/hrcomponents/dashboard/CommentToMgmt";

const HrRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="hr admin" />}>
        {/* <Route path="/hr-admin/dashboard" element={<HrDashboard />} /> */}
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<HrAdminHome />} />
          <Route path="dashboard" element={<HrAdminHome />} />
          <Route path="user-mgmt">
            <Route index element={<UserOnboarding />} />
            <Route path="new-franchisee" element={<NewFranchisee />}>
              <Route index element={<FranchiseeStage1 />} />
              <Route path="stage-1" element={<FranchiseeStage1 />} />
              <Route path="stage-2" element={<FranchiseeStage2 />} />
              <Route path="stage-3" element={<FranchiseeStage3 />} />
              <Route path="stage-4" element={<FranchiseeStage4 />} />
            </Route>
            <Route path="new-qa" element={<NewQaMaster />}>
              <Route index element={<QAStage1Table />} />
              <Route path="stage-1" element={<QAStage1Table />} />
              <Route path="stage-2" element={<QAStage2Table />} />
              <Route path="stage-3" element={<QAStage3Table />} />
              <Route path="stage-4" element={<QaStage4Table />} />{" "}
            </Route>
          </Route>
          <Route path="users-managed">
            <Route index element={<UserManage />} />
            <Route path="manage-franchisee">
              <Route
                index
                element={
                  <CollaboratorMgmtOptions collaborator={"Franchisee"} />
                }
              />
            </Route>
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
export default HrRoutes;
