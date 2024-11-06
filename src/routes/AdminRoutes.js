import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// --------------------------cse management--------------------
import CseOnboarding from "../pages/franchisee/cse-management/CseOnboarding";

import AuthGuard from "../guards/AuthGuard";

import TerritoriesHome from "../pages/admin/territories/TerritoriesHome";
import TerritoriesSetup from "../pages/admin/territories/TerritoriesSetup";
import EditTerritory from "../pages/admin/territories/EditTerritory";
import TerritoryDetails from "../pages/admin/territories/TerritoryDetails";
import TerritoryBonusnTargets from "../pages/admin/territories/TerritoryBonusnTargets";
import EditUplift from "../pages/admin/territories/EditUplift";
import EditTarget from "../pages/admin/territories/EditTarget";
import EditBonus from "../pages/admin/territories/EditBonus";
import AdminHome from "../pages/admin/DashboardHome";
import SubSettingsHome from "../pages/admin/subscriptions/SubSettingsHome";
import QuotationHome from "../pages/admin/quotation/QuotationHome";
import Discounts from "../pages/admin/discounts/Discounts";
import AllTargets from "../pages/admin/territories/AllTargets";
import AllBonuses from "../pages/admin/territories/AllBonuses";
import CreateTarget from "../pages/admin/territories/CreateTarget";
import CreateBonus from "../pages/admin/territories/CreateBonus";
import CreateUplift from "../pages/admin/territories/CreateUplift";
import CreateDiscount from "../pages/admin/discounts/CreateDiscount";
import PromosHome from "../pages/admin/promos/PromosHome";
import CreatePromo from "../pages/admin/promos/CreatePromo";
import UserManagementHome from "../pages/admin/usermanagement/UserManagementHome";
import FranchiseManaged from "../pages/admin/usermanagement/franchisee/FranchiseManaged";
import NewFranchisee from "../pages/admin/usermanagement/franchisee/NewFranchisee";
import QAMasterManaged from "../pages/admin/usermanagement/qamaster/QAMasterManaged";
import NewQaMaster from "../pages/admin/usermanagement/qamaster/NewQaMaster";
import AdminWarrantyHome from "../pages/admin/warranty/WarrantyHome";
import AdminLoyaltyHome from "../pages/admin/loyalty/LoyaltyHome";
import CreateLoyalty from "../pages/admin/loyalty/CreateLoyalty";
import ConfigureSubscription from "../pages/admin/subscriptions/ConfigureSubscription";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import TerritoryRateUplifts from "../pages/admin/territories/TerritoryRateUplifts";
import CreateWarranty from "../pages/admin/warranty/CreateWarranty";
import CreateQuotationParam from "../pages/admin/quotation/CreateQuotationParams";

// Admin
import AdminUserMgtHome from "../pages/admin/usermanagement/admin/AdminUserMgtHome";

