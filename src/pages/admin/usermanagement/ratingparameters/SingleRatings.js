import { Stack } from "@mui/material";
import React from "react";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";

const SingleRatings = ({ editRating, deleteRating, ratings, index }) => {
  const actions = [
    ...(!!editRating
      ? [
          {
            id: 1,
            name: "Edit",
            action: () => editRating(ratings.id),
          },
        ]
      : []),
    { id: 2, name: "Delete", action: () => deleteRating(ratings.id) },
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
        <p>{ratings?.name}</p>
      </Stack>

      <GlobalTableActions actions={actions} id="topic" />
    </Stack>
  );
};

export default SingleRatings;
