import { useEffect, useState } from "react";
import AltModalHeader from "../layouts/modal/AltModalHeader";
import GlobalBallBeat from "./GlobalBallBeat";
import GlobalInput from "./GlobalInput";
import GlobalModal from "./GlobalModal";
import GlobalBtn from "./GlobalBtn";
import { Box, Stack } from "@mui/material";
import { FormGroup } from "./Utilities";
import { DataGrid } from "@mui/x-data-grid";

const GlobalSelectTableModal = ({
  isOpen,
  closeModal,
  initData = [],
  selectedData,
  isLoading,
  action,
  heading,
  columns,
}) => {
  const [searchStr, setSearchStr] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleClick = () => {
    action(selected);
    closeModal();
  };

  const handleChange = (e) => setSearchStr(e.target.value);

  useEffect(() => {
    if (selectedData) {
      const selection = selectedData.map((data) => data.id);
      setSelected(selectedData);
      setSelectionModel(selection);
    }
  }, [selectedData]);

  const filteredResults = initData?.filter((data) =>
    data.name.replace(/\s/g, "").toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <GlobalModal
      closeModal={closeModal}
      isOpen={isOpen}
      width="600px"
      overflowY={"hidden"}
    >
      <Stack height={"100%"}>
        <GlobalBallBeat loading={isLoading} />
        <div className="position-relative">
          <AltModalHeader heading={heading} closeModal={closeModal} mb="0" />

          <FormGroup columns="2">
            <div></div>
            <GlobalInput
              inputType="search"
              inputPlaceholder="Search..."
              inputValue={searchStr}
              handleChange={handleChange}
            />
          </FormGroup>
        </div>

        <Box width={"100%"} height="220px">
          <DataGrid
            rows={filteredResults}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            checkboxSelection
            onRowSelectionModelChange={(newSelectionModel) => {
              const selected = initData?.filter((data) =>
                newSelectionModel.includes(data.id)
              );
              setSelectionModel(newSelectionModel);
              setSelected(selected);
            }}
            rowSelectionModel={selectionModel}
          />
        </Box>

        <GlobalBtn mx="auto" className="mb-0 mt-4" onClick={handleClick}>
          Add
        </GlobalBtn>
      </Stack>
    </GlobalModal>
  );
};

export default GlobalSelectTableModal;
