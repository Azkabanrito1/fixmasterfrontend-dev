import { useState } from "react";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useAddCategoryToPlan } from "../../../hooks/useQueries/useAdmin";
import AddCategoriesModal from "../modals/AddCategoriesModal";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const FixCategoriesSection = ({ fixCategories, isLoading, subId }) => {
  const [showAddFixCategoryModal, setShowAddFixCategoryModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onAddSuccess = () => {
    setShowAddFixCategoryModal(false);
    enqueueSnackbar("Job category added successfully", { variant: "success" });
  };
  const onAddFailure = (error) => {
    enqueueSnackbar(error.message || error, { variant: "error" });
  };
  const { mutate: addCategories, isLoading: isSubmitting } =
    useAddCategoryToPlan(subId, onAddSuccess, onAddFailure);

  const addToCategories = (categories) => {
    const selectedIDs = categories.map((category) => category.id);

    const payload = { subscriptionId: subId, fixCategoryId: selectedIDs };
    addCategories(payload);
  };

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_value, MUIDataTableMeta) =>
          MUIDataTableMeta.rowIndex + 1,
      },
    },
    { name: "longName", label: "Long Name" },
    { name: "shortName", label: "Short Name" },
  ];

  const CustomToolBar = () => (
    <GlobalBtn
      width="max-content"
      px="1rem"
      py="0.7rem"
      display="inline-block"
      onClick={() => setShowAddFixCategoryModal(true)}
    >
      Add Job Categories
    </GlobalBtn>
  );

  return (
    <div className="mb-4">
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          title="Job Categories"
          columns={columns}
          data={fixCategories}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            pagination: false,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
            customToolbar: () => <CustomToolBar />,
          }}
        />
      )}

      {showAddFixCategoryModal && (
        <AddCategoriesModal
          selectedCategories={fixCategories}
          addToSelectedCategories={addToCategories}
          isOpen={showAddFixCategoryModal}
          isSubmitting={isSubmitting}
          closeModal={() => setShowAddFixCategoryModal(false)}
        />
      )}
    </div>
  );
};

export default FixCategoriesSection;
