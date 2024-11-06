import { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import { upliftValidation } from "../../../Validations/createUpliftValidation";
import SubCategoriesModal from "../../globalcomponents/modals/SubCategoriesModal";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useGetSubCategories } from "../../../hooks/useQueries/useOnboarding";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";

const UpliftForm = ({
  categories,
  createUpdateUplift,
  initialValues,
  isLoading,
  isSubmitting,
  territoryId,
}) => {
  const [showSubCategoriesModal, setShowSubCategoriesModal] = useState(false);

  const onSubmit = (values) => {
    const rates = Object.values(values.amount).map((value) => ({
      amount: parseInt(value.amount),
      serviceId: value.serviceId,
    }));

    const payload = {
      territoryId: parseInt(territoryId),
      rates: rates,
    };

    createUpdateUplift(payload);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      categoryId: "",
      subCategories: [],
      amount: {},
    },
    onSubmit,
    // validationSchema: upliftValidation,
  });

  const { data: subCategoriesData, isLoading: loadingSubCategories } =
    useGetSubCategories(values.categoryId, { enabled: !!values.categoryId });

  const openModal = () => setShowSubCategoriesModal(true);
  const closeModal = () => setShowSubCategoriesModal(false);
  const addToCategories = (data) => setFieldValue("subCategories", data);

  useEffect(() => {
    const catAmount = {};

    values.subCategories.map((sub) => {
      catAmount[sub.name] = {
        amount: 0,
        serviceId: sub.id,
      };
    });

    setFieldValue("amount", catAmount);
  }, [values.subCategories]);

  const handleAmountChange = (e) => {
    setFieldValue("amount", {
      ...values.amount,
      [e.target.name]: {
        ...values.amount[e.target.name],
        amount: e.target.value,
      },
    });
  };

  const serviceRateTemplate = values.subCategories.map((sub) => (
    <Fragment key={sub.id}>
      <GlobalInput readOnly inputValue={sub.name} />
      <GlobalInput
        inputName={sub.name}
        inputType="number"
        inputValue={values.amount[sub.name]?.amount}
        handleChange={handleAmountChange}
        required
      />
    </Fragment>
  ));

  return (
    <>
      {isLoading && <GlobalBallBeat loading={isLoading} />}

      <form onSubmit={handleSubmit}>
        <Fields>
          <GroupHeading>Select Category</GroupHeading>
          <FormGroup columns="2" className="mb-4">
            <GlobalSelect
              options={categories}
              selectName={"categoryId"}
              selectValue={values.categoryId}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a category"}
              error={errors.categoryId && touched.categoryId}
              errorMessage={errors.categoryId}
              required
            />
          </FormGroup>

          {values.subCategories.length > 0 && (
            <>
              <GroupHeading>Setup Rate Uplifts</GroupHeading>
              <FormGroup columns="2">{serviceRateTemplate}</FormGroup>
            </>
          )}

          {values.categoryId && (
            <AddBtn
              orientation="inline"
              action={openModal}
              text="Add Sub-Category"
            />
          )}
        </Fields>

        <GlobalBtn type="submit" mx="auto">
          {isSubmitting ? "Submitting" : "Save"}
        </GlobalBtn>
      </form>

      {showSubCategoriesModal && (
        <SubCategoriesModal
          isOpen={showSubCategoriesModal}
          closeModal={closeModal}
          selectedCategories={values.subCategories}
          subCategoriesData={subCategoriesData}
          addToCategories={addToCategories}
          isLoading={loadingSubCategories}
        />
      )}
    </>
  );
};

export default UpliftForm;
