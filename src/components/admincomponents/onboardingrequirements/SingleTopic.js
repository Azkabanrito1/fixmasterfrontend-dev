import { Stack } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const SingleTopic = ({ editTopic, topics, deleteTopic, index }) => {
  const actions = [
    ...(!!editTopic
      ? [
          {
            id: 1,
            name: "Edit",
            action: () => editTopic(topics.id),
            disabled: topics?.status === "Inactive",
          },
        ]
      : []),
    { id: 2, name: "Delete", action: () => deleteTopic(topics.id) },
  ];
  return (
    <Stack
      position="relative"
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={2}
      p={2}
      borderRadius={2}
      bgcolor={"#f8e9e2"}
    >
      <Stack direction={"row"} spacing={2}>
        <span className="fw-bold fs-4">{index + 1}</span>
        <p>{topics?.topic}</p>
      </Stack>

      <GlobalTableActions actions={actions} id="topic" />
    </Stack>
  );
};

export default SingleTopic;
