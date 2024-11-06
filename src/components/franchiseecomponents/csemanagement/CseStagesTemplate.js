export const ApplicantsTableHeading = ({ stageId, className }) => {
  return (
    <thead className={className}>
      {stageId === 4 && (
        <tr>
          <th>Name</th>
          <th>Exam Date</th>
          <th>Time Spent on Materials</th>
          <th>Exam Score</th>
          <th>No of Sittings</th>
          <th>Grade</th>
        </tr>
      )}
    </thead>
  );
};

export const Stage4Template = ({ cseApplicants }) => {
  const template = cseApplicants.map((applicant) => {
    return (
      <tr key={applicant.id}>
        <td>{applicant.name}</td>
        <td style={{ color: "#818181" }}>{applicant.examDate}</td>
        <td>{applicant.learningTime}</td>
        <td style={{ color: "var(--clr-primary)" }}>{applicant.examScore}</td>
        <td>{applicant.noOfSittings}</td>
        <td
          style={{
            color: applicant.grade === "Passed" ? "#006717" : "#E01B1B",
          }}
        >
          {applicant.grade}
        </td>
      </tr>
    );
  });
};
