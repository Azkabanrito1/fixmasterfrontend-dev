import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { pdfjs } from "react-pdf";
import GlobalFullScreenLoader from "./components/globalcomponents/GlobalFullScreenLoader";

const CseAdminRoute = lazy(() => import("./routes/CseAdminRoutes"));
const SupplierAdminRoutes = lazy(() => import("./routes/SupplierAdminRoutes"));
const CustomerAdminRoutes = lazy(() => import("./routes/CustomerAdminRoutes"));
const TechAdminRoutes = lazy(() => import("./routes/TechAdminRoutes"));

// ==================Landing/Public Routes==================
const HomePage = lazy(() => import("./pages/landingwebsite/HomePage"));
const AboutUs = lazy(() => import("./pages/landingwebsite/AboutUs"));
const Register = lazy(() => import("./pages/landingwebsite/Register"));
const Careers = lazy(() => import("./pages/landingwebsite/Careers"));
const SubmitPwdResetToken = lazy(() =>
  import("./pages/landingwebsite/SubmitPwdResetToken")
);
const Login = lazy(() => import("./pages/landingwebsite/Login"));
const Unauthorized = lazy(() => import("./pages/landingwebsite/Unauthorized"));
const TermsAndConditions = lazy(() =>
  import("./components/globalcomponents/TermsAndConditions")
);
const ForgotPassword = lazy(() =>
  import("./pages/landingwebsite/ForgotPassword")
);
const VerifyUser = lazy(() => import("./pages/landingwebsite/VerifyUser"));

const AwaitingApproval = lazy(() =>
  import("./pages/landingwebsite/AwaitingApproval")
);
const GuarantorResponse = lazy(() =>
  import("./pages/landingwebsite/GuarantorResponse")
);

const AppLayout = lazy(() => import("./components/layouts/AppLayout"));

const FranchiseeRoutes = lazy(() => import("./routes/FranchiseeRoutes"));
const CseRoutes = lazy(() => import("./routes/CseRoutes"));
const QaMasterRoutes = lazy(() => import("./routes/QaMasterRoutes"));
const TechnicianRoutes = lazy(() => import("./routes/TechnicianRoutes"));
const SupplierRoutes = lazy(() => import("./routes/SupplierRoutes"));
const CcoRoutes = lazy(() => import("./routes/CcoRoutes"));
const CustomerRoutes = lazy(() => import("./routes/CustomerRoutes"));
const HrRoutes = lazy(() => import("./routes/HrRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <Suspense fallback={<GlobalFullScreenLoader open={true} />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* PUBLIC SITE ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="sign-up" element={<Register />} />
          <Route path="sign-up/:code" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="careers" element={<Careers />} />
          <Route path="account/setup" element={<SubmitPwdResetToken />} />
          <Route path="verify-user" element={<VerifyUser />} />
          <Route path="guarantor_response" element={<GuarantorResponse />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="awaiting-approval" element={<AwaitingApproval />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          {/* CUSTOMER ROUTES */}
          <Route path="customer/*" element={<CustomerRoutes />} />
          {/* FRANCHISEE ROUTES */}
          <Route path="franchisee/*" element={<FranchiseeRoutes />} />
          {/* HR DASHBOARD ROUTES */}
          <Route path="hr-admin/*" element={<HrRoutes />} />
          {/* CSE ROUTES */}
          <Route path="cse/*" element={<CseRoutes />} />
          {/* QAMASTER ROUTES */}
          <Route path="qamaster/*" element={<QaMasterRoutes />} />
          {/* TECHNICIAN ROUTES */}
          <Route path="technician/*" element={<TechnicianRoutes />} />
          {/* SUPPLIER ROUTES */}
          <Route path="supplier/*" element={<SupplierRoutes />} />
          {/* CALL CENTER OPERATOR ROUTES */}
          <Route path="call-center/*" element={<CcoRoutes />} />

          {/* CUSTOMER ADMIN ROUTES */}
          <Route path="customer-admin/*" element={<CustomerAdminRoutes />} />
          {/* SUPER ADMIN ROUTES */}
          <Route path="admin/*" element={<AdminRoutes />} />
          {/* CSE ADMIN ROUTES */}
          <Route path="cse-admin/*" element={<CseAdminRoute />} />
          {/* CUSTOMER ADMIN ROUTES */}
          <Route path="customer-admin/*" element={<CustomerAdminRoutes />} />
          {/* SUPPLIER ADMIN ROUTES */}
          <Route path="supplier-admin/*" element={<SupplierAdminRoutes />} />
          {/* TECHNICIAN ADMIN ROUTES */}
          <Route path="technician-admin/*" element={<TechAdminRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
