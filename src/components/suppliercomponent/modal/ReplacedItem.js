import React from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { useEffect } from "react";
import { useGetAllWarranty } from "../../../hooks/useQueries/useAdmin";
import { useState } from "react";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { replacedItemSchema } from "../../../Validations/replaceItemValidation";
import { getToday } from "../../../utils/dateRanges";

const ReplacedItem = ({ isOpen, closeModal, data }) => {
  const [warranties, setWarranties] = useState([]);

  // data fetching
  const { data: warrantyData } = useGetAllWarranty();

  useEffect(() => {
    if (warrantyData) {
      const warranty = warrantyData?.warranties.map((warranty) => {
        return {
          name: `${warranty.warrantyType} ${warranty.maxNoOfDays} days`,
          id: warranty.warrantyId,
        };
      });
      setWarranties(warranty);
    }
  }, [warrantyData]);

  const onSubmit = async (values) => {
    const payload = {
      cost: values.cost,
      expectedDate: values.expectedDate,
      information: values.information,
      deliveryFee: values.deliveryFee,
      deliveryTime: values.deliveryTime,
      warranty: values.warranty,
    };

    console.log(payload);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      product: "",
      category: "",
      quantity: "",
      time: "",
      expectedDate: "",
      cost: "",
      information: "",
      deliveryFee: "",
      deliveryTime: "",
      warranty: "",
    },
    validationSchema: replacedItemSchema,
    onSubmit,
  });

  const today = getToday();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Replace Item" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Product Name"
              inputName="product"
              inputType="text"
              inputPlaceholder="Product Name"
              inputValue={values.product}
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={true}
            />
            <GlobalInput
              labelText="Category"
              inputName="category"
              inputType="text"
              inputPlaceholder="category"
              inputValue={values.category}
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={true}
            />
            <GlobalInput
              labelText="Re-shapped quantity"
              inputName="quantity"
              inputType="number"
              inputPlaceholder="25"
              inputValue={values.quantity}
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={true}
            />
            <GlobalInput
              labelText="Re-shapped time"
              inputName="time"
              inputType="text"
              inputPlaceholder="12:30pm"
              inputValue={values.time}
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={true}
            />
            <GlobalInput
              labelText="Expected delivery date"
              inputName="expectedDate"
              inputType="date"
              inputPlaceholder="12/12/1999"
              inputValue={values.expectedDate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errorMessage={errors.expectedDate}
              error={errors.expectedDate && touched.expectedDate}
              required
              min={today}
            />
            <GlobalInput
              labelText="Cost"
              inputName="cost"
              inputType="number"
              inputPlaceholder="0.00"
              inputValue={values.cost}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errorMessage={errors.cost}
              error={errors.cost && touched.cost}
              required
            />
            <GlobalInput
              labelText="Delivery Fee"
              inputName="deliveryFee"
              inputType="number"
              inputPlaceholder="0.00"
              inputValue={values.deliveryFee}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errorMessage={errors.deliveryFee}
              error={errors.deliveryFee && touched.deliveryFee}
              required
            />
            <GlobalInput
              labelText="Please specify delivery time"
              inputName="deliveryTime"
              inputType="time"
              inputPlaceholder="12:30pm"
              inputValue={values.deliveryTime}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errorMessage={errors.deliveryTime}
              error={errors.deliveryTime && touched.deliveryTime}
              required
            />
            <GlobalSelect
              labelText="Please specify warranty option"
              selectName="warranty"
              options={warranties}
              defaultOption="Select Warranty"
              selectValue={values.warranty}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.warranty}
              error={errors.warranty && touched.warranty}
            />
          </FormGroup>
        </Fields>
        <Fields>
          <FormGroup columns="1">
            <GlobalTextArea
              labelText="Other information about product"
              inputName="information"
              inputValue={values.information}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errorMessage={errors.information}
              error={errors.information && touched.information}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" className="mt m-auto">
          Submit Order
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default ReplacedItem;
