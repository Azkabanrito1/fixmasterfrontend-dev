import { useFormik } from "formik";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import { FormGroup } from "../../globalcomponents/Utilities";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { useState } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { BallBeat } from "react-pure-loaders";
import { InputGroup } from "react-bootstrap";
import { toBase64 } from "../../../utils/convertToBase64";
import { format } from "date-fns";

const CreatePromoForm = ({
  createUpdatePromo,
  isLoading,
  isSubmitting,
  discounts,
}) => {
  const [banner, setBanner] = useState("");
  const [fileError, setFileError] = useState(false);

  const onSubmit = async () => {
    let bannerContent;
    const bannerFileType = banner.type;

    if (!banner) {
      setFileError(true);
      return;
    }

    bannerContent = await toBase64(banner);

    const payload = {
      discountId: parseInt(values.discountId),
      title: values.title,
      description: values.description,
      startDate: format(new Date(values.startDate), "dd-MM-yyyy"),
      expiryDate: format(new Date(values.expiryDate), "dd-MM-yyyy"),
      bannerPage: values.bannerPage,
      bannerContent,
      bannerFileType,
    };

    // console.log(payload);
    createUpdatePromo(payload);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      discountId: "",
      title: "",
      description: "",
      startDate: "",
      expiryDate: "",
      bannerPage: "",
    },
    onSubmit,
  });

  const handleImageChange = (e) => {
    setFileError("");
    setBanner(e.target.files[0]);
  };

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <BallBeat loading={isLoading} color="var(--clr-primary)" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <FormGroup columns="3" className="mb-4">
          <GlobalInput
            labelText="Promotion Title"
            inputName="title"
            inputValue={values.title}
            inputPlaceholder="e.g. Ileya Festival"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.title && touched.title}
            errorMessage={errors.title}
            required
          />

          <GlobalInput
            labelText="Promotion Description"
            inputName="description"
            inputValue={values.description}
            inputPlaceholder="e.g. Buy one, get one free"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.description && touched.description}
            errorMessage={errors.description}
            required
          />

          <GlobalSelect
            labelText={"Discount"}
            options={discounts || []}
            selectName={"discountId"}
            selectValue={values.discountId}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption={"Select discount to apply"}
            error={errors.discountId && touched.discountId}
            errorMessage={errors.discountId}
          />

          <GlobalInput
            labelText="Start Date"
            inputName="startDate"
            inputType="date"
            inputValue={values.startDate}
            inputPlaceholder="e.g. Loyalty Limit Discount"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.startDate && touched.startDate}
            errorMessage={errors.startDate}
            required
          />

          <GlobalInput
            labelText="Expirity Date"
            inputName="expiryDate"
            inputType="date"
            inputValue={values.expiryDate}
            inputPlaceholder="e.g. Loyalty Limit Discount"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.expiryDate && touched.expiryDate}
            errorMessage={errors.expiryDate}
            required
          />

          <InputGroup>
            <label htmlFor="banner">Banner Image</label>
            <input
              type="file"
              name="banner"
              id="banner"
              value={values.banner}
              onChange={handleImageChange}
              accept={"image/*"}
            />
            {fileError && <FieldError>"Please upload banner image"</FieldError>}
          </InputGroup>

          <GlobalTextArea
            descriptionText="Please enter the pages you want the promotion to be displayed separated by commas"
            fullWidth={true}
            labelText="Display Pages"
            inputName="bannerPage"
            inputValue={values.bannerPage}
            inputPlaceholder="e.g. Landing Page, Customer Dashboard"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.bannerPage && touched.bannerPage}
            errorMessage={errors.bannerPage}
            required
          />
        </FormGroup>

        <GlobalBtn disabled={isSubmitting} mx="auto" type="submit">
          {isSubmitting ? "Submitting" : "Submit"}
        </GlobalBtn>
      </form>
    </>
  );
};

export default CreatePromoForm;
