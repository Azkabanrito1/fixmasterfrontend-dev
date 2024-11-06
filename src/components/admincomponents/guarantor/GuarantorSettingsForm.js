import { useFormik } from "formik";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import {
  useGetAllIdentityCards,
  useSetGuarantorSettings,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import React, { useEffect } from "react";

const GuarantorSettingsForm = React.memo(({ collaboratorId, initValues }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: idCardsData } = useGetAllIdentityCards();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: setSettings } = useSetGuarantorSettings(onSuccess, onError);

  const onSubmit = () => {
    const payload = {
      collaboratorId,
      requiredNumOfGuarantor: values.noOfGuarantors,
      periodKnown: String(values.periodKnown),
      cardId: values.idType.map((id) => +id),
    };

    setSettings(payload);
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      noOfGuarantors: "",
      periodKnown: "",
      idType: [],
    },
    onSubmit,
  });

  console.log(values.idType);

  useEffect(() => {
    if (initValues?.requiredNumOfGuarantor) {
      setFieldValue("noOfGuarantors", initValues.requiredNumOfGuarantor);
      setFieldValue("periodKnown", +initValues.periodKnown);
      setFieldValue(
        "idType",
        initValues?.identityCards?.map((card) => String(card.identityCardId))
      );
    }
  }, [initValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Fields>
        <FormGroup columns="2">
          <GlobalInput
            labelText={"Number of guarantors needed"}
            inputName="noOfGuarantors"
            inputType="number"
            inputValue={values.noOfGuarantors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.noOfGuarantors && errors.noOfGuarantors}
            errorMessage={errors.noOfGuarantors}
            required={true}
          />
          <GlobalInput
            labelText={"Period known (In years)"}
            inputName={"periodKnown"}
            inputType={"number"}
            inputValue={values.periodKnown}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.periodKnown && errors.periodKnown}
            errorMessage={errors.periodKnown}
            required={true}
          />
        </FormGroup>
        <div className="mt-3">
          <label>Accepted Means of Identification*</label>
          {idCardsData?.identityCards?.map((type) => (
            <GlobalCheckbox
              mb={"8px"}
              key={type.id}
              inputName="idType"
              inputId={type.name}
              inputValue={type.id}
              handleChange={handleChange}
              labelText={type.name}
            />
          ))}
          {touched.idType && errors.idType && (
            <FieldError>{errors.idType}</FieldError>
          )}
        </div>

        <GlobalBtn className="mt-3 mx-auto" type="submit">
          {initValues ? "Update" : "Set"}
        </GlobalBtn>
      </Fields>
    </form>
  );
});

export default GuarantorSettingsForm;
