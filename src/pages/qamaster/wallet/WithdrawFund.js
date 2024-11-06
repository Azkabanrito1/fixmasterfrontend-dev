import React from "react";
import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FormGroup } from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";
import {
  useGetBankDetails,
  useRequestWithdrawal,
} from "../../../hooks/useQueries/useJobs";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import { useFormik } from "formik";

const WithdrawFund = ({ isOpen, closeModal }) => {
  //   const { data: profile } = useGetUserProfile();
  const { data: bankDetails } = useGetBankDetails();
  const { enqueueSnackbar } = useSnackbar();

  const bankAccountOptions = bankDetails?.data?.map((details) => ({
    id: details.id,
    name: `${details.acctNumber} - ${details.bankName}`,
  }));

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };

  const onError = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });

  const { mutate: requestWithdrawal } = useRequestWithdrawal(
    onSuccess,
    onError
  );

  const onSubmit = (values) => {
    const { amount, bankId } = values;

    const payload = {
      amount,
      bankId: +bankId,
    };

    requestWithdrawal(payload);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      amount: "",
      bankId: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="400px">
      <AltModalHeader heading="Withdraw Fund" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup className="mb-4">
          <GlobalInput
            labelText="Amount"
            value={values.amount}
            name="amount"
            inputType="number"
            required
            handleChange={handleChange}
          />

          <GlobalSelect
            selectName="bankId"
            labelText="Bank Account"
            options={bankAccountOptions}
            handleChange={handleChange}
            required
          />
        </FormGroup>

        <GlobalBtn mx="auto" type="submit" width="80%">
          Withdraw
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default WithdrawFund;
