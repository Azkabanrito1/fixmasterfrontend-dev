const makePath = (base, path) => `${base}/${path}`;

// =========================base paths=========================

const ROOT_PATH = "/";
const ROOT_CSE = "/cse";
const ROOT_CUSTOMER = "/customer";
const ROOT_FRANCHISEE = "/franchisee";
const ROOT_QAMASTER = "/qamaster";
const ROOT_TECHNICIAN = "/technician";
const ROOT_SUPPLIER = "/supplier";
const ROOT_CCO = "/call-center";

// admin roots
const ROOT_ADMIN = "/admin";
const ROOT_HRADMIN = "/hr-admin";
const ROOT_CSEADMIN = "/cse-admin";
const ROOT_SUPADMIN = "/supplier-admin";
const ROOT_CUSADMIN = "/customer-admin";
const ROOT_TECHADMIN = "/technician-admin";

// ==========================public paths==========================

export const PATH_PUBLIC = {
  home: ROOT_PATH,
  login: `${ROOT_PATH}login`,
  register: `${ROOT_PATH}register`,
  careers: `${ROOT_PATH}careers`,
  forgotPassword: `${ROOT_PATH}forgotPassword`,
  unauthorized: `${ROOT_PATH}unauthorized`,
  verifyUser: `${ROOT_PATH}verify-user`,
  awaitingApproval: `${ROOT_PATH}awaiting-approval`,

  // public cse routes for onboarding phase
  // publicCseWelcome: `${ROOT_PATH}cse-welcome`,
  // publicCseInterview: `${ROOT_PATH}cse-interview`,
  // publicCseExam: `${ROOT_PATH}cse-exam`,
};

// =========================customer paths===========================
export const PATH_CUSTOMER = {
  dashboard: makePath(ROOT_CUSTOMER, "dashboard"),
  settings: makePath(ROOT_CUSTOMER, "settings"),
  settingsSecurity: makePath(ROOT_CUSTOMER, "settings/security"),
  settingsPreference: makePath(ROOT_CUSTOMER, "settings/preferences"),
  settingsAccount: makePath(ROOT_CUSTOMER, "settings/account-info"),
  settingsLocation: makePath(ROOT_CUSTOMER, "settings/service-location"),

  accountHome: makePath(ROOT_CUSTOMER, "account"),
  walletHome: makePath(ROOT_CUSTOMER, "wallet"),

  // ===========jobs =================
  jobsMgt: makePath(ROOT_CUSTOMER, "jobs"),
  newFix: makePath(ROOT_CUSTOMER, "jobs/new-fix"),
  ongoingFix: makePath(ROOT_CUSTOMER, "jobs/ongoing-fix"),
  warrantyFix: makePath(ROOT_CUSTOMER, "jobs/warranty-fix"),
  closedFix: makePath(ROOT_CUSTOMER, "jobs/closed-fix"),
  diagnosisReport: makePath(ROOT_CUSTOMER, "jobs/diagnosis-report"),

  // =============quotes============
  allQuotes: makePath(ROOT_CUSTOMER, "quotations"),
  quoteForFix: (fixId) => makePath(ROOT_CUSTOMER, `jobs/quote/${fixId}`),

  // =========subscriptions=======
  subHome: makePath(ROOT_CUSTOMER, "account-sub"),
  giftSub: makePath(ROOT_CUSTOMER, "gift-sub"),
  giftSubForm: makePath(ROOT_CUSTOMER, "gift-sub/form"),
};

