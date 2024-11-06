const onboarding = {
  admin: {
    approveCollaboratorOnboarding:
      "Admin/ApproveCollaboratorOnboardingByHrAdmin?userId=",
    rejectCollaboratorOnboarding:
      "Admin/RejectCollaboratorFinalOnboardingByHrAdmin",
    getTechnicianMapping: "Admin/GetQaTechnicianMappingAssesment",
    getQaAndFranchiseeMcq: "Admin/GetQAFranchiseeMCQ/",
    getQaAndFranchiseeMcqByUserId: "Admin/GetQAFranchiseeMCQByUserId",
    gradeApplicantInterview: "Admin/GradeApplicantInterview",
    viewApplication: "Admin/GetApplicantsDetailsByRoleAndApplicantId",

    // approving QA
    getQaApplication: "Admin/GetQaApplicant",
    approveQaApplication: "Admin/ApproveQaApplication",
    rejectQaApplicant: "Admin/RejectQaApplication",
    getQaForDiscussion: "Admin/GetQaForDiscussionStageByHr",
    getQaForFinalApproval: "Admin/GetQaMasterForFinalApprovalByHr",
    getQaApplicants: "Admin/GetQaApplicant",
    setDiscussionDateForQA: "Admin/SetDiscussionDateForQAByHrAdmin",
    gradeApplicantInterviews: "Admin/GradeApplicantInterviews",

    // approving CCO
    getCCOApplicants: "Admin/GetCCOApplicants",
    getCCOForFinalApproval: "Admin/GetCCOForFinalApprovalByHr",
    approveCCOApplication: "Admin/ApproveCCOApplication?applicantId=",
    rejectCCOApplication: "Admin/RejectCCOApplication?applicantId=",
    getCCOInterviewStage: "Admin/GetCCOInInterviewStageByHr",
    approveCCOInterviewStage: "Admin/ApproveCCOInterviewStageByHr?ccoUserId",
    rejectCCOInterviewStage: "Admin/RejectCCOInterviewStageByHr?ccoUserId",
    getCCOforDiscussion: "Admin/GetCCOForDiscussionByHr",
    setCCODiscussionDate: "Admin/SetDiscussionDateForCCOByHrAdmin",
    getCcoFirstMcq: "Admin/GetCCOFirstMCQ",
    getCCOInterview: "Admin/GetCCOInterview",
    gradeCcoApplicant: "Admin/GradeCCOInterview",
    getCCOSecondMcq: "Admin/GetCCOSecondMcq",
    getCCOFinalMcq: "Admin/GetCCOSecondMCQ",
    getCCOFifthStage: "Admin/GetCCOFinalStage",
    // approving franchisee
    getFranchiseeForDiscussion: "Admin/GetFranchiseeForDiscussionStageByHr",
    getFranchiseeForFinalApproval: "Admin/GetFranchiseeForFinalApprovalByHr",
    getFranchiseeApplicants: "Admin/GetFranchiseeFirstApplicants",
    setDiscussionDateForFranchisee:
      "Admin/SetDiscussionDateForFranchiseeByHrAdmin",
    getFranchiseeAndQaStage2: "Admin/GetQAFranchiseeSecondStage/",
    rateCollaborator: "Admin/GetCollaboratorOnboardingRating",

    // approving supplier
    getSupplierForDiscussion: "Admin/GetSupplierForDiscussionStageByHr",
    getSupplierForFinalApproval: "Admin/GetSupplierForFinalApprovalByHr",
    getSupplierApplicants: "Admin/GetSupplierApplicants",
    setDiscussionDateBySupplier:
      "Admin/SetDiscussionDateForSupplierBySupplierAdmin",
    approveSupplierApplication: "Admin/ApproveSupplierApplication?applicantId=",
    rejectSupplierApplication: "Admin/RejectSupplierApplication?applicantId=",

    // ASSIGNWORKINGTYPE
    getCollaboratorForAssignMent: "Admin/GetCollaboratorForAssignment",
    assignWorkingType: "Admin/AssignWorkingTypeToCollaborator",
    getWorkingTypeHistory: "Admin/GetCollaboratorWorkingTypeHistory",
    rejectedCollaborators: "Admin/CollaboratorsRejected",

    // create collaborators by admin
    createCseByAdmin: "Admin/CreateCSEApplicationByAdmin",
    createFranchiseeByAdmin: "Admin/CreateFranchiseeApplicationByAdmin",
    createQaByAdmin: "Admin/CreateQAApplicationByAdmin",
    createSupplierByAdmin: "Admin/CreateSupplierApplicationByAdmin",
    createCcoByAdmin: "Admin/CreateCCOApplicationByAdmin",
    createTechnicianByAdmin: "Admin/CreateTechnicianApplicationByAdmin",
  },

  callcenter: {
    application: "CCO/CCOApplication",

    // approving cco
    getCCOApplicants: "Values/GetCCOApplicants",
    approveCCOApplicant: "Values/ApproveCCOApplication?applicantId=",
    rejectCCOApplicant: "Values/RejectCCOApplication?applicantId=",
  },
  course: {
    getFolderByStageId: "Course/CollaboratorsFolderTypeByStageId?stageId=",
    getTrainingFolders: "Course/GetTrainingFolders?testtypeid=",
    getTrainingInterviewQuestions:
      "Course/GetTrainingTestInterviewQuestions?folderId=",
    getCourses: "Course/GetCourses?folderid=",
    getTestQuestions: "Course/GetTrainingTestQuestions?folderId=",
    submitTestQuestions: "Course/SubmitTestQuestions",
    getInterviewQuestions: "Course/GetTrainingTestInterviewQuestions?folderId=",
    submitInterviewQuestions: "Course/SubmitTestInterviewQuestions",
    getAptitudeQuestions:
      "Course/GetTrainingTestQuestionsByTestTypeId?collabId=",
  },
  cse: {
    appication: "CSE/CSEFirstStageApplication",
    authAppication: "CSE/CSEFirstStageApplicationForAuthenticated",

    // approving cse
    cseAllStages: "Franchisee/CSEApplication",
    cseFirstStages: "Franchisee/CSEApplication",
    approveCSEApplication: "Franchisee/ApproveCseApplication?applicantId=",
    cseSecondStages: "Franchisee/GetCSEFirstMCQ",
    getCSEThirstStageRating: "Franchisee/CSEThirdStageRating",
    gradeCSEThirdStage: "Franchisee/GradeCSEThirdStageRatings",
    getCSEThirdStageApplication: "Franchisee/CSEThirdStageApplication",
    getCSEFifthStage: "Franchisee/CSEFifthStage",
    getCSESecondMCQ: "Franchisee/GetCSESecondMCQ",
    setDiscussionDate: "Franchisee/CreateStageFiveInterview",
    getCseFinalMcq: "Franchisee/GetCSESecondMCQ",
    getCseFinalMcqUserById: "Franchisee/GetCSESecondMCQ/CSEId?CSEId=",
    approveCSEFifthStage: "Franchisee/AcceptCSEStageFiveApplication?cseId=",
    rejectCSEFifthStage: "Franchisee/RejectCSEStageFiveApplication",
    rejectFirstStage: "Franchisee/RejectCSEApplication ",
  },
  franchisee: {
    application: "Franchisee/CreateFranchiseeApplication",
    authApplication: "Franchisee/CreateFranchiseeApplicationAuthenticated",

    // approving franchisee
    getFranchiseeApplicants: "Values/GetFranchiseeApplicants",
    approveFranchisee: "Admin/ApproveQAFranchiseeFirstApplication",
    getCseInterviewVideos:
      "Franchisee/GetCSEThirdStageApplication/CSEId?userId=",
    rejectFranchisee: "Admin/RejectFranchiseeQaFirstApplication",
  },
  qamaster: {
    application: "QAMaster/QAMasterApplication",
    authApplication: "QAMaster/QAMasterApplicationAuthenticated",
    getTechnicianApplicantStageOne: "QAMaster/GetTechnicianApplicants",
    approvedTechnicianApplicantStageOne:
      "QAMaster/ApproveFirstStageTechnicianApplication?applicantId=",
    rejectTechnicianApplicant: "QAMaster/RejectTechnicianFirstStage",
    getTechnicianApplicantStageTwo: "QAMaster/GetTechnicianFirstMCQ",
    setDiscussionDate: "QAMaster/SetDiscussionDateForTechnicianByQA",
    getTechThirdRatings: "QAMaster/GetTechnicianSecondStageRatings",
    gradeTechThirdRatings: "QAMaster/GradeTechnicianSecondStageRatings",
    getTechInterview: "QAMaster/GetTechnicianInterviewStage?DiscussionType=",
    technicianFinalInterview:
      "QAMaster/SetFinalDiscussionDateForTechnicianByQA",
    technicianFinalAproval:
      "QAMaster/AcceptTechnicianFinalApproval/TechnicianId?TechnicianId=",
    technicianRejectApproval:
      "QAMaster/RejectTechnicianFinalApproval/TechnicianId",
    technicianSecondMcq: "QAMaster/GetTechnicianSecondMCQ",
    getTechnicialMcqResultLastStage:
      "QAMaster/GetTechnicianSecondMCQ/TechnicianId?TechnicianId=",
  },
  supplier: {
    application: "Supplier/SupplierApplication",
    createBranchesAddress: "Supplier/CreateSupplierBranch",
    getBranchesAddress: "Supplier/GetSuppliersBranches",
    trustedCustomer: "Supplier/SupplierTrustedCustomer",
    getTrustedCustomer: "Supplier/GetSuppliersTrustedCustomers",
    deleteTrustedCustomer: "Supplier/DeleteSupplierBranch/",
    updateBranchAddress: "Supplier/UpdateSupplierBranch",

    // approving supplier
    supplierApplicants: "Values/GetSupplierApplicants",
    approveSupplier: "Values/ApproveSupplierApplication?applicantId=",
    rejectSupplier: "Values/RejectSupplierApplication?applicantId=",
    supplierForFinalApproval: "Values/GetSupplierForFinalApprovalByHr",
    updateTrustedCustomer: "Supplier/UpdateSuppliersTrustedCustomers",
  },
  technician: {
    application: "Technician/TechnicianApplication",
  },
  values: {
    acceptDeclaration: "Values/AcceptDeclaration",
    createGuaratorInfo: "Values/CreateGuarantorInfomation",
    updateGuaratorInfo: "Values/UpdateGuarantorInfomation",
    getGuaratorInfo: "Values/GetGuarantorInfomation",
    updateProfile: "Values/profileupdate",
    getProfile: "Values/getuserprofile",
    getOnboardingMsg: "Values/GetUserOnboardingMessage",
    getPreboardingMsg: "Values/PreboardingMessage",
    getPreboardingDeclarations: "Values/preboardingDeclaration",
    getLanguage: "Values/Languages",
    getCategories: "Values/Categories",
    getSubCategories: "Values/SubCategories",
    verifyToken: "Values/VerifyCollaboratorsToken?token=",
    socialMediaPlatforms: "Values/GetAllSocialMediaPlatform",
    getStageId: "Values/GetCollaboratorCurrentStage",
    getBankName: "Values/Banks",
    getBankNames: "https://api.paystack.co/bank?country=nigeria",
    createCollaboratorBankAccount: "Values/CreateCollaboratorBankDetails",
    getAccountDetails: "Values/GetCollaboratorBankDetails",
    setDefaultCard: "Values/SetBankDetailAsDefault/BankId?BankId=",
    deletBankAccount: "Values/DeleteBankDetails/BankId?BankId=",
    acceptOnboardingMsgorDec: "Values/acceptonboardingdeclarationormessage",
    qualifications: "Values/AcademicQualification",
  },
};

export default onboarding;
