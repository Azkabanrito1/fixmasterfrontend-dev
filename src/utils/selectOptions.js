export const collaboratorsMenu = [
  {
    id: 1,
    icon: "/images/adminIcon1.jpg",
    title: "Franchisee",
    to: "franchisee",
  },
  {
    id: 2,
    icon: "/images/adminIcon1.jpg",
    title: "QA Master",
    to: "qa",
  },
  {
    id: 3,
    icon: "/images/adminIcon1.jpg",
    title: "CSE",
    to: "cse",
  },
  {
    id: 4,
    icon: "/images/adminIcon1.jpg",
    title: "Technician",
    to: "technician",
  },
  {
    id: 5,
    icon: "/images/adminIcon1.jpg",
    title: "Supplier",
    to: "supplier",
  },
  {
    id: 6,
    icon: "/images/adminIcon1.jpg",
    title: "Call Center Operator",
    to: "cco",
  },
];

export const days = [
  {
    id: 1,
    name: "Mon",
  },
  {
    id: 2,
    name: "Tue",
  },
  {
    id: 3,
    name: "Wed",
  },
  {
    id: 4,
    name: "Thur",
  },
  {
    id: 5,
    name: "Fri",
  },
  {
    id: 6,
    name: "Sat",
  },
  {
    id: 7,
    name: "Sun",
  },
];

export const jobTypes = {
  urgentUnAssigned: 1,
  unAssigned: 2,
  ongoing: 3,
  warrantyClaims: 8,
  completed: 5,
  rejected: 6,
  unAccepted: 7,
  close: 9,
};

export const orderStatus = {
  open: "New",
  progress: "Item Dispatched",
  progress1: "Item Received",
  completed: "Item Accepted",
};

export const replacedStatus = {
  new: "Item Rejected",
};

export const progressStages = [
  {
    id: 1,
    name: "Requested",
  },
  {
    id: 2,
    name: "Assigned",
  },
  {
    id: 3,
    name: "Diagnosis",
  },
  {
    id: 4,
    name: "Quote Generated",
  },
  {
    id: 5,
    name: "Quote Approved",
  },
  {
    id: 6,
    name: "Supplier Notified for Supply",
  },
  { id: 7, name: "Delivery Sheduled" },
  { id: 8, name: "Completed" },
];

export const jobStages = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Requested" },
  { id: 3, name: "Franchisee Assigned" },
  { id: 4, name: "CSE Assigned" },
  { id: 5, name: "Technician Assigned" },
  { id: 6, name: "Diagnosis Visit Date Set" },
  { id: 7, name: "Diagnosis" },
  { id: 8, name: "Spare Part Required" },
  { id: 9, name: "SparePart Requested" },
  { id: 10, name: "Quote Generation Processing" },
  { id: 11, name: "Customer Quote Notified" },
  { id: 12, name: "Quotation Accepted" },
  { id: 13, name: "Quotation Rejected" },
  { id: 14, name: "Quote Generated" },
  { id: 15, name: "Quote Notified" },
  { id: 16, name: "Quote Approved" },
  { id: 17, name: "Supplier Notified for Supply" },
  { id: 18, name: "Delivery Scheduled" },
  { id: 19, name: "Delivery Accepted" },
  { id: 20, name: "Delivery Rejected" },
  { id: 21, name: "Completed" },
  { id: 22, name: "CustomerRejected" },
  { id: 23, name: "Warranty" },
];

export const timeFilters = [
  {
    id: 1,
    name: "Today",
    key: "totalDay",
  },
  {
    id: 2,
    name: "This Week",
    key: "totalWeek",
  },
  {
    id: 3,
    name: "This Month",
    key: "totalMonth",
  },
  {
    id: 4,
    name: "This Year",
    key: "totalYear",
  },
];

export const jobFilters = [
  {
    id: 1,
    name: "Ongoing",
    key: "territoryOngoingJobs",
  },
  {
    id: 2,
    name: "New",
    key: "territoryNewJobs",
  },
  {
    id: 3,
    name: "Warranty",
    key: "territoryWarrantyJobs",
  },
  {
    id: 4,
    name: "Rejected",
    key: "territoryRejectedJobs",
  },
  {
    id: 5,
    name: "Completed",
    key: "territoryCompletedJobs",
  },
];

export const interviewTypes = [
  {
    id: 0,
    name: "Automated Interview",
    value: "AutomatedInterview",
  },
  {
    id: 1,
    name: "Offline Interview",
    value: "OfflineInterview",
  },
  {
    id: 2,
    name: "Job Readiness Interview",
    value: "JobReadinessInterview",
  },
];

export const cseFilters = [
  {
    id: 1,
    name: "Total CSEs",
    key: "totalCSEs",
  },
];

export const customerFilters = [
  {
    id: 1,
    name: "Estate",
    key: "estate",
  },
  {
    id: 2,
    name: "Regular",
    key: "regular",
  },
];

export const attendanceModes = [
  { id: 1, name: "Physical" },
  { id: 2, name: "Virtual" },
];

export const genderOptions = [
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
];

export const prefixes = [
  { id: 1, name: "Mr" },
  { id: 2, name: "Mrs" },
  { id: 3, name: "Dr" },
  { id: 4, name: "Miss" },
];

export const marital = [
  { id: 1, name: "Single" },
  { id: 2, name: "Married" },
  { id: 3, name: "Divorced" },
  { id: 4, name: "Widow/Widower" },
];