// =========================franchisee paths===========================
export const PATH_FRANCHISEE = {
  welcome: makePath(ROOT_FRANCHISEE, "welcome"),
  onboardingWelcome: makePath(ROOT_FRANCHISEE, "onboarding-welcome"),
  declarations: makePath(ROOT_FRANCHISEE, "preboarding-declarations"),
  postDeclarations: makePath(ROOT_FRANCHISEE, "post-declarations"),
  profile: makePath(ROOT_FRANCHISEE, "profile"),
  guarantorInfo: makePath(ROOT_FRANCHISEE, "guarantor-info"),
  dashboard: makePath(ROOT_FRANCHISEE, "dashboard"),
  jobs: makePath(ROOT_FRANCHISEE, "job-management"),
  unassigned: makePath(ROOT_FRANCHISEE, "job-management/unassigned"),
  urgent: makePath(ROOT_FRANCHISEE, "job-management/urgent-unassigned"),
  rejected: makePath(ROOT_FRANCHISEE, "job-management/rejected"),
  completed: makePath(ROOT_FRANCHISEE, "job-management/completed"),
  warranty: makePath(ROOT_FRANCHISEE, "job-management/warranty"),
  myJobs: makePath(ROOT_FRANCHISEE, "job-management/my-jobs"),
  training: makePath(ROOT_FRANCHISEE, "my-training"),
  courses: makePath(ROOT_FRANCHISEE, "my-training/materials"),
  viewPdf: makePath(ROOT_FRANCHISEE, "my-training/view-pdf"),
  settings: makePath(ROOT_FRANCHISEE, "settings"),
  settingsProfile: makePath(ROOT_FRANCHISEE, "settings/profile"),
  settingsSecurity: makePath(ROOT_FRANCHISEE, "settings/security"),
  settingsPreference: makePath(ROOT_FRANCHISEE, "settings/preferences"),
  settingsDeclarations: makePath(ROOT_FRANCHISEE, "settings/declarations"),
  settingsGuarantor: makePath(ROOT_FRANCHISEE, "settings/guarantor-info"),
};

// =========================CSE paths===========================
export const PATH_CSE = {
  welcome: makePath(ROOT_CSE, "welcome"),
  onboardingWelcome: makePath(ROOT_CSE, "onboarding-welcome"),
  stage2ExamWelcome: makePath(ROOT_CSE, "exam/Welcome"),
  stage2Exam: makePath(ROOT_CSE, "exam"),
  startInterview: makePath(ROOT_CSE, "startinterview"),
  interview: makePath(ROOT_CSE, "interview"),
  declarations: makePath(ROOT_CSE, "preboarding-declarations"),
  postDeclarations: makePath(ROOT_CSE, "post-declarations"),
  profile: makePath(ROOT_CSE, "profile"),
  guarantorInfo: makePath(ROOT_CSE, "guarantor-info"),
  training: makePath(ROOT_CSE, "my-training"),
  viewPdf: makePath(ROOT_CSE, "my-training/view-pdf"),
  courses: makePath(ROOT_CSE, "my-training/materials"),
  dashboard: makePath(ROOT_CSE, "dashboard"),
  settings: makePath(ROOT_CSE, "settings"),
  settingsProfile: makePath(ROOT_CSE, "settings/profile"),
  settingsSecurity: makePath(ROOT_CSE, "settings/security"),
  settingsPreference: makePath(ROOT_CSE, "settings/preferences"),
  settingsDeclarations: makePath(ROOT_CSE, "settings/declarations"),
  settingsGuarantor: makePath(ROOT_CSE, "settings/guarantor-info"),
};

// =========================qamaster paths===========================
export const PATH_QAMASTER = {
  declarations: makePath(ROOT_QAMASTER, "pre-declarations"),
  postDeclarations: makePath(ROOT_QAMASTER, "post-declarations"),
  profile: makePath(ROOT_QAMASTER, "profile"),
  guarantorInfo: makePath(ROOT_QAMASTER, "guarantor-info"),
  training: makePath(ROOT_QAMASTER, "my-training"),
  viewPdf: makePath(ROOT_QAMASTER, "my-training/view-pdf"),
  welcome: makePath(ROOT_QAMASTER, "welcome"),
  onboardingWelcome: makePath(ROOT_QAMASTER, "onboarding-welcome"),
  dashboard: makePath(ROOT_QAMASTER, "dashboard"),
  settings: makePath(ROOT_QAMASTER, "settings"),
  settingsProfile: makePath(ROOT_QAMASTER, "settings/profile"),
  settingsSecurity: makePath(ROOT_QAMASTER, "settings/security"),
  settingsPreference: makePath(ROOT_QAMASTER, "settings/preferences"),
  settingsDeclarations: makePath(ROOT_QAMASTER, "settings/declarations"),
  settingsGuarantor: makePath(ROOT_QAMASTER, "settings/guarantor-info"),
};