import CollaboratorDeclarationOptions from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationOptions";
import CollaboratorDeclarationsLayout from "../pages/admin/usermanagement/declarations/CollaboratorDeclarationsLayout";
import CollaboratorMgmtOptions from "../pages/admin/usermanagement/CollaboratorMgmtOptions";
import CollaboratorTrainingOptions from "../components/admincomponents/usermanagement/training/CollaboratorTrainingOptions";
import CollaboratorTrainingHome from "../components/admincomponents/usermanagement/training/CollaboratorTrainingHome";
import CustomerManagementHome from "../pages/admin/usermanagement/customer/CustomerManagementHome";
import ActiveFranchisees from "../pages/admin/usermanagement/franchisee/ActiveFranchisee";
import ActiveQAs from "../pages/admin/usermanagement/qamaster/ActiveQaMaster";
import CSEManaged from "../pages/admin/usermanagement/cse/CSEManaged";
import ActiveCSEs from "../pages/admin/usermanagement/cse/ActiveCSE";
import TechnicianManaged from "../pages/admin/usermanagement/technician/TechnicianManaged";
import ActiveTechnicians from "../pages/admin/usermanagement/technician/ActiveTechnicians";
import SuppliersManaged from "../pages/admin/usermanagement/supplier/SuppliersManaged";
import ActiveSuppliers from "../pages/admin/usermanagement/supplier/ActiveSuppliers";
import CCOsManaged from "../pages/admin/usermanagement/cco/CCOManaged";
import ActiveCCOs from "../pages/admin/usermanagement/cco/ActiveCCOs";
import CSEStage1Table from "../components/onboardingcomponents/cseonboarding/CSEStage1Table";
import CSEStage2Table from "../components/onboardingcomponents/cseonboarding/CSEStage2Table";
import CSEStage3Table from "../components/onboardingcomponents/cseonboarding/CSEStage3Table";
import CSEStage5Table from "../components/onboardingcomponents/cseonboarding/CSEStage5Table";
import CSEStage4Table from "../components/onboardingcomponents/cseonboarding/CSEStage4Table";
import AdminUserMgtOptions from "../pages/admin/usermanagement/admin/AdminUserMgtOptions";
import NewSuppliers from "../pages/admin/usermanagement/supplier/NewSuppliers";
import SupplierStage1Table from "../components/admincomponents/usermanagement/onboarding/supplier/SupplierStage1Table";
import SupplierStage2Table from "../components/admincomponents/usermanagement/onboarding/supplier/SupplierStage2Table";
import NewCCOs from "../pages/admin/usermanagement/cco/NewCCOs";
import CCOStage1Table from "../components/admincomponents/usermanagement/onboarding/cco/CCOStage1Table";
import CCOStage2Table from "../components/admincomponents/usermanagement/onboarding/cco/CCOStage2Table";
import CCOStage3Table from "../components/admincomponents/usermanagement/onboarding/cco/CCOStage3Table";
import CCOStage4Table from "../components/admincomponents/usermanagement/onboarding/cco/CCOStage4Table";
import CCOStage5Table from "../components/admincomponents/usermanagement/onboarding/cco/CCOStage5Table";
import CreatedQuotationSettings from "../pages/admin/quotation/CreatedQuotationSettings";
import FranchiseeStage1 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage1";
import FranchiseeStage2 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage2";
import FranchiseeStage3 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage3";
import StageOne from "../pages/qamaster/techmanagement/StageOne";
import StageTwo from "../pages/qamaster/techmanagement/StageTwo";
import StageThree from "../pages/qamaster/techmanagement/StageThree";
import StageFour from "../pages/qamaster/techmanagement/StageFour";
import StageFive from "../pages/qamaster/techmanagement/StageFive";
import QAStage1Table from "../components/onboardingcomponents/qamasteronboarding/QAStage1Table";
import QAStage2Table from "../components/onboardingcomponents/qamasteronboarding/QAStage2Table";
import QAStage3Table from "../components/onboardingcomponents/qamasteronboarding/QAStage3Table";
import NewTechnician from "../pages/admin/usermanagement/technician/NewTechnician";
import TechnicianMappings from "../pages/admin/usermanagement/technician/TechnicianMappings";
import FranchiseeStage4 from "../components/onboardingcomponents/franchiseeonboarding/FranchiseeStage4";
import QaStage4Table from "../components/onboardingcomponents/qamasteronboarding/QaStage4Table";
import SupplierStage3Table from "../components/admincomponents/usermanagement/onboarding/supplier/SupplierStage3Table";
import PdfPage from "../components/globalcomponents/PdfPage";
import VideoPage from "../components/globalcomponents/VideoPage";
import WelcomeMessagesHome from "../pages/admin/usermanagement/welcome-messages/WelcomeMessagesHome";
import GuarantorHome from "../pages/admin/guarantor/GuarantorHome";
import GuarantorSettings from "../pages/admin/guarantor/GuarantorSettings";
import PreferenceIndex from "../pages/admin/preference/PreferenceIndex";
import WelcomeMessageLayout from "../pages/admin/usermanagement/welcome-messages/WelcomeMessageLayout";
import TrainingFolderFiles from "../components/admincomponents/usermanagement/training/TrainingFolderFiles";
import TrainingFolderMcqs from "../components/admincomponents/usermanagement/training/TrainingFolderMcqs";
import ViewSubscribers from "../pages/admin/subscriptions/ViewSubscribers";
import CollaboratorWorkingType from "../pages/admin/usermanagement/admin/CollaboratorWorkingType";
import OngoingJobs from "../pages/admin/jobs/OngoingJobs";
import RejectedTechnician from "../pages/admin/usermanagement/technician/RejectedTechnicians";
import RejectedQaMasters from "../pages/admin/usermanagement/qamaster/RejectedQaMasters";
import RejectedSuppliers from "../pages/admin/usermanagement/supplier/RejectedSuppliers";
import RejectedFranchisees from "../pages/admin/usermanagement/franchisee/RejectedFranchisees";
import RejectedCSE from "../pages/admin/usermanagement/cse/RejectedCSE";
import RejectedCCO from "../pages/admin/usermanagement/cco/RejectedCCOs";
import QaMasterLogDetails from "../pages/admin/usermanagement/qamaster/QaMasterLogDetails";
import TechnicianLogDetails from "../pages/admin/usermanagement/technician/TechnicianLogDetails";
import SupplierLogDetails from "../pages/admin/usermanagement/supplier/SupplierLogDetails";
import FranchiseeLogDetails from "../pages/admin/usermanagement/franchisee/FranchiseeLogDetails";
import CSELogDetails from "../pages/admin/usermanagement/cse/CSELogDetails";
import CCOLogDetails from "../pages/admin/usermanagement/cco/CCOLogDetails";
import CustomerLogDetails from "../pages/admin/usermanagement/customer/CustomerLogDetails";
import FirstRejectedTable from "../components/admincomponents/usermanagement/FirstRejectedTable";
import LastRejectedTable from "../components/admincomponents/usermanagement/LastRejectedTable";
import PreferenceMasters from "../pages/admin/preference/PreferenceMaster";
import AboutFmMgmt from "../components/admincomponents/aboutfmmgmt/AboutFmMgmt";
import AboutFmFilesCard from "../components/admincomponents/aboutfmmgmt/AboutFmFilesCard";
import MasterDataHome from "../pages/admin/masterdata/MasterDataHome";
import CustomerTypes from "../pages/admin/masterdata/CustomerType";
import AccademicsQualificationHome from "../pages/admin/masterdata/AccademicsQualificationHome";
import SpecializationHome from "../pages/admin/masterdata/SpecializationHome";
import LanguageHome from "../components/admincomponents/masterdata/LanguageHome";
import ServicesType from "../pages/admin/masterdata/ServicesType";
import CollaboratorOnboarding from "../pages/admin/usermanagement/onboardingrequirement/CollaboratorOnboarding";
import InterviewGradingParameters from "../pages/admin/usermanagement/onboardingrequirement/InterviewGradingParameters";
import CommentToMgmt from "../components/hrcomponents/dashboard/CommentToMgmt";
import ApplicationForm from "../pages/admin/usermanagement/onboardingrequirement/ApplicationForm";
import Withdrawals from "../pages/admin/withdrawals/Withdrawals";
import AdminTermsAndConditions from "../components/admincomponents/aboutfmmgmt/AdminTermsAndConditions";
import CreateJobBookingFee from "../components/admincomponents/booking-fee/CreateJobBookingFee";
import JobBookingFees from "../components/admincomponents/booking-fee/JobBookingFees";
import CollaboratorRatingParameterHome from "../pages/admin/usermanagement/ratingparameter/CollaboratorRatingParameterHome";
import SlaMgt from "../pages/admin/masterdata/SlaMgt";
import CreateSla from "../pages/admin/masterdata/SLA/CreateSla";
import EquipmentToFix from "../pages/admin/masterdata/EquipmentToFix";
import ServiceListing from "../pages/admin/masterdata/ServiceListing";
import BookingClass from "../pages/admin/masterdata/BookingClass";
import CategoryManagement from "../pages/category/CategoryManagement";
import SubCategories from "../pages/category/SubCategories";
import CollaboratorTerritoryBonusSetting from "../pages/admin/territories/CollaboratorTerritoryBonusSetting";
import SuspendedFranchisees from "../pages/admin/usermanagement/franchisee/SuspendedFranchisees";
import SuspendedCSEs from "../pages/admin/usermanagement/cse/SuspendedCSEs";
import SuspendedTechnicians from "../pages/admin/usermanagement/technician/SuspendedTechnicians";
import SuspendedSuppliers from "../pages/admin/usermanagement/supplier/SuspendedSuppliers";
import SuspendedCCOs from "../pages/admin/usermanagement/cco/SuspendedCCOs";
import SuspendedQaMasters from "../pages/admin/usermanagement/qamaster/SuspendedQaMasters";
import ViewDetails from "../components/admincomponents/masterdata/ViewDetails";
import SubCategory from "../pages/admin/masterdata/SubCategory";
import CollaboratorBankDetails from "../components/admincomponents/bank-details/CollaboratorBankDetails";
import ViewServiceByCategory from "../components/admincomponents/masterdata/ViewServiceByCategory";
import FailedMCQMessage from "../pages/admin/usermanagement/welcome-messages/FailedMCQMessage";
import PassedMCQMessage from "../pages/admin/usermanagement/welcome-messages/PassedMCQMessage";
import RetakeMCQMessage from "../pages/admin/usermanagement/welcome-messages/RetakeMCQMessage";
import CollaboratorRateUplifts from "../pages/admin/territories/CollaboratorRateUplifts";
import JobSettings from "../pages/admin/jobs/JobSettings";
import Unassigned from "../pages/admin/jobs/Unassigned";
import JobsManaged from "../pages/admin/jobs/JobsManaged";
import CompletedJobs from "../pages/admin/jobs/CompletedJobs";
import WarrantyJobs from "../pages/admin/jobs/WarrantyJobs";
import RejectedJobs from "../pages/admin/jobs/RejectedJobs";
import JobsEarnings from "../pages/admin/jobs/JobsEarnings";
import TechnicianEarnings from "../pages/admin/jobs/TechnicianEarnings";
import Navbar from "../components/admincomponents/jobs/EarningNav";
import CseFullTimeEarnings from "../pages/admin/jobs/CseFullTimeEarnings";
import CseContractEarnings from "../pages/admin/jobs/CseContractEarnings";
import CseFreelanceEarnings from "../pages/admin/jobs/CseFreelanceEarnings";
import LogisticsHome from "../pages/admin/logistics/LogisticsHome";
import GuarantorsInfo from "../pages/admin/usermanagement/admin/GuarantorsInfo";
import ViewType from "../components/admincomponents/jobs/ViewType";
import FranchiseeEarnings from "../pages/admin/jobs/FranchiseeEarnings";
import QaMasterEarnings from "../pages/admin/jobs/QaMasterEarnings";
import TerritoryCategories from "../pages/admin/masterdata/TerritoryCategories";
import Customers from "../pages/admin/usermanagement/customer/Customers";
import RatingTypes from "../pages/admin/usermanagement/ratingparameter/RatingTypes";
import ReferralsManagement from "../pages/admin/referrals/ReferralsManagement";
import ReferralSetUp from "../pages/admin/referrals/ReferralSetUp";
import ReferralRecords from "../pages/admin/referrals/ReferralRecords";
import TextEditor from "../pages/admin/TextEditor";
import ReferralDetails from "../pages/admin/referrals/ReferralDetails";
import RatingBonus from "../pages/admin/usermanagement/ratingparameter/RatingBonus";
import RatingDefault from "../pages/admin/usermanagement/ratingparameter/RatingDefault";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="super admin" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminHome />} />

          {/* notification editor */}
          {/* <Route path="editor" element={<TextEditor />} /> */}
          <Route
            path="comment-to-management"
            element={<CommentToMgmt rowNumber={20} />}
          />
          <Route path="discounts">
            <Route index element={<Discounts />} />
            <Route path="create" element={<CreateDiscount />} />
            <Route path="edit/:discountId" element={<CreateDiscount />} />
          </Route>

          <Route path="promos">
            <Route index element={<PromosHome />} />
            <Route path="create" element={<CreatePromo />} />
          </Route>

          <Route path="preferences-management">
            <Route index element={<PreferenceIndex />} />
            <Route path="customers" element={<PreferenceMasters />} />
          </Route>

          <Route path="loyalties">
            <Route index element={<AdminLoyaltyHome />} />
            <Route path="create" element={<CreateLoyalty />} />
          </Route>

          <Route path="quotation">
            <Route index element={<QuotationHome />} />
            <Route path="settings" element={<CreatedQuotationSettings />} />
            <Route path="create" element={<CreateQuotationParam />} />
            <Route path="logistics" element={<LogisticsHome />} />
          </Route>

          <Route path="subscription">
            <Route index element={<SubSettingsHome />} />
            <Route path="details/:subId" element={<ConfigureSubscription />} />
            <Route
              path="configure/:subId"
              element={<ConfigureSubscription />}
            />
            <Route
              path="view-subscribers/:subId"
              element={<ViewSubscribers />}
            />
          </Route>
          {/* set up management */}
          <Route path="setup-mgt">
            <Route index element={<MasterDataHome />} />
            <Route path="academic" element={<AccademicsQualificationHome />} />
            <Route path="specializations" element={<SpecializationHome />} />
            <Route path="language" element={<LanguageHome />} />
            <Route path="equipment" element={<EquipmentToFix />} />
            <Route
              path="territory-categories"
              element={<TerritoryCategories />}
            />

            <Route path="sla-mgt">
              <Route index element={<SlaMgt />} />
              <Route path="new" element={<CreateSla />} />
            </Route>
          </Route>

          {/* categories set up */}
          <Route path="category-management">
            <Route index element={<CategoryManagement />} />
            <Route path="category" element={<SpecializationHome />} />
            <Route path="sub-category" element={<SubCategories />} />
            <Route path="service-listing" element={<ServiceListing />} />
            <Route
              path="category/details/:id"
              element={<ViewDetails title="Category Details" />}
            />
            <Route path="sub-category/:id" element={<SubCategory />} />
            <Route
              path="sub-category/details/:id"
              element={<ViewDetails title="Subcategory Details" />}
            />
            <Route
              path="services/details/:id"
              element={<ViewServiceByCategory />}
            />
          </Route>

          <Route path="referrals-mgt">
            <Route index element={<ReferralsManagement />} />
            <Route path="create/referrals" element={<ReferralSetUp />} />
            <Route path="referrals-records" element={<ReferralRecords />} />
            <Route path="referrals-records/:id" element={<ReferralDetails />} />
          </Route>

          <Route path="territories">
            <Route index element={<TerritoriesHome />} />
            <Route path="setup" element={<TerritoriesSetup />} />
            <Route path=":id/info" element={<TerritoryDetails />} />
            <Route path=":id/edit" element={<TerritoriesSetup />} />

            {/* territories bonus n targets */}
            <Route path=":id/bonus-targets">
              <Route index element={<TerritoryBonusnTargets />} />
              <Route path=":collaborator">
                <Route index element={<CollaboratorTerritoryBonusSetting />} />
                {/* targets for each collaborator */}
                <Route path="targets" element={<AllTargets />} />
                <Route path="create-target" element={<CreateTarget />} />
                <Route path="edit-target/:targetId" element={<EditTarget />} />

                {/* bonuses for each collaborator */}
                <Route path="bonuses" element={<AllBonuses />} />
                <Route path="create-bonus" element={<CreateBonus />} />
                <Route path="edit-bonus/:bonusId" element={<EditBonus />} />
              </Route>
            </Route>

            {/* territory rate uplifts */}
            <Route path=":id/rate-uplifts/">
              <Route index element={<TerritoryRateUplifts />} />
              <Route path=":collaborator">
                <Route index element={<CollaboratorRateUplifts />} />
                <Route path="create-uplift" element={<CreateUplift />} />
                <Route path="edit-uplift/:upliftId" element={<EditUplift />} />
              </Route>
            </Route>
          </Route>

          <Route path="guarantor-settings">
            <Route index element={<GuarantorHome />} />
            <Route path="requirements" element={<GuarantorSettings />} />
          </Route>

          <Route path="warranty-management">
            <Route index element={<AdminWarrantyHome />} />
            <Route path="create" element={<CreateWarranty />} />
          </Route>

          <Route path="about-fm-mgt">
            <Route index element={<AboutFmMgmt />} />
            <Route path=":folderId" element={<AboutFmFilesCard />} />
          </Route>

          <Route
            path="terms-and-conditions"
            element={<AdminTermsAndConditions />}
          />

          {/* Routes to help in user training setup */}
          <Route path="training">
            <Route path=":folderId/files" element={<TrainingFolderFiles />} />
            <Route path=":folderId/mcqs" element={<TrainingFolderMcqs />} />
            <Route path="view-pdf" element={<PdfPage />} />
            <Route path="view-video" element={<VideoPage />} />
          </Route>
          {/*Job management */}
          <Route path="jobs-managed">
            <Route index element={<JobsManaged />} />
            <Route path="unassigned" element={<Unassigned />} />
            <Route path="ongoing" element={<OngoingJobs />} />
            <Route path="completed" element={<CompletedJobs />} />
            <Route path="warranty" element={<WarrantyJobs />} />
            <Route path="rejected" element={<RejectedJobs />} />
          </Route>

          {/* Job Settings */}
          <Route path="jobs-settings">
            <Route index element={<JobSettings />} />
            <Route path="booking-type" element={<BookingClass />} />
            <Route path="service-type" element={<ServicesType />} />
            <Route path="service-type/:id" element={<ViewType />} />
            <Route path="earnings-setting" element={<JobsEarnings />}>
              <Route
                index
                element={<FranchiseeEarnings collaborator="franchisee" />}
              />
              <Route
                path="franchisee"
                element={<FranchiseeEarnings collaborator="franchisee" />}
              />
              <Route
                path="qa-master"
                element={<QaMasterEarnings collaborator="Qa Master" />}
              />
              {/* <Route
                path="call-center"
                element={<FranchiseeEarnings collaborator="Call center" />}
              /> */}
              <Route path="cse" element={<Navbar />}>
                <Route
                  index
                  element={<CseFullTimeEarnings collaborator="cse" />}
                />
                <Route
                  path="full-time"
                  element={<CseFullTimeEarnings collaborator="cse" />}
                />
                <Route
                  path="contract"
                  element={<CseContractEarnings collaborator="cse" />}
                />
                <Route
                  path="freelance"
                  element={<CseFreelanceEarnings collaborator="cse" />}
                />
              </Route>
              <Route path="technician" element={<TechnicianEarnings />}>
                <Route
                  index
                  element={<CseFullTimeEarnings collaborator="technician" />}
                />
                <Route
                  path="full-time"
                  element={<CseFullTimeEarnings collaborator="technician" />}
                />
                <Route
                  path="contract"
                  element={<CseContractEarnings collaborator="technician" />}
                />
                <Route
                  path="freelance"
                  element={<CseFreelanceEarnings collaborator="technician" />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="job-booking-fee">
            <Route index element={<JobBookingFees />} />
            <Route path="create" element={<CreateJobBookingFee />} />
          </Route>

          {/* feedback and rating setup */}
          <Route path="feedback-rating">
            <Route index element={<CollaboratorRatingParameterHome />} />
            <Route path="rating-type" element={<RatingTypes />} />
            <Route path="rating-bonus" element={<RatingBonus />} />
            <Route path="rating-default" element={<RatingDefault />} />
          </Route>

          {/* User Management */}
          <Route path="user-mgmt">
            <Route index element={<UserManagementHome />} />

            <Route path="customer">
              <Route index element={<CustomerManagementHome />} />
              <Route path="customer-type" element={<CustomerTypes />} />
              <Route path=":type" element={<Customers />} />
              <Route path="log" element={<CustomerLogDetails />} />
            </Route>

            {/* franchisee */}
            <Route path="franchisee">
              <Route
                index
                element={
                  <CollaboratorMgmtOptions collaborator={"Franchisee"} />
                }
              />

              <Route path="managed">
                <Route index element={<FranchiseManaged />} />
                <Route path="new" element={<NewFranchisee />}>
                  <Route index element={<FranchiseeStage1 />} />
                  <Route path="stage-1" element={<FranchiseeStage1 />} />
                  <Route path="stage-2" element={<FranchiseeStage2 />} />
                  <Route path="stage-3" element={<FranchiseeStage3 />} />
                  <Route path="stage-4" element={<FranchiseeStage4 />} />
                </Route>
                <Route
                  path="franchisee-working-type"
                  element={<CollaboratorWorkingType role={`Franchisee`} />}
                />
                <Route path="rejected" element={<RejectedFranchisees />}>
                  <Route
                    index
                    element={<FirstRejectedTable role="franchisee" />}
                  />
                  <Route
                    path="first"
                    element={<FirstRejectedTable role="franchisee" />}
                  />
                  <Route
                    path="last"
                    element={<LastRejectedTable role="franchisee" />}
                  />
                </Route>
                <Route path="active" element={<ActiveFranchisees />} />
                <Route path="log" element={<FranchiseeLogDetails />} />
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"Franchisee"} />}
                />
                <Route path="suspended" element={<SuspendedFranchisees />} />
                <Route
                  path="bank-details"
                  element={
                    <CollaboratorBankDetails collaborator="Franchisee" />
                  }
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="Franchisee" />}
                />
                <Route
                  path="bank-details"
                  element={
                    <CollaboratorBankDetails collaborator="Franchisee" />
                  }
                />
              </Route>
              <Route path="declarations">
                <Route
                  index
                  element={
                    <CollaboratorDeclarationOptions
                      collaborator={"Franchisee"}
                    />
                  }
                />

                <Route
                  path="preboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"Franchisee"}
                      stageName={"Preboarding"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"Franchisee"}
                      stageName={"Onboarding"}
                    />
                  }
                />
              </Route>
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
                <Route
                  index
                  element={
                    <CollaboratorTrainingOptions collaborator={"Franchisee"} />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
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
                      useCategory={false}
                      useDuration={false}
                      role="Franchisee"
                    />
                  }
                />
              </Route>
              <Route path="onboarding">
                <Route index element={<CollaboratorOnboarding />} />
                {/* <Route path="application" element={<ApplicationForm />} /> */}
                <Route
                  path="interview"
                  element={
                    <InterviewGradingParameters collaborator={"Franchisee"} />
                  }
                />
              </Route>
            </Route>

            {/* CSE */}
            <Route path="cse">
              <Route
                index
                element={<CollaboratorMgmtOptions collaborator={"CSE"} />}
              />
              <Route path="managed">
                <Route index element={<CSEManaged />} />
                <Route
                  path="cse-working-type"
                  element={<CollaboratorWorkingType role={`CSE`} />}
                />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="cse" />}
                />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="cse" />}
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="CSE" />}
                />
                <Route path="active" element={<ActiveCSEs />} />
                <Route path="log" element={<CSELogDetails />} />
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"CSE"} />}
                />
                <Route path="suspended" element={<SuspendedCSEs />} />
                <Route path="rejected" element={<RejectedCSE />}>
                  <Route index element={<FirstRejectedTable role="cse" />} />
                  <Route
                    path="first"
                    element={<FirstRejectedTable role="cse" />}
                  />
                  <Route
                    path="last"
                    element={<LastRejectedTable role="cse" />}
                  />
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
              <Route path="welcome-messages">
                <Route
                  index
                  element={
                    <WelcomeMessagesHome
                      hasInterviewStage={true}
                      hasMCQStage={true}
                      collaborator="CSE"
                    />
                  }
                />
                <Route
                  path="preboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CSE"}
                      messageType="preboarding"
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CSE"}
                      messageType="onboarding"
                    />
                  }
                />
                <Route
                  path="interview"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CSE"}
                      messageType="interview"
                    />
                  }
                />
                <Route
                  path="mcq"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CSE"}
                      messageType="mcq"
                    />
                  }
                />
                <Route
                  path="mcq-passed"
                  element={
                    <PassedMCQMessage
                      collaborator={"CSE"}
                      messageType="mcq-passed"
                    />
                  }
                />
                <Route
                  path="mcq-failed"
                  element={
                    <FailedMCQMessage
                      collaborator={"CSE"}
                      messageType="mcq-failed"
                    />
                  }
                />
                <Route
                  path="mcq-retake"
                  element={
                    <RetakeMCQMessage
                      collaborator={"CSE"}
                      messageType="mcq-retake"
                    />
                  }
                />
              </Route>

              <Route path="training">
                <Route
                  index
                  element={
                    <CollaboratorTrainingOptions
                      hasInterviewStage={true}
                      hasMCQStage={true}
                      collaborator={"CSE"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CSE"
                    />
                  }
                />
                <Route
                  path="active"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CSE"
                    />
                  }
                />
                <Route
                  path="interview"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={true}
                      role="CSE"
                    />
                  }
                />
                <Route
                  path="aptitude"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CSE"
                    />
                  }
                />
              </Route>

              <Route path="onboarding">
                <Route
                  index
                  element={
                    <CollaboratorOnboarding hasStage1Requirements={true} />
                  }
                />
                <Route
                  path="interview"
                  element={<InterviewGradingParameters collaborator={"CSE"} />}
                />
                <Route
                  path="application"
                  element={<ApplicationForm role="CSE" hasVideo={true} />}
                />
              </Route>
            </Route>

            {/* Technician */}
            <Route path="technician">
              <Route
                index
                element={
                  <CollaboratorMgmtOptions collaborator={"Technician"} />
                }
              />

              <Route path="managed">
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
                  <Route
                    index
                    element={<FirstRejectedTable role="technician" />}
                  />
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
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"Technician"} />}
                />
                <Route path="suspended" element={<SuspendedTechnicians />} />
                <Route
                  path="bank-details"
                  element={
                    <CollaboratorBankDetails collaborator="Technician" />
                  }
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="Technician" />}
                />
                <Route
                  path="bank-details"
                  element={
                    <CollaboratorBankDetails collaborator="Technician" />
                  }
                />
              </Route>
              <Route path="declarations">
                <Route
                  index
                  element={
                    <CollaboratorDeclarationOptions
                      collaborator={"Technician"}
                    />
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
                <Route
                  path="mcq"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"Technician"}
                      messageType="mcq"
                    />
                  }
                />
                <Route
                  path="mcq-passed"
                  element={
                    <PassedMCQMessage
                      collaborator={"Technician"}
                      messageType="mcq-passed"
                    />
                  }
                />
                <Route
                  path="mcq-failed"
                  element={
                    <FailedMCQMessage
                      collaborator={"Technician"}
                      messageType="mcq-failed"
                    />
                  }
                />
                <Route
                  path="mcq-retake"
                  element={
                    <RetakeMCQMessage
                      collaborator={"Technician"}
                      messageType="mcq-retake"
                    />
                  }
                />
              </Route>

              <Route path="training">
                <Route
                  index
                  element={
                    <CollaboratorTrainingOptions
                      hasMCQStage={true}
                      collaborator={"Technician"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
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
                      useCategory={true}
                      useDuration={false}
                      role="Technician"
                    />
                  }
                />
                <Route
                  path="interview"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={true}
                      useDuration={true}
                      role="Technician"
                    />
                  }
                />
                <Route
                  path="aptitude"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={true}
                      useDuration={false}
                      role="Technician"
                    />
                  }
                />
              </Route>
              <Route path="onboarding">
                <Route
                  index
                  element={
                    <CollaboratorOnboarding hasStage1Requirements={true} />
                  }
                />
                <Route
                  path="application"
                  element={<ApplicationForm hasLanguage={true} />}
                />
                <Route
                  path="interview"
                  element={
                    <InterviewGradingParameters collaborator={"Technician"} />
                  }
                />
              </Route>
            </Route>

            {/* Supplier */}
            <Route path="supplier">
              <Route
                index
                element={<CollaboratorMgmtOptions collaborator={"Supplier"} />}
              />

              <Route path="managed">
                <Route index element={<SuppliersManaged />} />
                <Route path="new" element={<NewSuppliers />}>
                  <Route index element={<SupplierStage1Table />} />
                  <Route path="stage-1" element={<SupplierStage1Table />} />
                  <Route path="stage-2" element={<SupplierStage2Table />} />
                  <Route path="stage-3" element={<SupplierStage3Table />} />
                </Route>
                <Route
                  path="supplier-working-type"
                  element={<CollaboratorWorkingType role={`Supplier`} />}
                />
                <Route path="rejected" element={<RejectedSuppliers />}>
                  <Route
                    index
                    element={<FirstRejectedTable role="supplier" />}
                  />
                  <Route
                    path="first"
                    element={<FirstRejectedTable role="supplier" />}
                  />
                  <Route
                    path="last"
                    element={<LastRejectedTable role="supplier" />}
                  />
                </Route>
                <Route path="log" element={<SupplierLogDetails />} />
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"Supplier"} />}
                />
                <Route path="suspended" element={<SuspendedSuppliers />} />
                <Route path="active" element={<ActiveSuppliers />} />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="Supplier" />}
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="Supplier" />}
                />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="Supplier" />}
                />
              </Route>
              <Route path="declarations">
                <Route
                  index
                  element={
                    <CollaboratorDeclarationOptions collaborator={"Supplier"} />
                  }
                />
                <Route
                  path="preboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"Supplier"}
                      stageName={"Preboarding"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"Supplier"}
                      stageName={"Onboarding"}
                    />
                  }
                />
              </Route>
              <Route path="welcome-messages">
                <Route
                  index
                  element={<WelcomeMessagesHome collaborator="Supplier" />}
                />
                <Route
                  path="preboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"Supplier"}
                      messageType="preboarding"
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"Supplier"}
                      messageType="onboarding"
                    />
                  }
                />
              </Route>

              <Route path="training">
                <Route
                  index
                  element={
                    <CollaboratorTrainingOptions collaborator={"Supplier"} />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="Supplier"
                    />
                  }
                />
                <Route
                  path="active"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="Supplier"
                    />
                  }
                />
              </Route>
              <Route path="onboarding">
                <Route
                  index
                  element={
                    <CollaboratorOnboarding hasStage1Requirements={true} />
                  }
                />
                <Route
                  path="application"
                  element={<ApplicationForm hasLanguage={true} />}
                />
                <Route
                  path="interview"
                  element={
                    <InterviewGradingParameters collaborator={"Supplier"} />
                  }
                />
              </Route>
            </Route>

            {/* CCO */}
            <Route path="cco">
              <Route
                index
                element={<CollaboratorMgmtOptions collaborator={"CCO"} />}
              />

              <Route path="managed">
                <Route index element={<CCOsManaged />} />
                <Route
                  path="cco-working-type"
                  element={<CollaboratorWorkingType role={`CCO`} />}
                />
                <Route path="new" element={<NewCCOs />}>
                  <Route index element={<CCOStage1Table />} />
                  <Route path="stage-1" element={<CCOStage1Table />} />
                  <Route path="stage-2" element={<CCOStage2Table />} />
                  <Route path="stage-3" element={<CCOStage3Table />} />
                  <Route path="stage-4" element={<CCOStage4Table />} />
                  <Route path="stage-5" element={<CCOStage5Table />} />
                </Route>
                <Route path="rejected" element={<RejectedCCO />}>
                  <Route index element={<FirstRejectedTable role="cco" />} />
                  <Route
                    path="first"
                    element={<FirstRejectedTable role="cco" />}
                  />
                  <Route
                    path="last"
                    element={<LastRejectedTable role="cco" />}
                  />
                </Route>
                <Route path="active" element={<ActiveCCOs />} />
                <Route path="log" element={<CCOLogDetails />} />
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"CCO"} />}
                />
                <Route path="suspended" element={<SuspendedCCOs />} />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="CCO" />}
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="CCO" />}
                />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="CCO" />}
                />
              </Route>
              <Route path="declarations">
                <Route
                  index
                  element={
                    <CollaboratorDeclarationOptions collaborator={"CCO"} />
                  }
                />
                <Route
                  path="preboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"CCO"}
                      stageName={"Preboarding"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"CCO"}
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
                      collaborator="CCO"
                    />
                  }
                />
                <Route
                  path="preboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CCO"}
                      messageType={"preboarding"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CCO"}
                      messageType={"onboarding"}
                    />
                  }
                />
                <Route
                  path="interview"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CCO"}
                      messageType={"interview"}
                    />
                  }
                />
                <Route
                  path="mcq"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"CCO"}
                      messageType={"mcq"}
                    />
                  }
                />
                <Route
                  path="mcq-passed"
                  element={
                    <PassedMCQMessage
                      collaborator={"CCO"}
                      messageType="mcq-passed"
                    />
                  }
                />
                <Route
                  path="mcq-failed"
                  element={
                    <FailedMCQMessage
                      collaborator={"CCO"}
                      messageType="mcq-failed"
                    />
                  }
                />
                <Route
                  path="mcq-retake"
                  element={
                    <RetakeMCQMessage
                      collaborator={"CCO"}
                      messageType="mcq-retake"
                    />
                  }
                />
              </Route>

              <Route path="training">
                <Route
                  index
                  element={
                    <CollaboratorTrainingOptions
                      hasMCQStage={true}
                      hasInterviewStage={true}
                      collaborator={"CCO"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CCO"
                    />
                  }
                />
                <Route
                  path="active"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CCO"
                    />
                  }
                />
                <Route
                  path="aptitude"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="CCO"
                    />
                  }
                />
                <Route
                  path="interview"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={true}
                      role="CCO"
                    />
                  }
                />
              </Route>
              <Route path="onboarding">
                <Route
                  index
                  element={
                    <CollaboratorOnboarding hasStage1Requirements={true} />
                  }
                />
                <Route
                  path="interview"
                  element={<InterviewGradingParameters collaborator={"CCO"} />}
                />
                <Route
                  path="application"
                  element={
                    <ApplicationForm
                      role="CCO"
                      hasVideo={true}
                      hasLanguage={true}
                    />
                  }
                />
              </Route>
            </Route>

            {/* qamaster */}
            <Route path="qamaster">
              <Route
                index
                element={<CollaboratorMgmtOptions collaborator={"QA Master"} />}
              />

              <Route path="managed">
                <Route index element={<QAMasterManaged />} />
                <Route path="new" element={<NewQaMaster />}>
                  <Route index element={<QAStage1Table />} />
                  <Route path="stage-1" element={<QAStage1Table />} />
                  <Route path="stage-2" element={<QAStage2Table />} />
                  <Route path="stage-3" element={<QAStage3Table />} />
                  <Route path="stage-4" element={<QaStage4Table />} />{" "}
                </Route>
                <Route
                  path="qa-working-type"
                  element={<CollaboratorWorkingType role={`qa`} />}
                />
                <Route path="rejected" element={<RejectedQaMasters />}>
                  <Route index element={<FirstRejectedTable role="qa" />} />
                  <Route
                    path="first"
                    element={<FirstRejectedTable role="qa" />}
                  />
                  <Route
                    path="last"
                    element={<LastRejectedTable role="qa" />}
                  />
                </Route>
                <Route path="active" element={<ActiveQAs />} />
                <Route path="log" element={<QaMasterLogDetails />} />
                <Route
                  path="guarantors"
                  element={<GuarantorsInfo collaborator={"QA"} />}
                />
                <Route path="suspended" element={<SuspendedQaMasters />} />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="QA Master" />}
                />
                <Route
                  path="withdrawal"
                  element={<Withdrawals collaborator="QA" />}
                />
                <Route
                  path="bank-details"
                  element={<CollaboratorBankDetails collaborator="QA Master" />}
                />
              </Route>
              <Route path="declarations">
                <Route
                  index
                  element={
                    <CollaboratorDeclarationOptions collaborator="QA Master" />
                  }
                />
                <Route
                  path="preboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"QA Master"}
                      stageName={"Preboarding"}
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorDeclarationsLayout
                      collaborator={"QA Master"}
                      stageName={"Onboarding"}
                    />
                  }
                />
              </Route>
              <Route path="welcome-messages">
                <Route
                  index
                  element={<WelcomeMessagesHome collaborator="QA Master" />}
                />
                <Route
                  path="preboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"QA Master"}
                      messageType="preboarding"
                    />
                  }
                />
                <Route
                  path="onboarding"
                  element={
                    <WelcomeMessageLayout
                      collaborator={"QA Master"}
                      messageType="onboarding"
                    />
                  }
                />
              </Route>

              <Route path="training">
                <Route
                  index
                  element={<CollaboratorTrainingOptions collaborator={"QA"} />}
                />
                <Route
                  path="onboarding"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="QA Master"
                    />
                  }
                />
                <Route
                  path="active"
                  element={
                    <CollaboratorTrainingHome
                      useCategory={false}
                      useDuration={false}
                      role="QA Master"
                    />
                  }
                />
              </Route>
              <Route path="onboarding">
                <Route
                  index
                  element={
                    <CollaboratorOnboarding hasStage1Requirements={true} />
                  }
                />
                <Route
                  path="application"
                  element={<ApplicationForm hasLanguage={true} />}
                />
                <Route
                  path="interview"
                  element={<InterviewGradingParameters collaborator={"QA"} />}
                />
              </Route>
            </Route>

            {/* admins */}
            <Route path="admins">
              <Route index element={<AdminUserMgtHome />} />
              <Route path=":adminUser" element={<AdminUserMgtOptions />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