export const months = [
  { name: "Jan", id: 0 },
  { name: "Feb", id: 1 },
  { name: "Mar", id: 2 },
  { name: "Apr", id: 3 },
  { name: "May", id: 4 },
  { name: "Jun", id: 5 },
  { name: "Jul", id: 6 },
  { name: "Aug", id: 7 },
  { name: "Sep", id: 8 },
  { name: "Oct", id: 9 },
  { name: "Nov", id: 10 },
  { name: "Dec", id: 11 },
];

// cse trainings

export const cseTrainingTypes = [
  { id: 1, name: "Periodic Training" },
  { id: 2, name: "Performance Training" },
  { id: 3, name: "Specific Training" },
];

export const cseAttendanceModes = [
  { id: 1, name: "Physical" },
  { id: 2, name: "Virtual" },
];

export const cseTrainingNotSchedules = [
  { id: 1, name: "1 day before" },
  { id: 2, name: "2 days before" },
  { id: 3, name: "3 days before" },
  { id: 4, name: "4 days before" },
];

// admin

export const targetIntervals = [
  { id: 1, name: "Daily" },
  { id: 2, name: "Weekly" },
  { id: 3, name: "Monthly" },
  { id: 4, name: "Quarterly" },
  { id: 5, name: "Annually" },
];

export const bonusTypes = [
  { id: "Value Based", name: "Value Based (Flat Rate)" },
  { id: "Percentage Based", name: "Percentage Based" },
];

export const contractTypes = [
  { id: 1, name: "Full-time" },
  { id: 2, name: "Freelance" },
];

export const targetTypes = [
  { id: "Volume Based", name: "Volume Based (No of jobs done)" },
  { id: "Revenue Based", name: "Revenue Based" },
];

export const collaborators = [
  { id: "04799798-960b-46c5-874f-108365723451", name: "CSE" },
  { id: "954d5d6d-4ed0-4c27-a669-fbe9594b66e6", name: "Franchisee" },
  { id: "328aed52-7f29-4998-8bc9-146a76b764c1", name: "QA Master" },
  { id: "658b3d44-9497-46fa-b93b-1793516257d7", name: "Technician" },
  { id: 5, name: "CCO" },
  { id: "86fd72ab-e1c9-490e-a1de-762284b054c1", name: "Supplier" },
];

export const discountTypes = [
  { id: 1, name: "Multiple Service Per Equipment" },
  { id: 3, name: "Multiple Equipment" },
  { id: 4, name: "Promotional" },
];

export const invoiceComponents = [
  { id: 1, name: "Labour" },
  { id: 2, name: "Equipment" },
  { id: 3, name: "Logistics" },
  { id: 4, name: "Materials" },
  { id: 5, name: "Warranty" },
];

export const loyaltyTypes = [
  { id: 1, name: "Individual Spending" },
  { id: 2, name: "Cummulative Spending" },
];

export const CollaboratorTypes = [
  { id: 1, name: "Customer" },
  { id: 2, name: "Other Collaborators" },
];


export const warrantyTypes = [
  { id: 1, name: "Standard Warranty" },
  { id: 2, name: "Extended Warranty" },
];

export const audienceCategories = [
  { id: "customers", name: "Customer" },
  { id: "territories", name: "Territory" },
  { id: "estates", name: "Estate" },
];

export const statusOption = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Sacked",
  },
  {
    id: 3,
    name: "Dormant",
  },
  {
    id: 4,
    name: "Suspended",
  },
];

export const formatTime = (timeStr) => {
  const hours = parseInt(timeStr?.split(":")[0]);

  if (hours > 11) {
    return `${hours - 12}:${timeStr?.split(":")[1]?.slice(0, 2)} PM`;
  } else {
    return `${hours}:${timeStr?.split(":")[1]?.slice(0, 2)} AM`;
  }
};

export const docType = [
  { id: 1, name: "Passport" },
  { id: 2, name: "National ID (NIN)" },
  { id: 3, name: "Driver's License" },
  { id: 4, name: "Voter's Card" },
];

export const notification = [
  {
    id: 0,
    name: "Via Email Only",
  },
  {
    id: 1,
    name: "Via SMS Only",
  },
  {
    id: 2,
    name: "Both Email and SMS",
  },
];

export const answers = [
  {
    id: 0,
    name: "Yes",
  },
  {
    id: 1,
    name: "No",
  },
];

export const billNotifications = [
  {
    id: 0,
    name: "Send all quotation to both the account holder and fix contact person",
  },
  {
    id: 1,
    name: "Send quotation and billing notifications to the account holder only; All other notifications will be sent to the fix contact person",
  },
];




export const BonusTypeData = [
  {
    id: 0,
    name: "Cumulative",
  },
  {
    id: 1,
    name: "Per Job",
  }
];



export const valueTypeData = [
  {
    id: 1,
    name: "Percentage Rate",
  },
  {
    id: 2,
    name: "Flat Rate",
  }
];
export const incomeData = [
  {
    id: 0,
    name: "Immediately",
  },
  {
    id: 1,
    name: "Hourly",
  },
  {
    id: 2,
    name: "Daily",
  },
  {
    id: 3,
    name: "Weekly",
  },
  {
    id: 4,
    name: "Monthly",
  },
];

export const formatTimeToHour = (timeStr) => {
  if (!timeStr) return "";

  const [hours, minutes] = timeStr.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) return "";

  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${String(minutes).padStart(2, "0")}`;
};