// =========================technician paths===========================
export const PATH_TECHNICIAN = {
  stage2ExamWelcome: makePath(ROOT_TECHNICIAN, "exam/welcome"),
  stage2Exam: makePath(ROOT_TECHNICIAN, "exam"),
  welcome: makePath(ROOT_TECHNICIAN, "welcome"),
  onboardingWelcome: makePath(ROOT_TECHNICIAN, "onboarding-welcome"),
  declarations: makePath(ROOT_TECHNICIAN, "pre-declarations"),
  postDeclarations: makePath(ROOT_TECHNICIAN, "post-declarations"),
  profile: makePath(ROOT_TECHNICIAN, "profile"),
  guarantorInfo: makePath(ROOT_TECHNICIAN, "guarantor-info"),
  training: makePath(ROOT_TECHNICIAN, "my-training"),
  viewPdf: makePath(ROOT_TECHNICIAN, "my-training/view-pdf"),
  dashboard: makePath(ROOT_TECHNICIAN, "dashboard"),
  settings: makePath(ROOT_TECHNICIAN, "settings"),
  settingsProfile: makePath(ROOT_TECHNICIAN, "settings/profile"),
  settingsSecurity: makePath(ROOT_TECHNICIAN, "settings/security"),
  settingsPreference: makePath(ROOT_TECHNICIAN, "settings/preferences"),
  settingsDeclarations: makePath(ROOT_TECHNICIAN, "settings/declarations"),
  settingsGuarantor: makePath(ROOT_TECHNICIAN, "settings/guarantor-info"),
};

//==================================supplier paths====================================
export const PATH_SUPPLIER = {
  welcome: makePath(ROOT_SUPPLIER, "welcome"),
  onboardingWelcome: makePath(ROOT_SUPPLIER, "onboarding-welcome"),
  declarations: makePath(ROOT_SUPPLIER, "pre-declarations"),
  postDeclarations: makePath(ROOT_SUPPLIER, "post-declarations"),
  profile: makePath(ROOT_SUPPLIER, "profile"),
  manageAddress: makePath(ROOT_SUPPLIER, "manage-address"),
  trustedCustomer: makePath(ROOT_SUPPLIER, "guarantor-info"),
  training: makePath(ROOT_SUPPLIER, "my-training"),
  viewPdf: makePath(ROOT_SUPPLIER, "my-training/view-pdf"),
  dashboard: makePath(ROOT_SUPPLIER, "dashboard"),
};

//=====================================call center operator=========================
export const PATH_CCO = {
  stage2ExamWelcome: makePath(ROOT_CCO, "exam/welcome"),
  stage2Exam: makePath(ROOT_CCO, "exam"),
  welcome: makePath(ROOT_CCO, "welcome"),
  onboardingWelcome: makePath(ROOT_CCO, "onboarding-welcome"),
  dashboard: makePath(ROOT_CCO, "dashboard"),
  startInterview: makePath(ROOT_CCO, "startinterview"),
  interview: makePath(ROOT_CCO, "interview"),
  declarations: makePath(ROOT_CCO, "pre-declarations"),
  postDeclarations: makePath(ROOT_CCO, "post-declarations"),
  profile: makePath(ROOT_CCO, "profile"),
  guarantorInfo: makePath(ROOT_CCO, "guarantor-info"),
  training: makePath(ROOT_CCO, "my-training"),
  viewPdf: makePath(ROOT_CCO, "my-training/view-pdf"),
  settings: makePath(ROOT_CCO, "settings"),
  settingsProfile: makePath(ROOT_CCO, "settings/profile"),
  settingsSecurity: makePath(ROOT_CCO, "settings/security"),
  settingsPreference: makePath(ROOT_CCO, "settings/preferences"),
  settingsDeclarations: makePath(ROOT_CCO, "settings/declarations"),
  settingsGuarantor: makePath(ROOT_CCO, "settings/guarantor-info"),
};

