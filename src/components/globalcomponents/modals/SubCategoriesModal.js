import GlobalSelectTableModal from "../GlobalSelectionTableModal";

const SubCategoriesModal = ({
  selectedCategories,
  subCategoriesData,
  addToCategories,
  isLoading,
  closeModal,
  isOpen,
}) => {
  const subCategories =
    subCategoriesData?.data?.map((sub, index) => ({
      id: sub.id,
      index: index + 1,
      name: sub.name,
    })) || [];

  const columns = [
    { field: "index", headerName: "S/N", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
  ];

  return (
    <GlobalSelectTableModal
      isOpen={isOpen}
      closeModal={closeModal}
      initData={subCategories}
      isLoading={isLoading}
      selectedData={selectedCategories}
      action={addToCategories}
      columns={columns}
      heading="Add Sub Categories"
    />
  );
};

export default SubCategoriesModal;
