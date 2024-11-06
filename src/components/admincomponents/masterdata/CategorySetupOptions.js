import React, { useEffect } from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import GlobalSearchDropdown from "../../globalcomponents/GlobalSearchDropdown";
import {
  useGetCategoryDetailsById,
  useGetFixCategoryByName,
} from "../../../hooks/useQueries/useAdmin";

const CategorySetupOptions = ({
  isOpen,
  closeModal,
  heading,
  itemDescription,
  itemNamePlaceholder,
  itemDescriptionPlaceholder,
  submit,
  loading,
  actionText,
  activeCat,
  cat,
  subCategory,
  subCat,
  subSub,
}) => {
  const onSubmit = async () => {
    console.log(subSub);
    const payload = {
      name: values.name,
      description: values.description,
      parentId: values.isRoot
        ? selectedCategory[0].id
        : subCat
        ? subCat.id
        : subSub
        ? subSub?.parentId
        : 0,
      labourMarkup: +values.markUpLabour,
      materialsMarkUp: +values.markUpMaterial,
      labourVat: +values.vatLabour,
      materialsVat: +values.vatMaterial,
      standardWarranty: +values.warrantyStandard,
      extended1Warranty: +values.warrantyExtendedOne,
      extended2Warranty: +values.warrantyExtendedTwo,
      standardWarrantyRate: +values.rateStandard,
      extended1WarrantyRate: +values.rateExtendedOne,
      extended2WarrantyRate: +values.rateExtendedTwo,
      diagnosticFirstHr: +values.labourFirst,
      diagnosticSecondHr: +values.labourSecond,
      diagnosticSubsequentHr: +values.labourSubsequent,
      dailyRate: +values.dailyRate,
      halfDayRate: +values.halfAndHourRate,
      hourlyRate: +values.hourlyRate,
      bookingFee: +values.bookingFee,
      ...(activeCat?.id && { id: activeCat.id }),
    };
    await submit(payload);
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        markUpLabour: "",
        markUpMaterial: "",
        warrantyStandard: "",
        warrantyExtendedOne: "",
        warrantyExtendedTwo: "",
        rateStandard: "",
        rateExtendedOne: "",
        rateExtendedTwo: "",
        vatLabour: "",
        vatMaterial: "",
        labourFirst: "",
        labourSecond: "",
        labourSubsequent: "",
        dailyRate: "",
        halfAndHourRate: "",
        hourlyRate: "",
        WithHoldingTax: "",
        bookingFee: "",
        isRoot: false,
        selectedOption: "",
      },
      onSubmit,
    });

  //----------------------------------------------------------------data fetching-----------------------------------------------------
  const { data: categoryDataByName } = useGetFixCategoryByName();

  const formikHandlers = { values, handleBlur, handleChange, setFieldValue };

  const labelHandlers = values.isRoot ? "Subcategory Name" : "Category Name";

  const modalHeading = values.isRoot
    ? `${heading} Subcategory`
    : subCat
    ? `${heading} Subcategory`
    : `${heading} Category`;

  //----------------------------------------------------------------dependent query----------------------------------------------------------------
  const selectedCategory = categoryDataByName?.data?.filter((cat) =>
    values.selectedOption?.includes(cat.name)
  );

  const { data: categoryDetailsData } = useGetCategoryDetailsById(
    activeCat?.id || selectedCategory?.[0]?.id,
    {
      enabled: !!(activeCat?.id || selectedCategory?.[0]?.id),
    }
  );

  useEffect(() => {
    if (categoryDetailsData?.data) {
      if (!values.selectedOption && !subCat?.name) {
        setFieldValue("name", categoryDetailsData?.data?.name);
      }
      if (!values.selectedOption && !subCat?.description) {
        setFieldValue("description", categoryDetailsData?.data?.description);
      }
      setFieldValue(
        "markUpLabour",
        categoryDetailsData?.data?.labourMarkup || activeCat?.markUpLabour
      );
      setFieldValue(
        "markUpMaterial",
        categoryDetailsData?.data?.materialsMarkup || activeCat?.markUpMaterial
      );
      setFieldValue(
        "warrantyStandard",
        categoryDetailsData?.data?.standardWarranty
      );
      setFieldValue(
        "warrantyExtendedOne",
        categoryDetailsData?.data?.extended1Warranty
      );
      setFieldValue(
        "warrantyExtendedTwo",
        categoryDetailsData?.data?.extended2Warranty
      );
      setFieldValue(
        "rateStandard",
        categoryDetailsData?.data?.standardWarrantyRate
      );
      setFieldValue(
        "rateExtendedOne",
        categoryDetailsData?.data?.extended1WarrantyRate
      );
      setFieldValue(
        "rateExtendedTwo",
        categoryDetailsData?.data?.extended2WarrantyRate
      );
      setFieldValue("vatLabour", categoryDetailsData?.data?.labourVat);
      setFieldValue("vatMaterial", categoryDetailsData?.data?.materialsVat);
      setFieldValue(
        "labourFirst",
        categoryDetailsData?.data?.diagnosticFirstHr
      );
      setFieldValue(
        "labourSecond",
        categoryDetailsData?.data?.diagnosticSecondHr
      );
      setFieldValue(
        "labourSubsequent",
        categoryDetailsData?.data?.diagnosticSubSequentHr
      );
      setFieldValue("dailyRate", categoryDetailsData?.data?.dailyRate);

      setFieldValue("halfAndHourRate", categoryDetailsData?.data?.halfDayRate);
      setFieldValue("hourlyRate", categoryDetailsData?.data?.hourlyRate);
      setFieldValue("WithHoldingTax", categoryDetailsData?.data?.withHoldTax);
      setFieldValue("bookingFee", categoryDetailsData?.data?.bookingFee);
      // setFieldValue("isRoot", categoryDetailsData?.data?.parentId);

      // console.log(categoryDetailsData?.data);
    }
  }, [categoryDetailsData?.data, setFieldValue, activeCat]);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={modalHeading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        {cat && (
          <Fields>
            <FormGroup columns="2">
              <FormControlLabel
                control={
                  <Checkbox
                    name="isRoot"
                    value={values.isRoot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.isRoot === true}
                    sx={{
                      color: "default",
                      "&.Mui-checked": {
                        color: "#f26222",
                      },
                    }}
                  />
                }
                label="Add Subcategory"
              />
              {values.isRoot && (
                <GlobalSearchDropdown
                  formikHandlers={formikHandlers}
                  data={categoryDataByName?.data}
                  required
                  selectName="Parent Category"
                />
              )}
            </FormGroup>
          </Fields>
        )}

        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              name="name"
              inputValue={values.name}
              handleChange={handleChange}
              labelText={labelHandlers}
              inputPlaceholder={itemNamePlaceholder}
              required
            />
            <GlobalInput
              labelText={itemDescription}
              inputPlaceholder={`${itemDescriptionPlaceholder} ${
                labelHandlers.split(" ")[0]
              }`}
              name="description"
              inputValue={values.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Mark Up</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Labour %"
              inputPlaceholder="Enter Labour Markup"
              name="markUpLabour"
              inputValue={values.markUpLabour}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Materials %"
              inputPlaceholder="Enter Material Markup"
              name="markUpMaterial"
              inputValue={values.markUpMaterial}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Warranty</GroupHeading>
          <div className="description">Duration</div>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Standard Days"
              inputPlaceholder="Stardand warranty in Days"
              name="warrantyStandard"
              inputValue={values.warrantyStandard}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Extended 1 Days"
              inputPlaceholder="Extended 1 Days"
              name="warrantyExtendedOne"
              inputValue={values.warrantyExtendedOne}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Extended 2 Days"
              inputPlaceholder="Extended 2 Days"
              name="warrantyExtendedTwo"
              inputValue={values.warrantyExtendedTwo}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
          </FormGroup>

          <div className="description mt-4">Rate</div>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Standard Rate %"
              inputPlaceholder="Enter stardand Rate (%)"
              name="rateStandard"
              inputValue={values.rateStandard}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Extended 1 Rate %"
              inputPlaceholder="Enter extended Rate (%)"
              name="rateExtendedOne"
              inputValue={values.rateExtendedOne}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Extended 2 Rate %"
              inputPlaceholder="Enter extended 2 Rate (%)"
              name="rateExtendedTwo"
              inputValue={values.rateExtendedTwo}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
            />
          </FormGroup>
        </Fields>
        <Fields>
          <GroupHeading>VAT</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Labour %"
              inputPlaceholder="Enter Labour VAT"
              name="vatLabour"
              inputValue={values.vatLabour}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
              inputType="number"
            />
            <GlobalInput
              labelText="Materials %"
              inputPlaceholder="Enter  Material VAT"
              name="vatMaterial"
              inputValue={values.vatMaterial}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
              inputType="number"
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Labour Rates</GroupHeading>
          <div className="description">Diagnostic</div>
          <FormGroup columns="2">
            <GlobalInput
              labelText="1ˢᵗ Hour "
              inputPlaceholder="Enter 1ˢᵗ Hour"
              name="labourFirst"
              inputValue={values.labourFirst}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="2ⁿᵈ Hour"
              inputPlaceholder="Enter 2ⁿᵈ Hour"
              name="labourSecond"
              inputValue={values.labourSecond}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Subsequent Hours"
              inputPlaceholder="Enter Subsequent Hours"
              name="labourSubsequent"
              inputValue={values.labourSubsequent}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
              inputType="number"
            />
          </FormGroup>

          <div className="description mt-4">General</div>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Daily Rate"
              inputPlaceholder="Enter daily rate"
              name="dailyRate"
              inputValue={values.dailyRate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Half Day Rate"
              inputPlaceholder="Enter half day rate"
              name="halfAndHourRate"
              inputValue={values.halfAndHourRate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Hourly Rate"
              inputPlaceholder="Enter hourly rate"
              name="hourlyRate"
              inputValue={values.hourlyRate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
          </FormGroup>
        </Fields>
        {!values.isRoot && cat && (
          <Fields>
            <FormGroup columns="2">
              <GlobalInput
                labelText="Booking Fee"
                inputPlaceholder="Enter booking fee"
                name="bookingFee"
                inputValue={values.bookingFee}
                handleChange={handleChange}
                handleBlur={handleBlur}
                inputType="number"
                required
              />
            </FormGroup>
          </Fields>
        )}
        <GlobalBtn type="submit" className="m-auto mt-3">
          {loading ? "Loading..." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default CategorySetupOptions;
