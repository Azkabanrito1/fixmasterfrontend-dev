import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PasswordAndSecurity from "../components/layouts/settings/PasswordAndSecurity";
import ServiceLocation from "../pages/customerportal/settings/ServiceLocation";
import Loyalty from "../pages/customerportal/Loyalty";
import GiftASub from "../pages/customerportal/Subscription/GiftASubHome";
import Referrals from "../pages/customerportal/Referrals";
import Promotions from "../pages/customerportal/Promotions";
import CustomerDashboard from "../components/layouts/dashboard/CustomerDashboard";
import DashboardHome from "../pages/customerportal/CustomerHome";
import JobsHome from "../pages/customerportal/jobs/JobsHome";
import AccountHome from "../pages/customerportal/Account/AccountHome";
import CustomerSettingsHome from "../pages/customerportal/settings/SettingsHome";
import CustomerNewJobs from "../pages/customerportal/jobs/NewFix";
import AccountInfo from "../pages/customerportal/settings/AccountInfo";
import BookingHistory from "../pages/customerportal/Account/BookingHistory";
import Quotation from "../pages/customerportal/jobs/Quotation";
import CustomerWarrantyJobs from "../pages/customerportal/jobs/WarrantyFix";
import CustomerClosedJobs from "../components/customercomponents/jobs/ClosedTable";
import GiftASubForm from "../pages/customerportal/Subscription/GiftASubFormPage";
import TransactionHistory from "../pages/customerportal/Account/TransactionHistory";
import AccountSubHome from "../pages/customerportal/Subscription/AccountSubHome";
import JobsDone from "../pages/customerportal/Subscription/JobsDone";
import BuySubscription from "../pages/customerportal/Subscription/BuySubscription";

import PaymentConfirm from "../components/customercomponents/payment/modals/PaymentConfirm";
import AuthGuard from "../guards/AuthGuard";
import Preferences from "../pages/customerportal/settings/Preferences";
import CustomerWallet from "../pages/customerportal/Wallet";
import CustomerOngoingJobs from "../pages/customerportal/jobs/OngoingFix";
import DiagnosisReport from "../pages/customerportal/jobs/DiagnosisReport";
import AllCustomerQuotations from "../pages/customerportal/jobs/AllCustomerQuotations";
import AboutFm from "../pages/customerportal/aboutFm/AboutFm";
import AboutFmFiles from "../pages/customerportal/aboutFm/AboutFmFiles";
import CollaboratorReferral from "../components/globalcomponents/referral/CollaboratorReferral";
import CommentsDashboard from "../components/comment-to-mngt/CommentsDashboard";
import Ratings from "../pages/customerportal/jobs/Ratings";
import CollaboratorRating from "../components/globalcomponents/rating/CollaboratorRating";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="customer" />}>
        <Route path="/" element={<CustomerDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="quotations" element={<AllCustomerQuotations />} />
          <Route path="jobs">
            <Route index element={<JobsHome />} />
            <Route path="new-fix" element={<CustomerNewJobs />} />
            <Route path="ongoing-fix" element={<CustomerOngoingJobs />} />
            <Route path="warranty-fix" element={<CustomerWarrantyJobs />} />
            <Route path="closed-fix" element={<CustomerClosedJobs />} />
            <Route path="quote/:fixId" element={<Quotation />} />
            <Route path="ratings" element={<Ratings />} />
            <Route
              path="diagnosis-report/:fixId"
              element={<DiagnosisReport />}
            />
          </Route>
          <Route path="account">
            <Route index element={<AccountHome />} />
            <Route path="booking-history" element={<BookingHistory />} />
            <Route
              path="transaction-history"
              element={<TransactionHistory />}
            />
          </Route>
          <Route path="account-sub">
            <Route index element={<AccountSubHome />} />
            <Route path="jobs-done/:subId" element={<JobsDone />} />
            <Route path="buy-subscription" element={<BuySubscription />} />
          </Route>
          <Route path="gift-sub">
            <Route index element={<GiftASub />} />
            <Route path="form" element={<GiftASubForm />} />
            <Route path="form/:subId" element={<GiftASubForm />} />
          </Route>
          <Route path="promos" element={<Promotions />} />
          <Route path="settings">
            <Route index element={<CustomerSettingsHome />} />
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="security" element={<PasswordAndSecurity />} />
            <Route path="service-location" element={<ServiceLocation />} />
            <Route path="preferences" element={<Preferences />} />
          </Route>
          <Route path="aboutfm">
            <Route index element={<AboutFm />} />
            <Route path=":folderId" element={<AboutFmFiles />} />
          </Route>
          <Route path="feedback-rating" element={<CollaboratorRating />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="wallet" element={<CustomerWallet />} />
          <Route path="referral" element={<CollaboratorReferral />} />
          <Route path="confirm-payment" element={<PaymentConfirm />} />
          <Route path="comment-to-management" element={<CommentsDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default CustomerRoutes;
