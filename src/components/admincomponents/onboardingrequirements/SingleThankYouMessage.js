import { Stack } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const SingleThankYouMessage = ({
  editMessage,
  messages,
  deleteMessage,
  index,
}) => {
  const actions = [
    ...(!!editMessage
      ? [
          {
            id: 1,
            name: "Edit",
            action: () => editMessage(messages?.id),
          },
        ]
      : []),
    { id: 2, name: "Delete", action: () => deleteMessage(messages?.id) },
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
        <p>{messages?.content}</p>
      </Stack>

      <GlobalTableActions actions={actions} id="message" />
    </Stack>
  );
};

export default SingleThankYouMessage;
