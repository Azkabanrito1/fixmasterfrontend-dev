import GlobalInput from "../../../../../globalcomponents/GlobalInput";
import { FormGroup } from "../../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import { useGetBankNames } from "../../../../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { useMemo } from "react";
import { useAddCollaboratorBankAccount } from "../../../../../../hooks/useQueries/useJobs";
import { addBankValidation } from "../../../../../../Validations/addBankNameValidation";
import axios from "axios";
import { useEffect } from "react";

const BankForm = ({ isopen, closeModal }) => {
  const { data: banks } = useGetBankNames();

  const availableBanks = useMemo(
    () => banks?.data?.filter((bank) => bank.active && bank.supports_transfer),
    [banks]
  );
  const bankOptions = useMemo(() => {
    const options = availableBanks?.map((bank) => bank.name);
    if (!!options) {
      options.push("");
      return [...new Set(options)];
    } else return [];
  }, [banks]);

  const { enqueueSnackbar } = useSnackbar();
  //--------------------------------mutate fn--------------------------------
  const onSuccess = () => {
    enqueueSnackbar("Bank Account successfully Added", { variant: "success" });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createBankDetails, isLoading } =
    useAddCollaboratorBankAccount(onSuccess, onFailure);

  // const getBankAccountName = async (accountNumber, bankCode) => {
  //   const details = await axios.get(
  //     `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer sk_test_e002f914c221a82749ffb1d87b6ce56e09a4e469`,
  //       },
  //     }
  //   );
  //   return details;
  // };

  const onSubmit = (values) => {
    const bankCode = banks?.data?.filter(
      (bank) => bank.name === values.bankName
    )[0]?.code;

    if (!bankCode) {
      setFieldError("bankName", "Please input a valid bank name");
      return;
    }

    const payload = {
      bankName: values.bankName,
      accountNumber: String(values.accountNumber),
      bankBranch: values.bankBranch,
      bankCode,
    };

    createBankDetails(payload);
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    setFieldError,
  } = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      bankBranch: "",
    },
    onSubmit,
    validationSchema: addBankValidation,
  });

  // useEffect(() => {
  //   if (!!values.bankName && values.accountNumber.length === 10) {
  //     const bankCode = banks?.data?.filter(
  //       (bank) => bank.name === values.bankName
  //     )[0]?.code;
  //     const accountDetails = getBankAccountName(values.accountNumber, bankCode);
  //     console.log(accountDetails);
  //   }
  // }, [values.accountNumber, values.bankName]);

  return (
    <GlobalModal isOpen={isopen} closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <AltModalHeader heading={"Add Bank Account"} closeModal={closeModal} />
        <FormGroup columns="2">
          <Autocomplete
            id="bank-name"
            value={values.bankName}
            options={bankOptions}
            onChange={(event, newValue) => setFieldValue("bankName", newValue)}
            renderInput={(params) => (
              <>
                <InputLabel sx={{ marginBottom: "6px" }}>Bank Name</InputLabel>
                <TextField
                  {...params}
                  required={true}
                  error={!!errors.bankName}
                  helperText={errors.bankName}
                  placeholder="Enter your bank name"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "0.5rem",
                      border: "2px solid rgb(161, 161, 161)",
                    },

                    "& .MuiInputBase-input": {
                      padding: "4px !important",
                    },
                  }}
                />
              </>
            )}
          />

          <GlobalInput
            inputName="accountNumber"
            labelText="Account Number"
            inputType="number"
            min={0}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputPlaceholder="Enter account number"
            maxLength={10}
            inputValue={values.accountNumber}
            error={!!errors.accountNumber}
            errorMessage={errors.accountNumber}
            inputMode="numeric"
            required
          />

          <GlobalInput
            inputName="bankBranch"
            labelText="Bank Branch"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputPlaceholder="Specify bank branch"
            inputValue={values.bankBranch}
          />
        </FormGroup>
        <GlobalBtn type="submit" disabled={isLoading? true : false} className="m-auto mt-4">
          {isLoading ? "Loading" : "Save"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default BankForm;
