import React from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import {
  useCreateTerritoryCategory,
  useGetTerritoryCategoriesById,
  useUpdateTerritoryCategory,
} from "../../../hooks/useQueries/useAdmin";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const AddTerritoryCategoryModal = ({ activeId, isOpen, closeModal }) => {
  const { data: territoryCatId } = useGetTerritoryCategoriesById(activeId);
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createCategory, isLoading: isCreating } =
    useCreateTerritoryCategory(onSuccess, onError);
  const { mutate: updateCategory, isLoading: isUpdating } =
    useUpdateTerritoryCategory(onSuccess, onError);

  const onSubmit = (values) => {
    if (!activeId) createCategory(values);
    else updateCategory(values);
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      categoryName: "",
      radius: 0,
    },
    onSubmit,
  });

  useEffect(() => {
    if (!!territoryCatId?.data) {
      setFieldValue("categoryName", territoryCatId.data.categoryName);
      setFieldValue("radius", territoryCatId.data.radius);
    }
  }, [territoryCatId?.data]);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={"Add Territory Category"}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" mb="20px">
          <GlobalInput
            name="categoryName"
            inputValue={values.categoryName}
            handleChange={handleChange}
            labelText="Category Name"
            inputPlaceholder="e.g. big category"
            inputType="text"
            required
          />
          <GlobalInput
            name="radius"
            inputValue={values.radius}
            handleChange={handleChange}
            labelText="Territory Radius (meters)"
            min={0}
            inputType="number"
            required
          />
        </FormGroup>
        <GlobalBtn className="m-auto mt-3">
          {isCreating | isUpdating ? "Loading" : "Add Category"}
        </GlobalBtn>
      </form>
      <GlobalFullScreenLoader open={isCreating | isUpdating} />
    </GlobalModal>
  );
};

export default AddTerritoryCategoryModal;
