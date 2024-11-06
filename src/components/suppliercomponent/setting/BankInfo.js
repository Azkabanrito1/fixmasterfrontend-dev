import React from "react";
import { SectionHeading } from "../../../pages/franchisee/jobs/MyJobDetails";
import { FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";

const BankInfo = ({ handleFormik }) => {
  const { values, handleChange, handleBlur, touched, errors } = handleFormik;
  return (
    <section>
      <SectionHeading>Bank Details</SectionHeading>
      <span className="fs-6 text-muted">
        Please note withdrawals will be sent to the bank account information you
        provided
      </span>
      <FormGroup columns="3" className="mt-3">
        <GlobalInput
          inputName="bankName"
          labelText="Bank Name"
          inputType="text"
          inputPlaceholder="enter bank name"
          inputValue={values.bankName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.bankName && touched.bankName}
          errorMessage={errors.bankName}
        />
        <GlobalInput
          inputName="accountName"
          labelText="Account Name"
          inputType="text"
          inputPlaceholder="e.g Jonathan"
          inputValue={values.accountName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.accountName && touched.accountName}
          errorMessage={errors.accountName}
        />
        <GlobalInput
          inputName="accountNumber"
          labelText="Account Number"
          inputType="number"
          inputPlaceholder="e.g 0077865321"
          inputValue={values.accountNumber}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.accountNumber && touched.accountNumber}
          errorMessage={errors.accountNumber}
        />
      </FormGroup>
    </section>
  );
};

export default BankInfo;
