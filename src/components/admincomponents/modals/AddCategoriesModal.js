import { BallBeat } from "react-pure-loaders";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { DataGrid } from "@mui/x-data-grid";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useEffect, useState } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { FormGroup } from "../../globalcomponents/Utilities";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useGetFixCategories } from "../../../hooks/useQueries/useJobs";

const AddCategoriesModal = ({
  selectedCategories,
  addToSelectedCategories,
  closeModal,
  isOpen,
  isSubmitting,
}) => {
  const [searchStr, setSearchStr] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [selected, setSelected] = useState([]);

  const { data: categoriesData, isLoading } = useGetFixCategories();

  const categories =
    categoriesData?.data?.map((categories, index) => ({
      id: categories.id,
      index: index + 1,
      name: categories.name,
    })) || [];

  const handleClick = () => {
    addToSelectedCategories(selected);
    closeModal();
  };
  const handleChange = (e) => setSearchStr(e.target.value);

  let filteredResults = categories?.filter((aud) =>
    aud?.name?.toLowerCase().includes(searchStr.toLowerCase())
  );

  const columns = [
    { field: "index", headerName: "S/N", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
  ];

  useEffect(() => {
    if (selectedCategories) {
      const selection = selectedCategories.map((aud) => aud.id);
      setSelected(selectedCategories);
      setSelectionModel(selection);
    }
  }, [selectedCategories]);

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader heading="Select Categories" closeModal={closeModal} />

      <FormGroup className="mb-4" columns="2">
        <div></div>
        <GlobalInput
          inputType="search"
          inputPlaceholder="Search..."
          inputValue={searchStr}
          handleChange={handleChange}
        />
      </FormGroup>

      <GlobalBallBeat loading={isLoading} />

      <div style={{ height: 250, width: "100%" }}>
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
            const selected = categories?.filter((aud) =>
              newSelectionModel.includes(aud.id)
            );
            setSelectionModel(newSelectionModel);
            setSelected(selected);
          }}
          rowSelectionModel={selectionModel}
        />
      </div>

      <GlobalBtn
        mx="auto"
        className="mb-0 mt-4"
        onClick={handleClick}
        disabled={isSubmitting}
      >
        Add
      </GlobalBtn>
    </GlobalModal>
  );
};

export default AddCategoriesModal;
