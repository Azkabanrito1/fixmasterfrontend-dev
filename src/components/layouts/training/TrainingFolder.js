import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  useGetStageId,
  useGetTestTypeByStageId,
  useGetTrainingFolder,
} from "../../../hooks/useQueries/useOnboarding";
import { PageHeading } from "../../globalcomponents/Utilities";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { AiOutlineFolderOpen } from "react-icons/ai";
import GlobalHTMLToolTip from "../../globalcomponents/GlobalHTMLToolTip";

const TrainingCourses = () => {
  const navigate = useNavigate();

  // fetching
  const { data: onboardingData } = useGetStageId({
    refetchOnWindowRefocus: false,
  });
  const stageId = onboardingData?.data?.stageId;

  const { data: folderItem, isLoading: loadingTestType } =
    useGetTestTypeByStageId(stageId, { enabled: !!stageId });
  const testtypeid = folderItem?.data?.id;

  const { data: folderType, isLoading: loadingFolder } = useGetTrainingFolder(
    testtypeid,
    {
      enabled: !!testtypeid,
    }
  );

  const folderTemplate = folderType?.data?.map((folder) => {
    return (
      <Folder
        key={folder.folderId}
        onClick={() => navigate(`materials/${folder.folderId}`)}
      >
        <AiOutlineFolderOpen />
        <GlobalHTMLToolTip color="var(--clr-primary)" text={folder.description} />
        <span>{folder.name}</span>
      </Folder>
    );
  });

  return (
    <>
      <div className="mb-5">
        <PageHeading>My Training</PageHeading>
      </div>

      <GlobalBallBeat loading={loadingFolder || loadingTestType} />

      {!(loadingFolder || loadingTestType) && (
        <FolderContainer>{folderTemplate}</FolderContainer>
      )}
    </>
  );
};

export default TrainingCourses;

export const Folder = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  aspect-ratio: 1.2 / 1;
  background-color: #f6e7e0;
  cursor: pointer;

  svg {
    display: block;
    color: var(--clr-primary);
    font-size: 5rem;
  }

  span {
    position: absolute;
    top: 100%;
    padding: 12px;
    color: #000;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
  }
`;

export const FolderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  column-gap: 20px;
  row-gap: 100px;
`;
