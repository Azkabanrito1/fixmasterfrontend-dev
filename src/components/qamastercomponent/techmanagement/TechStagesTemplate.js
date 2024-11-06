import { NoData } from "../../globalcomponents/Utilities";
import StageTwoAction from "./StageTwoAction";
import StageThreeAction from "./StageThreeAction";
import StageFourAction from "./StageFourAction";
import StageFiveAction from "./StageFiveAction";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import {
  useAcceptTechnician,
  useRejectTechnician,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

export const ApplicantsTableHeading = ({ stageId, className }) => {
  return (
    <thead className={className}>
      {stageId === 1 && (
        <tr>
          <th>Name</th>
          <th>Categories</th>
          {/* <th>Territory</th> */}
          <th>CV</th>
          <th>Smartphone</th>
          <th>Languages</th>
          <th>Application Date</th>
          <th className="align-right">Action</th>
        </tr>
      )}
      {stageId === 2 && (
        <tr>
          <th>Name</th>
          <th>Categories</th>
          <th>Territory</th>
          <th>Exam Date</th>
          <th>MCQ Score</th>
          <th>Grade</th>
          <th className="align-right">Action</th>
        </tr>
      )}
      {stageId === 3 && (
        <tr>
          <th>Name</th>
          <th>Categories</th>
          <th>Territory</th>
          <th>Discussion</th>
          <th>Languages</th>
          <th className="align-right">Action</th>
        </tr>
      )}
      {stageId === 4 && (
        <tr>
          <th>Name</th>
          <th>Categories</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Folder</th>
          <th>Folder Passed</th>
          <th>Status</th>
          <th className="align-right">Action</th>
        </tr>
      )}
      {stageId === 5 && (
        <tr>
          <th>Name</th>
          <th>Categories</th>
          <th>Territory</th>
          <th>Language</th>
          <th>Interview Date</th>
          <th className="align-right">Action</th>
        </tr>
      )}
    </thead>
  );
};

export const Stage1Template = ({ techApplicants }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar("Application successfully acceptd", {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const onSuccessReject = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const { mutate: acceptApplicant } = useAcceptTechnician(onSuccess, onFailure);
  const { mutate: rejectApplicant } = useRejectTechnician(
    onSuccessReject,
    onFailure
  );
  const template = techApplicants?.map((applicant) => {
    // table actions
    const actions = [
      {
        id: 1,
        name: "Accept Application",
        action: () => acceptApplicant(applicant.id),
      },
      {
        id: 2,
        name: "Reject Application",
        action: () => rejectApplicant(applicant.id),
      },
    ];
    return (
      <tr key={applicant.id}>
        <td>{applicant.firstName}</td>
        <td>{applicant.preferredCategory}</td>
        {/* <td>{applicant.territory}</td> */}
        <td>
          <a href={applicant.attachment.contentUrl} className="cv">
            View
          </a>
        </td>

        <td>{applicant.smartPhone ? "Yes" : "No"}</td>
        <td>{applicant.preferredLanguage}</td>
        <td>
          {applicant.dateApplied
            ? format(new Date(applicant.dateApplied))
            : applicant.dateApplied}
        </td>

        <td className="align-right">
          <GlobalTableActions actions={actions} id="technician" />
        </td>
      </tr>
    );
  });
  return techApplicants?.length ? template : <NoData cols="8" />;
};

export const Stage2Template = ({ techApplicants }) => {
  const template = techApplicants?.map((applicant) => {
    return (
      <tr key={applicant.id}>
        <td>{applicant.name}</td>
        <td>{applicant.categories}</td>
        {/* <td>{applicant.territories}</td> */}
        <td style={{ color: "#818181" }}>
          {applicant.examDate ? format(new Date(applicant.examDate)) : ""}
        </td>
        <td style={{ color: "var(--clr-primary)", textAlign: "center" }}>
          {applicant.mcqMark}
        </td>
        <td
          style={{
            color: applicant.grade === "Passed" ? "#006717" : "#E01B1B",
          }}
        >
          {applicant.grade}
        </td>
        <td>
          <StageTwoAction applicantId={applicant.id} />
        </td>
      </tr>
    );
  });
  return techApplicants?.length ? template : <NoData cols="7" />;
};
export const Stage3Template = ({ techApplicants }) => {
  const template = techApplicants?.map((applicant) => {
    return (
      <tr key={applicant.id}>
        <td>{applicant.name}</td>
        <td>{applicant.categories}</td>
        <td>{applicant.territories}</td>
        <td style={{ color: "#818181" }}>
          {applicant.discussionDate
            ? format(new Date(applicant.discussionDate))
            : ""}
        </td>
        <td>{applicant.language}</td>
        <td>
          <StageThreeAction applicantId={applicant.id} />
        </td>
      </tr>
    );
  });
  return techApplicants?.length ? template : <NoData cols="7" />;
};
export const Stage4Template = ({ techApplicants }) => {
  const template = techApplicants?.map((applicant) => {
    return (
      <tr key={applicant.id}>
        <td>{applicant.name}</td>
        <td>{applicant.categories}</td>
        <td style={{ color: "#818181" }}>
          {applicant.startDate ? format(new Date(applicant.startDate)) : ""}
        </td>
        <td style={{ color: "#818181" }}>
          {applicant.endDate ? format(new Date(applicant.endDate)) : ""}
        </td>
        <td>{applicant.totalFolder}</td>
        <td>{applicant.folderPassed}</td>
        <td style={{ color: "#ff9b04" }}>{applicant.status}</td>
        <td>
          <StageFourAction applicantId={applicant.id} />
        </td>
      </tr>
    );
  });
  return techApplicants?.length ? template : <NoData cols="8" />;
};
export const Stage5Template = ({ techApplicants }) => {
  const template = techApplicants?.map((applicant) => {
    return (
      <tr key={applicant.id}>
        <td>{applicant.name}</td>
        <td>{applicant.categories}</td>
        <td>{applicant.territories}</td>
        <td>{applicant.language}</td>
        <td style={{ color: "#818181" }}>
          {applicant.interviewDate
            ? format(new Date(applicant.interviewDate))
            : ""}
        </td>
        <td>{applicant.totalFolder}</td>
        <td>{applicant.folderPassed}</td>
        <td style={{ color: "#ff9b04" }}>{applicant.status}</td>
        <td>
          <StageFiveAction applicantId={applicant.id} />
        </td>
      </tr>
    );
  });
  return techApplicants?.length ? template : <NoData cols="7" />;
};
