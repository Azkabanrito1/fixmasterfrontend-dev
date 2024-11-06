import { useFormik } from "formik";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import {
  useCreateQuotation,
  useGetMeasurementUnits,
} from "../../../../hooks/useQueries/useJobs";
import { useEffect, useState } from "react";
import { getToday } from "../../../../utils/dateRanges";
import { useGetAllWarranty } from "../../../../hooks/useQueries/useAdmin";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import moment from "moment";
import { requestQuotationSchema } from "../../../../Validations/quotationValidation";
import { useSnackbar } from "notistack";

const QuotationModal = ({ isOpen, closeModal, request, activeSupplyId }) => {
  const [units, setUnits] = useState([]);
  const [warranties, setWarranties] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  //--------------------------------------------------data fetching------------------------------------------------
  const { data: measurementUnitData } = useGetMeasurementUnits();
  const { data: warrantyData } = useGetAllWarranty();
  // console.log(warrantyData);
  //---------------------------------------------mutate fn---------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: submitQuotation } = useCreateQuotation(onSuccess, onFailure);

  useEffect(() => {
    if (measurementUnitData) {
      const unit = measurementUnitData?.data.map((unit) => {
        return {
          name: unit.abbr,
          id: unit.id,
        };
      });
      setUnits(unit);
    }
  }, [measurementUnitData]);

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

  useEffect(() => {
    if (request) {
      setFieldValue("productName", request?.[0]?.name);
      setFieldValue("category", request?.[0]?.category);
      setFieldValue("manufacturerName", request?.[0]?.name);
      setFieldValue("modelYear", moment(request?.[0]?.modelYear).format("L"));
    }
  }, [request]);

  const onSubmit = (values) => {
    const payload = {
      unitPrice: values.cost,
      deliveryFee: values.delivery,
      deliveryTime: values.time,
      deliveryDate: values.date,
      warrantyDays: Number(values.warranty),
      requestId: activeSupplyId,
      quantity: Number(values.measurement),
    };

    submitQuotation(payload);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      productName: "",
      category: "",
      manufacturerName: "",
      cost: "",
      modelYear: "",
      measurement: "",
      delivery: "",
      date: "",
      time: "",
      warranty: "",
    },
    validationSchema: requestQuotationSchema,
    onSubmit,
  });

  const today = getToday();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Quotes" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            {/* <GlobalInput
              inputType="text"
              inputName="productName"
              inputValue={values.productName}
              labelText="Product Name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={+true}
              labelColor="var(--clr-primary)"
            />
            <GlobalInput
              inputType="text"
              inputName="category"
              inputValue={values.category}
              labelText="Category"
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={+true}
              labelColor="var(--clr-primary)"
            />

            <GlobalInput
              inputType="text"
              inputName="manufacturerName"
              inputValue={values.manufacturerName}
              labelText="Product Name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={+true}
              labelColor="var(--clr-primary)"
            />
            <GlobalInput
              inputType="text"
              inputName="modelYear"
              inputValue={values.modelYear}
              labelText="Model Year"
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={+true}
              labelColor="var(--clr-primary)"
            /> */}
            <GlobalInput
              labelText=" Quantity"
              labelColor="var(--clr-primary)"
              handleBlur={handleBlur}
              inputType="number"
              inputName={"measurement"}
              inputValue={values.measurement}
              handleChange={handleChange}
              errorMessage={errors.measurement}
              error={errors.measurement && touched.measurement}
              required
            />

            <GlobalInput
              inputName="cost"
              labelText="Cost"
              inputPlaceholder="0.000"
              labelColor="var(--clr-primary)"
              inputType="number"
              inputValue={values.cost}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.cost}
              error={errors.cost && touched.cost}
              required
            />

            <GlobalInput
              inputName="delivery"
              labelText="Delivery Fee"
              inputPlaceholder="0.000"
              labelColor="var(--clr-primary)"
              inputType="number"
              inputValue={values.delivery}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.delivery}
              error={errors.delivery && touched.delivery}
              required
            />

            <GlobalInput
              inputType="date"
              inputName="date"
              inputValue={values.date}
              labelText="Please specify delivery date"
              handleChange={handleChange}
              labelColor="var(--clr-primary)"
              min={today}
              errorMessage={errors.date}
              error={errors.date && touched.date}
              required
            />

            <GlobalInput
              inputType="time"
              inputName="time"
              inputValue={values.time}
              labelText="Please specify delivery time"
              labelColor="var(--clr-primary)"
              handleChange={handleChange}
              errorMessage={errors.time}
              error={errors.time && touched.time}
              required
            />

            <GlobalSelect
              labelText="Please specify warranty option"
              labelColor="var(--clr-primary)"
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
        <GlobalBtn
          type="submit"
          className="mt-3 m-auto"
          disabled={!values.warranty}
        >
          Submit Quote
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default QuotationModal;
