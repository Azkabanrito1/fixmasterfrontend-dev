import { jobStages, progressStages } from "./selectOptions";
import { isAfter, isBefore } from "date-fns";

export function formatCardNumber(number) {
  return number
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function capitalizeWords(inputString) {
  // Split the input string into an array of words
  const words = inputString.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Ensure the word is not empty
    if (word.length > 0) {
      // Capitalize the first letter and concatenate with the rest of the word
      return word[0].toUpperCase() + word.slice(1);
    } else {
      return word; // Preserve empty words (e.g., multiple spaces)
    }
  });

  // Join the capitalized words back into a single string
  return capitalizedWords.join(" ");
}

export function dateComparator(dateA, dateB) {
  const timeA = new Date(dateA);
  const timeB = new Date(dateB);

  // Compare the dates
  if (isBefore(timeA, timeB)) {
    return -1; // dateA is earlier than dateB
  } else if (isAfter(timeA, timeB)) {
    return 1; // dateA is later than dateB
  } else {
    return 0; // dateA and dateB are equal
  }
}

export function getActiveProgressBarStatus(fixStatus) {
  let milestone;
  let stageIndex = jobStages.findIndex(
    (stage) => stage.name.toLowerCase() === fixStatus?.toLowerCase()
  );
  while (stageIndex > 0) {
    const activeStage = jobStages[stageIndex];
    if (
      activeStage?.name?.toLowerCase() === "franchisee requested" ||
      activeStage?.name?.toLowerCase() === "cse requested"
    ) {
      milestone = progressStages[0];
      break;
    }
    const milestoneStage = progressStages.filter(
      (stage) => activeStage?.name?.toLowerCase() === stage.name.toLowerCase()
    );
    if (milestoneStage.length) {
      milestone = milestoneStage[0];
      break;
    }

    stageIndex -= 1;
  }

  const activeStage = progressStages.filter((stage) =>
    stage.name.toLowerCase().includes(milestone?.name?.toLowerCase())
  )?.[0]?.id;
  return activeStage - 1;
}

export function getStatusIndex(fixStatus) {
  const stageIndex = jobStages.findIndex(
    (stage) => stage.name.toLowerCase() === fixStatus?.toLowerCase()
  );
  return stageIndex;
}

export function stringComparator(arr = []) {
  arr.sort(function (a, b) {
    // compare the name values of a and b in lowercase
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    // if nameA comes before nameB alphabetically, return -1
    if (nameA < nameB) {
      return -1;
    }
    // if nameA comes after nameB alphabetically, return 1
    if (nameA > nameB) {
      return 1;
    }
    // if nameA and nameB are equal, return 0
    return 0;
  });

  return arr;
}

export const generateTimerOffset = (time) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + time);

  return now;
};

// convert blob/file to base64
export const toBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// get max legal age i.e. 18 years old
export const getMaxDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const maxYear = year - 18;
  const max = `${maxYear}-${String(today.getMonth()).padStart(2, "0")}-${String(
    today.getDay()
  ).padStart(2, "0")}`;
  return max;
};

// get today's date
export const getToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

//capitalize only the first letter of the string.
export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export function formatNumberWithCommas(number) {
  // Check if the input is a valid number
  if (typeof number !== "number") {
    throw new Error("Input is not a valid number");
  }

  // Use the toLocaleString method to format the number with commas
  return number.toLocaleString();
}

export function formatNumber(input) {
  // Remove existing commas and formatting
  const unformattedValue = input.value.replace(/,/g, "");

  // Check if the input is a valid number
  if (!isNaN(unformattedValue)) {
    // Format the number with commas
    const formattedValue = parseFloat(unformattedValue).toLocaleString();
    input.value = formattedValue;
  }
}

// use get the first username
export const username = (applicant) => {
  return (applicant.username =
    applicant.name.charAt(0).toUpperCase() +
    applicant.name.slice(1).split(" ")[0]);
};

export const convertTime = (time) => {
  let [hours, minutes] = time.split(":");
  let suffix = "AM";

  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (hours >= 12) {
    suffix = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12;
  }
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${suffix}`;
};

export const earningTypes = [
  {
    id: 1,
    name: "Flat Rate",
  },
  {
    id: 2,
    name: "Percentage",
  },
];

export const earningStatus = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
];

export const ratingStatus = [
  {
    id: 0,
    name: "Inactive",
  },
  {
    id: 1,
    name: "Active",
  },
  
];