// =========================admin paths===========================
export const PATH_ADMIN = {
  dashboard: makePath(ROOT_ADMIN, "dashboard"),
  editor: makePath(ROOT_ADMIN, "editor"),

  // ----------------------jobs--------------------
  jobs: makePath(ROOT_ADMIN, "jobs"),
  ongoingJobs: makePath(ROOT_ADMIN, "jobs/ongoing"),
  warrantyJobs: makePath(ROOT_ADMIN, "jobs/warranty"),
  completedJobs: makePath(ROOT_ADMIN, "jobs/completed"),
  unassignedJobs: makePath(ROOT_ADMIN, "jobs/unassigned"),
  rejectedJobs: makePath(ROOT_ADMIN, "jobs/rejected"),
  bookingFee: makePath(ROOT_ADMIN, "job-booking-fee"),
  createBookingFee: makePath(ROOT_ADMIN, "job-booking-fee/create"),

  // ----------------territories----------------
  territory: makePath(ROOT_ADMIN, "territories"),
  setupTerritory: makePath(ROOT_ADMIN, `territories/setup`),
  editTerritory: (territoryId) =>
    makePath(ROOT_ADMIN, `territories/${territoryId}/edit`),
  territoryInfo: (territoryId) =>
    makePath(ROOT_ADMIN, `territories/${territoryId}/info`),
  territoryBonusTargets: (territoryId) =>
    makePath(ROOT_ADMIN, `territories/${territoryId}/bonus-targets`),
  territoryCollabsBonusTargets: (territoryId, collaboratorId) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonus-targets/${collaboratorId}`
    ),
  targets: (territoryId, collaboratorId) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonus-targets/${collaboratorId}/targets`
    ),
  bonuses: (territoryId, collaboratorId) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonus-targets/${collaboratorId}/bonuses`
    ),
  targetsCollabs: (territoryId, collaboratorId) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/targets/${collaboratorId}`
    ),
  bonusesCollabs: (territoryId, collaboratorId) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonuses/${collaboratorId}`
    ),
  uplifts: (territoryId) =>
    makePath(ROOT_ADMIN, `territories/${territoryId}/rate-uplifts`),
  upliftsCollabs: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/rate-uplifts/${collaborator}`
    ),
  createTarget: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonus-targets/${collaborator}/create-target`
    ),
  createBonus: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/bonus-targets/${collaborator}/create-bonus`
    ),
  createUplift: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/create-uplift/${collaborator}`
    ),
  editTarget: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/edit-target/${collaborator}`
    ),
  editBonus: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/edit-bonus/${collaborator}`
    ),
  editUplift: (territoryId, collaborator) =>
    makePath(
      ROOT_ADMIN,
      `territories/${territoryId}/edit-uplift/${collaborator}`
    ),

  // -------------------referrals ----------------

  // setUp: makePath(ROOT_ADMIN, "referrals-set-up"),
  createReferrals: makePath(ROOT_ADMIN, "create/referrals"),
  // -------------------discounts ----------------
  discounts: makePath(ROOT_ADMIN, "discounts"),
  createDiscounts: makePath(ROOT_ADMIN, "discounts/create"),
  editDiscounts: makePath(ROOT_ADMIN, "discounts/edit"),

  // ------------------------promos---------------------
  promos: makePath(ROOT_ADMIN, "promos"),
  createPromos: makePath(ROOT_ADMIN, "promos/create"),
  editPromos: makePath(ROOT_ADMIN, "promos/edit"),

  // -----------------------loyalties----------------------
  loyalties: makePath(ROOT_ADMIN, "loyalties"),
  createLoyalty: makePath(ROOT_ADMIN, "loyalties/create"),

  // --------------------subscriptions--------------------
  subscription: makePath(ROOT_ADMIN, "subscription"),
  configSub: makePath(ROOT_ADMIN, "subscription/configure"),
  subDetails: makePath(ROOT_ADMIN, "subscription/details"),
  viewSubscribers: makePath(ROOT_ADMIN, "subscription/view-subscribers"),
  subServices: makePath(ROOT_ADMIN, "subscription/services"),

  // -----------------------quotation---------------------
  quotation: makePath(ROOT_ADMIN, "quotation"),
  quotationSettings: makePath(ROOT_ADMIN, "quotation/settings"),
  quotationOverview: makePath(ROOT_ADMIN, "quotation/overview"),
  createQuotation: makePath(ROOT_ADMIN, "quotation/create"),

  // -----------------------quotation---------------------
  logisticsSettings: makePath(ROOT_ADMIN, "quotation/logistics"),
  // ----------------------warranty----------------------
  warranty: makePath(ROOT_ADMIN, "warranty"),
  createWarranty: makePath(ROOT_ADMIN, "warranty/create"),

  // ----------------------prferences----------------------
  preferences: makePath(ROOT_ADMIN, "preferences-management"),
  customerPref: makePath(ROOT_ADMIN, "preferences-management/customers"),
  franchiseePref: makePath(ROOT_ADMIN, "preferences-management/franchisee"),
  qamasterPref: makePath(ROOT_ADMIN, "preferences-management/qa"),
  csePref: makePath(ROOT_ADMIN, "preferences-management/cse"),
  technicianPref: makePath(ROOT_ADMIN, "preferences-management/technician"),
  supplierPref: makePath(ROOT_ADMIN, "preferences-management/supplier"),
  ccoPref: makePath(ROOT_ADMIN, "preferences-management/cco"),
  prefMasters: makePath(ROOT_ADMIN, "preferences-management/masters"),

  //--------------------setup mgmt-------------------
  newSla: makePath(ROOT_ADMIN, "setup-mgt/sla-mgt/new"),
  // -------------------user mgmt--------------------
  userMgtHome: makePath(ROOT_ADMIN, "user-mgmt"),
  customerMgmt: makePath(ROOT_ADMIN, "user-mgmt/customer"),
  individualCustomer: makePath(ROOT_ADMIN, "user-mgmt/customer/individual"),
  corporateCustomer: (customerType) =>
    makePath(ROOT_ADMIN, `user-mgmt/customer/corporate/${customerType}`),
  franchiseeMgmt: makePath(ROOT_ADMIN, "user-mgmt/franchisee"),
  technicianMgmt: makePath(ROOT_ADMIN, "user-mgmt/technician"),
  supplierMgmt: makePath(ROOT_ADMIN, "user-mgmt/supplier"),
  qamasterMgmt: makePath(ROOT_ADMIN, "user-mgmt/qamaster"),
  cseMgmt: makePath(ROOT_ADMIN, "user-mgmt/cse"),
  ccoMgmt: makePath(ROOT_ADMIN, "user-mgmt/cco"),
  adminMgmt: makePath(ROOT_ADMIN, "user-mgmt/admins"),
  globalPreDeclaration: makePath(
    ROOT_ADMIN,
    "user-mgmt/global-pre-declaration"
  ),
  globalPostDeclaration: makePath(
    ROOT_ADMIN,
    "user-mgmt/global-post-declaration"
  ),
  aboutFmFiles: (id) => makePath(ROOT_ADMIN, `about-fm-mgt/${id}`),
  folderMaterials: (id) => makePath(ROOT_ADMIN, `training/${id}/files`),
  folderMcqs: (id) => makePath(ROOT_ADMIN, `training/${id}/mcqs`),
  viewPdf: ({ url, title }) =>
    makePath(ROOT_ADMIN, `training/view-pdf?url=${url}&title=${title}`),
  viewVideo: ({ url, title }) =>
    makePath(ROOT_ADMIN, `training/view-video?url=${url}&title=${title}`),

  //------------------------------------feedback & ratings--------------------------------
  feedbackAndRating: makePath(ROOT_ADMIN, "feedback-rating"),
  ratingBonus: makePath(ROOT_ADMIN, "feedback-rating/rating-bonus"),
  ratingDefault: makePath(ROOT_ADMIN, "feedback-rating/rating-default"),
  ratingType: makePath(ROOT_ADMIN, "feedback-rating/rating-type"),
  ratingEngine: makePath(ROOT_ADMIN, "feedback-rating/rating-engine"),
  ratingMgt: makePath(ROOT_ADMIN, "feedback-rating/rating-management"),
};

// =========================hr admin paths===========================
export const PATH_HRADMIN = {
  dashboard: makePath(ROOT_HRADMIN, "dashboard"),
};

// =========================customer admin paths===========================
export const PATH_CUSADMIN = {
  dashboard: makePath(ROOT_CUSADMIN, "dashboard"),
  customerMgt: makePath(ROOT_CUSADMIN, "user-mgmt"),
  corporateCustomer: (customerType) =>
    makePath(ROOT_CUSADMIN, `user-mgmt/corporate/${customerType}`),
};

// =========================cse admin paths===========================
export const PATH_CSEADMIN = {
  dashboard: makePath(ROOT_CSEADMIN, "dashboard"),
};
// =========================technician admin paths===========================
export const PATH_TECHADMIN = {
  dashboard: makePath(ROOT_TECHADMIN, "dashboard"),
};
// =========================supplier admin paths===========================
export const PATH_SUPADMIN = {
  dashboard: makePath(ROOT_SUPADMIN, "dashboard"),
};
