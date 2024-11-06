import { useState } from "react";
import styled from "styled-components";
import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import { LuFileVideo } from "react-icons/lu";
import { AiTwotoneFilePdf } from "react-icons/ai";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useGetCourses } from "../../../hooks/useQueries/useOnboarding";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";

const Materials = ({ title }) => {
  const { folderId } = useParams();
  const [startExam, setStartExam] = useState(false);
  const navigate = useNavigate();

  const showStartExam = () => setStartExam(true);

  //fetching using react-query
  const { data: trainingCourses, isLoading } = useGetCourses(folderId);

  const handlePdfClick = ({ url, title }) => {
    navigate(`../view-pdf?url=${url}&title=${title}`);
  };

  const handleVideoClick = ({ url, title }) => {
    navigate(`../view-video?url=${url}&title=${title}`);
  };

  const fileTemplate = trainingCourses?.courses?.map((file) => {
    return (
      <File key={Math.random()}>
        {file.contentType === "pdf" ? (
          <div
            className="d-flex align-items-center flex-column"
            onClick={() =>
              handlePdfClick({ url: file.contentUrl, title: file.name })
            }
          >
            <AiTwotoneFilePdf />
            <span>{file.name}</span>
          </div>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            onClick={() =>
              handleVideoClick({ url: file.contentUrl, title: file.name })
            }
          >
            <LuFileVideo />
            <span>{file.name}</span>
          </div>
        )}
      </File>
    );
  });

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>{title}</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <>
          <FileContainer>{fileTemplate}</FileContainer>
          {!trainingCourses?.isExamPassed && (
            <GlobalBtn
              mx="auto"
              width="max-content"
              px="4rem"
              onClick={showStartExam}
            >
              Start Exam
            </GlobalBtn>
          )}
        </>
      )}

      {startExam && (
        <ConfirmAcceptModal
          open={startExam}
          close={() => setStartExam(false)}
          onDelete={() => navigate(`../exam/${folderId}`)}
          labelText={"Attempt Exam"}
          pText={"Are you sure you want to attempt this exam?"}
          actionText={"Start Exam"}
        />
      )}
    </>
  );
};

export default Materials;

const FileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  svg {
    font-size: 8rem;
    color: var(--clr-primary);
  }

  span {
    font-size: 0.9rem;
  }
`;
