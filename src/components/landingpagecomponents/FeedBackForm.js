import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { Fields, FormGroup } from "../globalcomponents/Utilities";
import GlobalInput from "../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../globalcomponents/GlobalPhoneInput";
import GlobalTextArea from "../globalcomponents/GlobalTextArea";
import GlobalAltBtn from "../globalcomponents/GlobalAltBtn";

function FeedBackForm() {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Fields>
          <h2 className="fs-2">ENQUIRY AND FEEDBACK</h2>
          <p className="mb-4">
            Fill the form below if you have any enquiry or feedback
          </p>
          <FormGroup columns="1" gap="20px">
            <GlobalInput
              inputType="text"
              inputName="name"
              inputPlaceholder="Name"
              inputValue={values.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.name && touched.name}
              errorMessage={errors.name}
            />

            <GlobalInput
              inputType="email"
              inputName="email"
              inputPlaceholder="Email"
              inputValue={values.email}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.email && touched.email}
              errorMessage={errors.email}
            />

            <GlobalPhoneInput
              inputName="phoneNumber"
              inputPlaceholder="803 123 1234"
              inputValue={values.phoneNumber}
              handleBlur={handleBlur}
              handleChange={setFieldValue}
              error={errors.phoneNumber && touched.phoneNumber}
              errorMessage={errors.phoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />

            <GlobalInput
              inputType="text"
              inputName="subject"
              inputPlaceholder="Enquiries"
              inputValue={values.subject}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.subject && touched.subject}
              errorMessage={errors.subject}
            />

            <GlobalTextArea
              inputName="message"
              inputPlaceholder="Message"
              inputValue={values.message}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.message && touched.message}
              errorMessage={errors.message}
            />
          </FormGroup>
        </Fields>

        <button>Submit Form</button>
      </form>
    </Container>
  );
}

export default FeedBackForm;

const Container = styled.div`
  margin-top: -4rem;
  padding: 4rem 2rem;
  background: #fff;
  box-shadow: 0px 0px 4px 8px rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  width: 50%;
  z-index: 1000;

  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    width: 100%;
  }

  h2,
  p {
    text-align: center;
  }

  button {
    width: 100%;
    background: var(--clr-primary);
    outline: none;
    border: none;
    padding: 13px;
    border-radius: 8px;
    color: #fff;
    font-weight: 500;
  }
`;
