import { Button, Paper, Stack } from "@mui/material";
import { AiFillFilePdf } from "react-icons/ai";
import { LuFileVideo2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useViewAllTermsAndConditions } from "../../../hooks/useQueries/useAdmin";
import { AiTwotoneFileImage } from "react-icons/ai";
import styled from "styled-components";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../globalcomponents/Utilities";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useState } from "react";
import AddTermsAndConditionsFile from "./AddTermsAndConditionsFile";

const AdminTermsAndConditions = () => {
  const [showAddFile, setShowAddFile] = useState(false);

  const { data: termsAndConditionsData, isLoading } =
    useViewAllTermsAndConditions();

  const openAddFile = () => setShowAddFile(true);
  const closeAddFile = () => {
    setShowAddFile(false);
  };

  const termsAndConditions = termsAndConditionsData?.data;

  return (
    <Stack spacing={4} height={"100%"}>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            Terms and Conditions
          </PageHeading>
          <Button
            onClick={openAddFile}
            sx={{
              bgcolor: "var(--clr-primary)",
              color: "#fff",
            }}
          >
            Add File
          </Button>
        </Stack>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {termsAndConditions?.length === 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <div>
            <p className="text-muted">You have not yet added a file</p>
            <AddBtn
              action={openAddFile}
              text="Add File"
              id="add-file-btn"
              mt={"1rem"}
            />
          </div>
        </Stack>
      ) : (
        <UserCardsContainer>
          {termsAndConditions?.map((file) => {
            return (
              <Paper sx={{ padding: 1.3 }} key={file.fileId}>
                <Stack justifyContent="space-between" height="100%">
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    marginBottom={1.5}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Stack alignItems={"center"}>
                        <h3 className="fs-5">{file.collab}</h3>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Link to={file.fileUrl} target="_blank">
                      <Button
                        sx={{
                          color: "#11E981",
                          textTransform: "capitalize",
                          backgroundColor: "#11E9811A",
                          width: "100%",
                        }}
                      >
                        Preview file
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </UserCardsContainer>
      )}

      {showAddFile && (
        <AddTermsAndConditionsFile
          isOpen={showAddFile}
          closeModal={closeAddFile}
        />
      )}
    </Stack>
  );
};

export default AdminTermsAndConditions;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
