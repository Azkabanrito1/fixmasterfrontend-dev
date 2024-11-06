import React, { useEffect } from "react";
import AltModalHeader from "../layouts/modal/AltModalHeader";
import GlobalModal from "../globalcomponents/GlobalModal";
import { FormGroup } from "../globalcomponents/Utilities";
import GlobalSelect from "../globalcomponents/GlobalSelect";
import GlobalInput from "../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import GlobalBtn from "../globalcomponents/GlobalBtn";

const AddSubcat = ({
  closeModal,
  isOpen,
  heading,
  category,
  actionText,
  submit,
  isLoading,
  data,
}) => {
  const onSubmit = (values) => {
    const selectedCategory = category.filter((item) =>
      values.category?.includes(item.name)
    );
    const payload = {
      categoryId: selectedCategory[0].id,
      name: values.subCategory,
    };
    submit(payload);
  };
  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        category: "",
        subCategory: "",
      },
      onSubmit,
    });

  useEffect(() => {
    if (data) {
      setFieldValue("subCategory", data.name);
      const selectedCategory = category?.filter(
        (cat) => cat.name === data.categoryName
      );
      setFieldValue("category", selectedCategory[0]?.name);
    }
  }, [data]);
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" mb="20px">
          <GlobalSelect
            selectName="category"
            options={category}
            defaultOption="Select Category"
            selectValue={values.category}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Category"
            required
            valueType="string"
          />

          <GlobalInput
            name="subCategory"
            inputValue={values.subCategory}
            handleChange={handleChange}
            labelText="Sub Category"
            inputType="text"
            required
          />
        </FormGroup>
        <GlobalBtn type="submit" className="m-auto mt-3">
          {isLoading ? "Loading ...." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddSubcat;
