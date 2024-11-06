export const admin = {
  aboutFixMasterUpload: {
    uploadFolder: "AboutFixMasterUpload/UploadFolder",
    viewFolders: "AboutFixMasterUpload/ViewFolders",
    uploadFiles: "AboutFixMasterUpload/UploadFiles",
    viewFiles: "AboutFixMasterUpload/ViewFiles/",
    uploadTermsAndConditions: "AboutFixMasterUpload/UploadTermsandCondition",
    viewTermsAndConditions: "AboutFixMasterUpload/ViewTermsandCondition",
    viewAllTermsAndConditions: "AboutFixMasterUpload/ViewAllTermsandConditions",
  },
  category: {
    createcategory: "FixCategory/CreateFixCategory",
    getFixCategory: "FixCategory/GetAllFixCategory",
    updateCategory: "FixCategory/EditCategory",
    activateOrDeactivateCategory: "FixCategory/ReactDeactivateCategory",
    createFixEquipment: "FixCategory/CreateFixEquipment",
    getFixEquipment: "FixCategory/GetAllFixEquipment",
    updateFixEquipment: "FixCategory/UpdateFixEquipment",
    deleteFixEquipment: "FixCategory/DeleteFixEquipment",
    createServiceListing: "FixCategory/CreateFixServices",
    getServiceListing: "FixCategory/GetAllServiceListing",
    updateServiceListing: "FixCategory/UpdateFixService",
    deactivateServiceListing: "ReactDeactivate/ReactDeactivateModule",
    createBookingClass: "FixClasses/CreateFixClass",
    updateBookingClass: "FixClasses/UpdateFixClass",
    deleteBookingClass: "FixCategory/DeleteFixClass",
    createSubCategory: "FixCategory/AddSubCategory",
    getSubCategory: "FixCategory/GetSubCategories",
    updateSubCategory: "FixCategory/UpdateSubCategory",
    deleteSubCategory: "FixCategory/DeactivateSubCategory",
    getSubCategoryById: "FixCategory/GetSubCategoriesByCategoryId",
    getFixCategoryBySearchName: "FixCategory/GetCategoriesByName",
    getAllCategoryByPage: "FixCategory/GetAllFixCategory?",
    getCategoryDetailsById: "FixCategory/GetCategoryDetailsById",
    getCategorySubById: "FixCategory/GetCategorySubsById",
    getCategoryServiceById: "FixCategory/GetCategoryServiceListingById",
    getRootCategory: "FixCategory/GetRootCategories",
    getRootSubcategoriesById: "FixCategory/GetRootSubCategoriesById",
    getFixClass: "FixClasses/GetFixClasses",
  },
  common: {
    newQuotationParam: "Common/NewQuotationParam",
    allQuotationParam: "Common/GetQuotationParam",
    updateQuotationParam: "Common/UpdateQuotationParam",
    getSlaParam: "Common/GetSLAParam",
    createSlaparam: "Common/NewSlaParam",
    updateSlaParam: "Common/UpdateSlaParam",
    identityCards: "Common/allidentitycards",

    // =============================message/declarations=========================================
    createMsgorDec: "Common/newmessageordeclaration",
    updateMsgorDec: "Common/updatemessageordeclaration",
    deleteMsgorDec: "Common/deletemessageordeclaration",
    collaboratorMsgorDec: "Common/messagesordeclarations",
    userMsgorDec: "Common/usermessagesordeclarations",
  },
  customer: {
    createCustomerType: "CustomerTypeSetup/CreateCustomerType",
    getCustomerTypeAndCustomerSubtype: "CustomerTypeSetup/GetCustomerSubType",
    updateCustomerType: "CustomerTypeSetup/UpdateCustomerType",
    deleteCustomerType: "CustomerTypeSetup/DeactivateCustomerTypeById/",
    createSubType: "CustomerTypeSetup/CreateCustomerSubTypes",
    updateSubType: "CustomerTypeSetup/UpdateCustomerSubType",
    deleteSubTypeById: "CustomerTypeSetup/DeleteCustomerSubTypeById",
  },
  discount: {
    newDiscount: "Discount/newdiscount",
    allDiscounts: "Discount/alldiscounts",
    newPromo: "Discount/newpromo",
    allPromos: "Discount/allpromos",
    newLoyalty: "Discount/newloyalty",
    allLoyalty: "Discount/allloyalties",
    audienceListByCategory: "Discount/audiencelistbycategory",
    discountInvoiceComponent: "Discount/discountinvoicecomponents",
    discountAudience: "Discount/discountaudience",
  },
  guarantorSettings: {
    setGuarantorSettings: "Guarantor/CreateGuarantorRequirement",
    getGuarantorSettings: "Guarantor/GetAllGuarantorRequirement",
    getGuarantorInformation: "Guarantor/GetAllGuarantorInformation",
  },
  interviewMessages: {
    createCollabInterviewMessage: "InterviewMessage/CreateInterviewMessage",
    updateCollabInterviewMessage: "InterviewMessage/UpdateInterviewMessage",
    getCollabInterviewMessage:
      "InterviewMessage/GetInterviewMessageByCollaboratorID/",
    deleteCollabInterviewMessage:
      "InterviewMessage/DeleteInterviewMessageById/",
  },
  JobSetting: {
    getJobSettings: "JobSettings/GetJobSettings",
    updateJobSetting: "JobSettings/UpdateJobSettings",
  },
  language: {
    createLanguage: "Language/CreateLanguage",
    getLanguage: "Language/GetAllLanguages",
    updateLanguage: "Language/UpdateLanguage",
    deleteLanguage: "Language/DeleteLanguage",
  },
  manageTechnician: {
    getAllTechnician: "ManageTechnician/GetAllTechnician",
    updateTechnician: "ManageTechnician/UpdateTechnicialStatus",
    getAllTechnicianFixAnalysis:
      "ManageTechnician/GetTechnicianFixAnalysis?userId=",
    getTechnicianRating:
      "/ManageTechnician/GetRatingAnalysisForTechnician?userId=",
    getTrainingAssingnToAllTechnician:
      "ManageTechnician/GetAllTrainingScheduleToTechnicians",
  },
  mcq: {
    getAllCollabTrainingMCQ: "Mcq/GetAllCollabTrainingMCQ",
    updateMcqTrainingGlobalSettings: "Mcq/UpdateMcqTrainingGlobalSettings",
    getMcqCollaboratorsSettingbycollab:
      "Mcq/GetMcqCollaboratorsSettingbycollab",
    uploadQuestions: "Mcq/UploadQuestionInExcel",
    addMaterial: "Mcq/CreateMcqMaterial",
    updateMaterial: "Mcq/UpdateMcqMaterial",
    deleteMaterial: "Mcq/DeleteMcqMaterial",
    addFolder: "Mcq/CreateMcqFolder",
    updateFolder: "Mcq/UpdateMcqFolder",
    manageMcqFolder: "Mcq/ManageMcqFolder",
    addMcq: "Mcq/CreateMcqQuestion",
    getFolders: "Mcq/GetMcqFolderByExamType",
    getTrainingMaterial: "Mcq/GetAllTrainingMaterials",
    getMaterialsByFolderId: "Mcq/GetMcqMaterialByFolderId",
    getMcqsByFolderId: "Mcq/GetMcqQuestions",
    getMcqDataById: "Mcq/GetMcqQuestionById",

    // interview grading settings
    createInterviewGrading: "Mcq/CreateInterviewRatingMaster",
    updateInterviewGrading: "Mcq/UpdateInterviewRatingMaster",
    getInterviewGradingByRole: "Mcq/GetInterviewRatingMaster",
    getInterviewGradingByRecord: "Mcq/GetInterviewRatingMasterById",

    // technician mcq flag
    getMcqFlagStatus: "Mcq/GetTechnicianNextStageFlag?category=",
    updateMcqFlagStatus: "Mcq/ChangeMcqFlagStatusByRole",
  },
  mcqMessages: {
    createCollabMcqMessage: "Mcq/CreateMcqMessage",
    updateCollabMcqMessage: "Mcq/UpdateMcqMessage",
    getCollabMcqMessage: "Mcq/GetMcqMessageByCollaboratorID/",
    deleteCollabMcqMessage: "Mcq/DeleteMcqMessage/",
  },
  notification: {
    getNotification: "Notifications/GetNotificationsByCategory",
  },
  onboardingMessages: {
    createCollabOnboardingMessage: "OnBoardingMessage/CreateOnboardingMessage",
    updateCollabOnboardingMessage: "OnBoardingMessage/UpdateOnboardingMessage",
    getCollabOnboardingMessage:
      "OnBoardingMessage/GetAllOnboardingMessageByCollaboaratorId/",
    deleteCollabOnboardingMessage:
      "OnBoardingMessage/DeleteOnboardingMessageById/",
  },
  onboardingRequirement: {
    createVideoTopics: "VideoTopic/CreateVideoTopic",
    getVideoTopicsByRoleId: "VideoTopic/GetVideoTopicByCollaborator",
    updateVideoTopics: "VideoTopic/UpdateVideoTopic",
    deleteVideoTopics: "VideoTopic/DeleteVideoTopic",
    createVideoTopicSetting: "VideoTopic/CreateVideoTopicSetting",
    updateVideoTopicSetting: "VideoTopic/UpdateVideoTopicSetting",
    deleteVideoTopicSetting: "VideoTopic/DeleteVideoTopicSetting",
    getVideoTopicSetting: "VideoTopic/GetVideoTopicSetting",
  },
  preboardingMessages: {
    getCollabPreboardingMessage:
      "PreboardingActorMessages/GetPreboardingMessageByCollaboratorID/",
    createCollabPreboardingMessage:
      "PreboardingActorMessages/CreatePreboardingMessages",
    updateCollabPreboardingMessage:
      "PreboardingActorMessages/UpdatePreboardingMessages",
    deleteCollabPreboardingMessage:
      "PreboardingActorMessages/DeletePreboardingMessages?id=",
  },
  preboardingDeclarations: {
    getPreboardingDecs: "PreboardingDeclaration/GetAllPreboardingDeclearation",
    createPreboardingDecs:
      "PreboardingDeclaration/CreatePreboardingDeclearation",
    updatePreboardingDecs:
      "PreboardingDeclaration/UpdatePreboardingDeclearation",
    getPreboardingDecsByRole:
      "PreboardingDeclaration/GetPreboardingDeclarationActorByActorId/",
    createCollaboratorPreboardingDecs:
      "PreboardingDeclaration/CreatePreboardingDeclarationActor",
    removeCollaboratorPreboardingDecs:
      "PreboardingDeclaration/RemovePreboardingDeclarationActorByActorId",
  },
  preferences: {
    getDaysofWeeks: "Preference/GetDaysInTheWeek",
    getEmploymentType: "Preference/GetEmploymentTypes",
    getCollaboratorQuestion: "Preference/GetNotificationQuestionsByRole/",
    createQuestion: "Preference/CreateNotificationPrefQuestions",
    createQuestionOptions: "Preference/CreateNotificationPrefOptions",
    getOptionsByQuestionId: "Preference/GetNotificationOptionsByQuestionId/",
    activateOrDeactivatePref: "Preference/ActivateOrDeactivateQuestionOrOption",
    createPrefMaster: "Preference/CreateContactPreferenceMaster",
    getPrefMaster: "Preference/GetContactPreferenceMaster",
  },
  qualifications: {
    accademics: "AcademicQualification/GetAllQualifications",
    createQualifications: "AcademicQualification/AddQualification",
    updateQualifications: "AcademicQualification/UpdateQualification",
    deleteQualifications: "AcademicQualification/DeleteQualification",
  },
  services: {
    getService: "/Service/GetServiceByEquipmentByClass",
  },
  servicesType: {
    createServicesType: "FixType/CreateFixType",
    getServicesType: "FixType/GetAllFixType",
    updateServies: "FixType/UpdateFixType",
    deleteServices: "FixType/DeleteFixType",
  },
  specialCustomerType: {
    customerTypes: "SpecialCustomerManage/GetCustomerTypes",
    customerSubType: "SpecialCustomerManage/GetCustomerSubTypesById",
  },
  bookingFee: {
    createBookingFee: "JobSettings/CreateJobBookingFee",
    getBookingFee: "JobSettings/GetJobBookingFee",
    updateBookingFee: "JobSettings/UpdateJobBookingFee",
    deleteBookingFee: "JobSettings/DeleteJobBookingFee/",
  },
  subscription: {
    addCategoryToPlan: "Subscription/newsubscriptionfixcategory",
    addClassToPlan: "Subscription/newsubscriptionfixclass",
    activeCustomerSubs: "Subscription/GetCustomerActiveSubscriptions",
    checkEligibility:
      "Subscription/CheckCustomerSubscriptionPlanEligiblity?subscriptionPlanId=",
    createPlanWithSub: "Subscription/newsubscriptionplan",
    createSubscription: "Subscription/newsubscription",
    plansById: "Subscription/getsubscriptionbyid",
    plansByStatus: "Subscription/GetAllAvailableSubscriptionPlans",
    usePlan: "Subscription/UseSubscriptionPlanForJob",
    subsById: "Subscription/GetCustomerSubscription",
  },
  supplier: {
    formValues: "Supplier/GetStatuses",
    createSupplier: "Supplier/CreateSupplierApplicationByAdmin",
  },
  territory: {
    all: "Territory/GetAllTerritories",
    details: "Territory/GetTerritoryDetails?territoryId=",
    create: "Territory/CreateTerritory",
    countries: "Territory/GetAllCountries",
    countryCities: "Territory/GetCountryCities",
    createUpdateCites: "Territory/CreateUpdateTerritoryWithCities",
    territoryByGeolocation: "Territory/GetTerritoryByGeolocation",
    activateOrDeactivateTerritory: "Territory/DeactivateActivateTerritory",
    deactivateCity: "Territory/DeactivateCity",
    checkCityExistence: "Territory/CheckCityExistence",
    editCityDate: "Territory/EditCityEndDate",
  },
  territoryCategory: {
    allTerritoryCategory: "TerritoryCategories/GetAllTerritoryCategory",
    createTerritoryCategory: "TerritoryCategories/CreateTerritoryCategory",
    updateTerritoryCategory: "TerritoryCategories/UpdateTerritoryCategory",
    territoryCategoryById: "TerritoryCategories/GetTerritoryCategoryByID",
  },
  territorySettings: {
    createBonus: "TerritorySettings/CreateCollaboratorBonus",
    createTarget: "TerritorySettings/CreateCollaboratorTarget",
    createTerritoryUplift: "TerritorySettings/CreateTerritoryRateUplift",
    createCollabUplift: "TerritorySettings/CreateCollaboratorRateUpLift",

    bonusesByTerritory: "TerritorySettings/GetAllCollaboratorBonuses",
    targetsByTerritory: "TerritorySettings/GetAllCollaboratorTargets",
    upliftsByTerritory: "TerritorySettings/GetAllTerritoriesRateUpLifts",

    bonusDetails: "TerritorySettings/GetCollaboratorBonusDetails",
    targetDetails: "TerritorySettings/GetCollaboratorTargetDetails",
    collabUpliftDetails: "TerritorySettings/GetCollaboratorRateUpLifts",

    updateBonus: "TerritorySettings/UpdateCollaboratorBonusDetails",
    updateTarget:
      "TerritorySettings/UpdateCollaboratorTargetDetails/?targetId=",
    updateTerritoryUplift: "TerritorySettings/UpdateTerritoryRateUpliftDetails",
    updateCollabUplift: "TerritorySettings/UpdateCollaboratorRateUpLiftDetails",
    getCollaboratorEarning: "CollaboaratorEarning/GetUserTargetBonus",
  },
  training: {
    getTrainingType: "Training/GetTrainingType",
    getTrainingReminder: "Training/GetReminderValues",
    getTraining: "Training/GetAllTraining",
    createTraining: "Training/AssignTrainingToUser",
  },
  warranty: {
    new: "Warranty/newwarranty",
    all: "Warranty/allwarranty",
  },
  wallet: {
    generatePin: "Wallet/GenerateWalletPin",
    getDebitCodes: "Wallet/GetDebitCodes",
    respondToWithdrawalRequest: "Wallet/ApproveOrRejectWithdrawalRequest",
    getWithdrawalRequestByStatus: "Wallet/GetWalletWithdrawalRequestsByStatus",
  },
  ratingType: {
    createRatingType: "RatingType/CreateRatingType",
    getCollaboratorRatingParameters: "RatingType/GetAllRatingType",
    updateRatingType: "RatingType/EditRatingType",
    getAllRatingTypes: "RatingType/GetAllRatingType",
  },

  ratingBonusSetUp: {
    createRatingBonus: "RatingBonusSetup/CreateRatingBonusSetup",
    updateRatingsBonus: "RatingBonusSetup/UpdateRatingBonusSetup",
    getAllRatingBonus:"RatingBonusSetup/GetAllRatingBonusSetup",

  },


  ratingDefaultSetUp: {
    createRatingDefault: "RatingDefault/CreateRatingDefaultValue",
    updateRatingDefault: "RatingDefault/UpdateRatingDefaultValue",
    getallRatingDefault:"RatingDefault/GetAllRatingDefaultValue",
  },

  account: {
    getUserAccounts: "UserAccount/GetCustomersByType",
  },
  userManagement: {
    getSuspendedUsers: "UserManagement/GetAllSuspendedUsers",
    unsuspendUsers: "UserManagement/ToggleUserStatus",
  },
  earnings: {
    createCollaboratorEarnings: "EarningSettings/AddEarningSettings",
    getCollaboratorEarningById: "EarningSettings/GetEarningSettingsByRoleId",
    updateCollaboratorEarnings: "EarningSettings/UpdateEarningSettings",
    deleteCollaboratorEarnings: "EarningSettings/DeactivateEarningSettingsById",
    getInterval: "EarningSettings/GetIntervals",
  },
  fixClasses: {
    getAllFixClasses: "FixClasses/GetFixClasses",
  },
  reactDeactivate: {
    activateOrDeactivateCategory: "ReactDeactivate/ReactDeactivateModule",
  },
  referral: {
    createReferral: "Referral/CreateReferralSettings",
    getAllReferralAdminRecord: "Referral/GetAllReferralRecordsByAdmin",
    getAllReferral: "Referral/GetAllReferralSettings",
    updateReferralSettings: "Referral/UpdateReferralSettings",
  },
};
