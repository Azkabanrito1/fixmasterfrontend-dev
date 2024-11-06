import { useFormik } from "formik";
import { warrantyTypes } from "../../../utils/selectOptions";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import AddCategoriesModal from "../modals/AddCategoriesModal";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { useState } from "react";
import { createWarrantySchema } from "../../../Validations/createWarrantyValidation";
import { useEffect } from "react";

const NewWarrantyForm = ({ createWarranty, isLoading }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCatListModal, setShowCatListModal] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const openCategoriesList = () => setShowCatListModal(true);
  const closeCategoriesList = () => setShowCatListModal(false);
  const selectedCatNames = selectedCategories.map((cat) => cat.name);

  const onSubmit = () => {
    if (selectedCategories.length === 0) {
      setError({
        isError: true,
        message: "No categories selected",
      });
      return;
    }

    const categoryIDs = selectedCategories.map((cat) => cat.id);

    const payload = {
      warrantyType: values.warrantyType,
      warrantyName: values.warrantyName,
      fixCategoryIds: categoryIDs,
      maxNoOfDays: values.maxNoOfDays,
      maxNoOfClaims: values.maxNoOfClaims,
      warrantyFee: values.warrantyFee,
    };

    createWarranty(payload);
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      warrantyType: "",
      warrantyName: "",
      maxNoOfDays: 0,
      maxNoOfClaims: 0,
      warrantyFee: 0,
    },
    onSubmit,
    validationSchema: createWarrantySchema,
  });

  // useEffect(() => {
  //   if (values.warrantyType.toLocaleLowerCase() === "standard warranty") {
  //     setFieldValue("warrantyFee", 0);
  //   }
  // }, [values.warrantyType]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="3">
            <GlobalInput
              labelText="Warranty Name"
              inputName="warrantyName"
              inputValue={values.warrantyName}
              inputPlaceholder="e.g. Standard Plumbing Warranty"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.warrantyName && touched.warrantyName}
              errorMessage={errors.warrantyName}
              required
            />
            <GlobalSelect
              labelText={"Warranty Type"}
              options={warrantyTypes}
              selectName={"warrantyType"}
              selectValue={values.warrantyType}
              valueType={"string"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a warranty type"}
              error={errors.warrantyType && touched.warrantyType}
              errorMessage={errors.warrantyType}
              required
            />
            <GlobalInput
              labelText="Maximum No of Days"
              inputName="maxNoOfDays"
              inputValue={values.maxNoOfDays}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.maxNoOfDays && touched.maxNoOfDays}
              errorMessage={errors.maxNoOfDays}
              min={0}
              required
            />
            <GlobalInput
              labelText="Maximum No of Claims"
              inputName="maxNoOfClaims"
              inputValue={values.maxNoOfClaims}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.maxNoOfClaims && touched.maxNoOfClaims}
              errorMessage={errors.maxNoOfClaims}
              min={0}
              required
            />
            <GlobalInput
              labelText="Warranty Fee"
              inputName="warrantyFee"
              inputValue={values.warrantyFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.warrantyFee && touched.warrantyFee}
              errorMessage={errors.warrantyFee}
              min={0}
              // disabled={
              //   values.warrantyType.toLowerCase() === "standard warranty"
              // }
              required
            />
          </FormGroup>

          <FormGroup columns="3" className="mb-4">
            <AddBtn
              action={openCategoriesList}
              className="justify-content-start"
              text={"Add Categories"}
              orientation="inline"
            />

            <GlobalTextArea
              fullWidth={true}
              labelText="Added Categories"
              inputValue={selectedCatNames.join(", ")}
              error={error.isError}
              errorMessage={error.message}
              readOnly
            />
          </FormGroup>
        </Fields>

        <GlobalBtn
          type="submit"
          mx="auto"
          px="2rem"
          width="max-content"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Warranty"}
        </GlobalBtn>
      </form>

      {showCatListModal && (
        <AddCategoriesModal
          isOpen={showCatListModal}
          closeModal={closeCategoriesList}
          selectedCategories={selectedCategories}
          addToSelectedCategories={setSelectedCategories}
        />
      )}
    </>
  );
};

export default NewWarrantyForm;
