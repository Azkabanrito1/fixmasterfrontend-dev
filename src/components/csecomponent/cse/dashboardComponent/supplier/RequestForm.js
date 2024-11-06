import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import { Fields, FormGroup } from "../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { requestSupplySchema } from "../../../../../Validations/SupplyRequestValidation";
import { getToday } from "../../../../../utils/dateRanges";
import { useRequestSupplies } from "../../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import GlobalFileInput from "../../../../globalcomponents/GlobalFileInput";
import GlobalTextArea from "../../../../globalcomponents/GlobalTextArea";
import { useState } from "react";

const RequestForm = ({ isOpen, closeModal, equipment, units, fixId }) => {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const removeFile = (fileIndex) => {
    const newFiles = files.filter((_, index) => fileIndex !== index);

    setFiles(newFiles);
  };

  //---------------------------------mutate fn-------------------------------
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
  const { mutate: requestSupplies } = useRequestSupplies(onSuccess, onFailure);
  const today = getToday();

  const onSubmit = async (values) => {
    const suppliesPayload = new FormData();

    suppliesPayload.append("Files", files);
    suppliesPayload.append("CategoryId", values.equipment);
    suppliesPayload.append("ManufacturerName", values.manufacturer);
    suppliesPayload.append("ModelNumber", values.modelNumber);
    suppliesPayload.append("ModelYear", values.modelYear);
    suppliesPayload.append("PartNumber", values.partNumber);
    suppliesPayload.append("Color", values.color);
    suppliesPayload.append("FixId", fixId);
    suppliesPayload.append("Quantity", values.size);
    suppliesPayload.append("UnitMeasurementId", values.measurement);
    suppliesPayload.append("Description", values.productDescription);
    suppliesPayload.append("RequestedDate", values.date);
    suppliesPayload.append("RequestedTime", values.time);
    suppliesPayload.append("Name", values.productName);
    for (let i = 0; i < files.length; i++) {
      suppliesPayload.append("Files", files[i]);
    }
    requestSupplies(suppliesPayload);
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        equipment: "",
        productName: "",
        manufacturer: "",
        modelNumber: "",
        modelYear: "",
        color: "",
        partNumber: "",
        size: "",
        measurement: "",
        unitProduct: "",
        productDescription: "",
        date: "",
        time: "",
        uploads: [],
      },
      validationSchema: requestSupplySchema,
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Request Supplies" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalSelect
              selectName="equipment"
              labelText="Equipment"
              defaultOption={"Choose equipment for supply"}
              labelColor="var(--clr-primary)"
              options={equipment}
              selectValue={values.equipment}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.equipment}
              error={errors.equipment && touched.equipment}
              required
            />

            <GlobalInput
              inputName="productName"
              labelText="Products Name"
              inputPlaceholder="Products Name"
              labelColor="var(--clr-primary)"
              inputType="text "
              inputValue={values.productName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.productName}
              error={errors.productName && touched.productName}
              required
            />
            <GlobalInput
              inputName="manufacturer"
              labelText="Manufacturer's Name"
              inputPlaceholder="Manufacturer's Name"
              labelColor="var(--clr-primary)"
              inputType="text"
              inputValue={values.manufacturer}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.manufacturer}
              error={errors.manufacturer && touched.manufacturer}
            />
            <GlobalInput
              inputName="modelNumber"
              labelText="Model Number"
              inputPlaceholder="Model Number"
              labelColor="var(--clr-primary)"
              inputType="tel"
              inputValue={values.modelNumber}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.modelNumber}
              error={errors.modelNumber && touched.modelNumber}
            />
            <GlobalInput
              inputName="modelYear"
              labelText="Model Year"
              inputPlaceholder="Model Year"
              labelColor="var(--clr-primary)"
              inputType="number"
              inputValue={values.modelYear}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.modelYear}
              error={errors.modelYear && touched.modelYear}
            />
            <GlobalInput
              inputName="color"
              labelText="Color"
              inputPlaceholder="Color of product"
              labelColor="var(--clr-primary)"
              inputType="text"
              inputValue={values.color}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.color}
              error={errors.color && touched.color}
            />

            <GlobalInput
              inputName="partNumber"
              labelText="Part Number"
              inputPlaceholder="Part Number"
              labelColor="var(--clr-primary)"
              inputType="number"
              inputValue={values.partNumber}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.partNumber}
              error={errors.partNumber && touched.partNumber}
            />
            <GlobalInput
              inputType={"number"}
              inputName="size"
              labelText="Quantity"
              inputPlaceholder="Quantity/Size of product"
              labelColor="var(--clr-primary)"
              inputValue={values.size}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.size}
              error={errors.size && touched.size}
              min={0}
              required
            />
            <GlobalSelect
              labelText=" Unit of Measurement"
              labelColor="var(--clr-primary)"
              selectName="measurement"
              options={units}
              defaultOption="Select Unit of Measurement"
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.measurement}
              error={errors.measurement && touched.measurement}
              required
            />

            <GlobalInput
              inputType="date"
              inputName="date"
              inputValue={values.date}
              labelText="Date"
              handleChange={handleChange}
              min={today}
              errorMessage={errors.date}
              error={errors.date && touched.date}
              labelColor="var(--clr-primary)"
              required
            />
            <GlobalInput
              inputType="time"
              inputName="time"
              inputValue={values.time}
              labelText="Time"
              handleChange={handleChange}
              errorMessage={errors.time}
              error={errors.time && touched.time}
              labelColor="var(--clr-primary)"
              required
            />
          </FormGroup>
        </Fields>

        <Fields>
          <FormGroup columns="1">
            <GlobalTextArea
              labelText="Products Description"
              labelColor="var(--clr-primary)"
              inputName="productDescription"
              inputValue={values.productDescription}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.productDescription}
              error={errors.productDescription && touched.productDescription}
            />
          </FormGroup>
        </Fields>
        <Fields>
          <FormGroup columns="1">
            <GlobalFileInput
              label={"Attachments"}
              inputName="uploads"
              maxFiles={4}
              handleChange={setFiles}
              fileState={files}
              accept={{
                "image/*": [".jpeg", ".png"],
                "video/*": [".mp4", ".wmv"],
              }}
              removeFile={removeFile}
            />
          </FormGroup>
        </Fields>
        <GlobalBtn style={{ margin: "auto" }} type="submit">
          Send Request
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default RequestForm;
