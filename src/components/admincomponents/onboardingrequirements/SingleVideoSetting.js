import { Stack } from "@mui/material";
import styled from "styled-components";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const SingleVideoSetting = ({
  editVideoTopicSetting,
  videoTopicSetting,
  videoTopicSettings,
  deleteVideoTopicSetting,
  index,
}) => {
  const actions = [
    ...(!!editVideoTopicSetting
      ? [
          {
            id: 1,
            name: "Edit",
            action: () => editVideoTopicSetting(videoTopicSetting?.id),
          },
        ]
      : []),
    {
      id: 2,
      name: "Delete",
      action: () => deleteVideoTopicSetting(videoTopicSetting?.id),
    },
  ];

  const maxFileSize = Math.max(
    ...videoTopicSettings.map((setting) => setting.fileSize)
  );

  return (
    <Container>
      <Par1>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <span className="fw-bold fs-4">{index + 1}</span>
          <p>File Type: {videoTopicSetting?.fileType}</p>
        </Stack>
      </Par1>
      <Par2>File Size: {videoTopicSetting?.fileSize}MB</Par2>
      <ActionDiv>
        <GlobalTableActions actions={actions} id="videoTopicSetting" />
      </ActionDiv>
    </Container>
  );
};

export default SingleVideoSetting;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 25px 15px;
  justify-items: center;
  align-items: start;
  background-color: #f8e9e2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Par1 = styled.div`
  justify-self: start;
  @media (max-width: 768px) {
    justify-self: center;
  }
`;
const Par2 = styled.div`
  justify-self: start;
  margin-left: 80px;
  @media (max-width: 768px) {
    justify-self: center;
    margin-left: 0px;
  }
`;
const ActionDiv = styled.div`
  justify-self: end;
  @media (max-width: 768px) {
    justify-self: center;
  }
`;
