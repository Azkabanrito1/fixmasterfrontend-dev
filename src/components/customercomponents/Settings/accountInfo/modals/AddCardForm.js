import React from "react";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import { CardSchema } from "../../../../../Validations/customerCardValidation";
import { addNewCards } from "../../../../../redux/user/actions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../AltModalHeader";
import { FormGroup } from "../../../../globalcomponents/Utilities";
import { Fields } from "../../../../franchiseecomponents/modals/RegisterFranchisee";
import GlobalTextArea from "../../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";

function AddCardForm({ open, close }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values, actions) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      cardnumber: values.cardnumber,
      expirymonth: values.expirymonth,
      expiryyear: values.expiryyear,
      cvv: values.cvv,
      billingaddress: values.billingaddress,
    };
    const response = await dispatch(addNewCards(payload));
    if (response.status) {
      enqueueSnackbar("Card is successfully added", { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        cardnumber: "",
        expirymonth: "",
        expiryyear: "",
        billingaddress: "",
      },
      validationSchema: CardSchema,
      onSubmit,
    });

  const style = { color: "var(--clr-primary)" };
  return (
    <GlobalModal width="500px" isOpen={open} closeModal={close}>
      <form onSubmit={handleSubmit}>
        <AltModalHeader heading={"Add Card"} closeModal={close} />
        <Fields>
          <FormGroup columns="1" className="mb-4">
            <GlobalInput
              type={"tel"}
              placeholder="Card Number"
              name="cardnumber"
              labelText="Card Number"
              labelColor="var(--clr-primary)"
              value={values.cardnumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.cardnumber && touched.cardnumber ? "card-error" : ""
              }
            />
          </FormGroup>
          <FormGroup columns="2" className="mb-4">
            <GlobalInput
              type={"text"}
              labelText="First Name"
              labelColor="var(--clr-primary)"
              placeholder="Firstname"
              name="firstname"
              value={values.firstname}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.firstname && touched.firstname ? "card-error" : ""
              }
            />
            <GlobalInput
              type={"text"}
              labelText="Last Name"
              labelColor="var(--clr-primary)"
              placeholder="Lastname"
              name="lastname"
              value={values.lastname}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.lastname && touched.lastname ? "card-error" : ""
              }
            />

            <GlobalInput
              type={"tel"}
              labelText="Month"
              labelColor="var(--clr-primary)"
              placeholder="mm"
              name={"expirymonth"}
              value={values.expirymonth}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.expirymonth && touched.expirymonth ? "card-error" : ""
              }
            />
            <GlobalInput
              type={"tel"}
              labelText="Year"
              labelColor="var(--clr-primary)"
              placeholder="yy"
              name={"expiryyear"}
              value={values.expiryyear}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.expiryyear && touched.expiryyear ? "card-error" : ""
              }
            />
          </FormGroup>
          <FormGroup columns="1" className="mb-4">
            <GlobalInput
              inputType={"password"}
              placeholder="CVV"
              labelText="Cvv"
              labelColor="var(--clr-primary)"
              name="cvv"
              value={values.cvv}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={errors.cvv && touched.cvv ? "card-error" : ""}
            />
            <GlobalTextArea
              labelText="Billing Address (Optional)"
              labelColor="var(--clr-primary)"
              name="billingaddress"
              value={values.billingaddress}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className={
                errors.billingaddress && touched.billingaddress
                  ? "card-error"
                  : ""
              }
            />
          </FormGroup>
          <GlobalBtn mx="auto ">Add Card</GlobalBtn>
        </Fields>
      </form>
    </GlobalModal>
  );
}

export default AddCardForm;
