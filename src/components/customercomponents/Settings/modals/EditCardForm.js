import React from "react";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import { CardSchema } from "../../../../Validations/customerCardValidation";
import { useSnackbar } from "notistack";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { formatCardNumber } from "../../../../utils/utilityFxns";
import { useUpdateCard } from "../../../../hooks/useQueries/useIdentity";
import { useEffect } from "react";

function EditCardForm({ open, close, cardDetails }) {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: updateCard } = useUpdateCard(onSuccess, onError);

  const onSubmit = async (values) => {
    const payload = {
      cardId: cardDetails.cardId,
      firstName: values.firstName,
      lastName: values.lastName,
      cardNumber: values.cardNumber.replaceAll(" ", "-"),
      expiryMonth: values.expiryMonth.toString(),
      expiryYear: values.expiryYear.toString(),
      billingAddress: values.billingAddress,
      isDefault: cardDetails.isDefault,
      cvv: values.cvv,
    };
    updateCard(payload);
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      billingAddress: "",
      cvv: "",
    },
    validationSchema: CardSchema,
    onSubmit,
  });

  useEffect(() => {
    if (cardDetails.cardId) {
      setFieldValue("firstName", cardDetails.name.split(" ")[0]);
      setFieldValue("lastName", cardDetails.name.split(" ")[1]);
      setFieldValue("expiryMonth", cardDetails.expiredDate.split("/")[0]);
      setFieldValue("expiryYear", cardDetails.expiredDate.split("/")[1]);
      setFieldValue("billingAddress", cardDetails.billingAddress);
    }
  }, [cardDetails]);

  const minCardYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let minMonth = 1;

    if (+values.expiryYear === year % 1000) {
      minMonth = month;
    }
    return { minYear: year % 1000, minMonth };
  };

  return (
    <GlobalModal width="500px" isOpen={open} closeModal={close}>
      <form onSubmit={handleSubmit}>
        <AltModalHeader heading={"Edit Card"} closeModal={close} />
        <Fields>
          <FormGroup columns="1" className="mb-4">
            <GlobalInput
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{16,23}"
              autoComplete="cc-number"
              maxLength="23"
              placeholder="xxxx xxxx xxxx xxxx"
              name="cardNumber"
              labelText="Card Number"
              labelColor="var(--clr-primary)"
              value={values.cardNumber}
              handleChange={(e) =>
                setFieldValue("cardNumber", formatCardNumber(e.target.value))
              }
              handleBlur={handleBlur}
              className={
                errors.cardNumber && touched.cardNumber ? "card-error" : ""
              }
              required
            />
          </FormGroup>
          <FormGroup columns="2" className="mb-4">
            <GlobalInput
              labelText="First Name"
              labelColor="var(--clr-primary)"
              placeholder="First name"
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.firstName && touched.firstName ? "card-error" : ""
              }
              error={errors.firstName && touched.firstName}
              errorMessage={errors.firstName}
            />
            <GlobalInput
              labelText="Last Name"
              labelColor="var(--clr-primary)"
              placeholder="Last name"
              inputName="lastName"
              inputValue={values.lastName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.lastName && touched.lastName ? "card-error" : ""
              }
              error={errors.lastName && touched.lastName}
              errorMessage={errors.lastName}
            />

            <GlobalInput
              inputType={"number"}
              labelText="Expiry Month"
              labelColor="var(--clr-primary)"
              name={"expiryMonth"}
              inputPlaceholder="mm"
              min={minCardYear().minMonth}
              max="12"
              value={values.expiryMonth}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.expiryMonth && touched.expiryMonth ? "card-error" : ""
              }
              error={errors.expiryMonth && touched.expiryMonth}
              errorMessage={errors.expiryMonth}
              required
            />
            <GlobalInput
              inputType={"number"}
              labelText="Expiry Year"
              labelColor="var(--clr-primary)"
              placeholder="yy"
              name={"expiryYear"}
              value={values.expiryYear}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.expiryYear && touched.expiryYear ? "card-error" : ""
              }
              error={errors.expiryYear && touched.expiryYear}
              errorMessage={errors.expiryYear}
              min={minCardYear().minYear}
              required
            />
          </FormGroup>
          <FormGroup columns="1" className="mb-4">
            <GlobalInput
              inputType={"password"}
              placeholder="CVV"
              labelText="CVV"
              labelColor="var(--clr-primary)"
              name="cvv"
              value={values.cvv}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={errors.cvv && touched.cvv ? "card-error" : ""}
              error={errors.cvv && touched.cvv}
              errorMessage={errors.cvv}
            />
            <GlobalTextArea
              labelText="Billing Address (Optional)"
              labelColor="var(--clr-primary)"
              name="billingAddress"
              value={values.billingAddress}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.billingAddress && touched.billingAddress
                  ? "card-error"
                  : ""
              }
              error={errors.billingAddress && touched.billingAddress}
              errorMessage={errors.billingAddress}
            />
          </FormGroup>
          <GlobalBtn mx="auto" type="submit">
            Add Card
          </GlobalBtn>
        </Fields>
      </form>
    </GlobalModal>
  );
}

export default EditCardForm;
