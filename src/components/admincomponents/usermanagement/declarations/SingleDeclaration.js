import { Stack } from "@mui/material";
import GlobalTableActions from "../../../globalcomponents/GlobalTableActions";

const SingleDeclaration = ({
  declaration,
  editDeclaration,
  deleteDeclaration,
  index,
}) => {
  const actions = [
    ...(!!editDeclaration
      ? [
          {
            id: 1,
            name: "Edit",
            action: () => editDeclaration(declaration.id),
          },
        ]
      : []),
    { id: 2, name: "Delete", action: () => deleteDeclaration(declaration.id) },
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
        <p>{declaration?.content}</p>
      </Stack>

      <GlobalTableActions actions={actions} id="declarations" />
    </Stack>
  );
};

export default SingleDeclaration;
