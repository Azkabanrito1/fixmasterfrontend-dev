import { Stack } from "@mui/material";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import GlobalSelect from "../GlobalSelect";
import GlobalTextArea from "../GlobalTextArea";

import { Fields, FormGroup, GroupHeading } from "../Utilities";
import { FieldError } from "../GlobalInput";
import { useState } from "react";

const SpecializationsFormGroup = ({
  formikHandlers,
  categories,
  openMainSubCategory,
  openOtherSubCategory,
  selectedSubCatNames,
  selectedOtherSubCatNames,
}) => {
  const [clickedMainSubCategory, setClickedMainSubCategory] = useState(false);
  const [clickedOtherSubCategory, setClickedOtherSubCategory] = useState(false);
  const { values, errors, touched, handleBlur, handleChange } = formikHandlers;

  const otherCategories = categories?.filter(
    (cat) => cat.id !== parseInt(values.mainCategory)
  );

  return (
    <Fields>
      <GroupHeading>Candidate’s Area of Specialization</GroupHeading>

      <FormGroup columns="2" className="mt-4">
        <GlobalSelect
          labelText="Area of Specialization"
          selectName="mainCategory"
          selectValue={values.mainCategory}
          options={categories}
          defaultOption="Select Specialization"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.mainCategory}
          error={errors.mainCategory && touched.mainCategory}
          required={true}
        />
      </FormGroup>

      <FormGroup columns="2" className="mt-4">
        <Stack justifyContent={"center"}>
          {clickedMainSubCategory && !values.mainCategory && (
            <FieldError className="text-center">
              Please select a category
            </FieldError>
          )}
          <AddBtn
            justify={"start"}
            mt="1rem"
            action={() => {
              openMainSubCategory();
              setClickedMainSubCategory(true);
            }}
            text="Add Sub-Category"
            orientation="inline"
          />
        </Stack>

        <GlobalTextArea
          labelText={"Selected Sub-Categories"}
          inputValue={selectedSubCatNames?.join(", ")}
          error={errors.mainSubCategories && touched.mainSubCategories}
          errorMessage={errors.mainSubCategories}
          disabled
          readOnly
        />
      </FormGroup>

      <FormGroup columns="2" className="mt-4">
        <GlobalSelect
          labelText="Area of Secondary Specialization (if any)"
          selectName="otherCategory"
          selectValue={values.otherCategory}
          options={otherCategories}
          defaultOption="Select Secondary Specialization"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.otherCategory}
          error={errors.otherCategory && touched.otherCategory}
        />
      </FormGroup>

      <FormGroup columns="2" className="mt-4">
        <Stack justifyContent={"center"}>
          {clickedOtherSubCategory && !values.otherCategory && (
            <FieldError className="text-center">
              Please select another category
            </FieldError>
          )}
          <AddBtn
            justify={"start"}
            mt="1rem"
            className="mx-auto"
            action={() => {
              openOtherSubCategory();
              setClickedOtherSubCategory(true);
            }}
            text="Add Sub-Category"
            orientation="inline"
          />
        </Stack>

        <GlobalTextArea
          labelText={"Selected Sub-Categories"}
          inputValue={selectedOtherSubCatNames?.join(", ")}
          error={errors.otherSubCategories && touched.otherSubCategories}
          errorMessage={errors.otherSubCategories}
          disabled
          readOnly
        />
      </FormGroup>
    </Fields>
  );
};

export default SpecializationsFormGroup;
