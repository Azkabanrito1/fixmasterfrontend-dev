import { useEffect } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import { useFormik } from "formik";
import { bonusValidation } from "../../../Validations/createBonusTargetValidation";
import { BallBeat } from "react-pure-loaders";

const BonusesForm = ({
  collaborator,
  createUpdateBonus,
  initialValues,
  intervals,
  isLoading,
  isSubmitting,
  territoryId,
  valueTypes,
  contractTypes,
}) => {
  useEffect(() => {
    if (initialValues) {
      setFieldValue("name", initialValues?.name);
      setFieldValue("value", initialValues?.value);
      const initValueType = valueTypes.filter(
        (type) => type.name.toLowerCase() === initialValues?.type?.toLowerCase()
      );
      setFieldValue("valueType", initValueType[0]?.name);
      setFieldValue("collaborator", initialValues.roleId);
      const initInterval = intervals.filter(
        (interval) =>
          interval.name.toLowerCase() ===
          initialValues?.intervalName?.toLowerCase()
      );
      setFieldValue("interval", initInterval[0].id);
    }
  }, [initialValues]);

  const onSubmit = (values) => {
    const payload = {
      bonusName: values.name,
      bonusType: values.valueType,
      bonusValue: values.value,
      collaboratorRole: collaborator,
      territoryId: parseInt(territoryId),
      interval: parseInt(values.interval),
      workerType: +values.workerType,
    };

    createUpdateBonus(payload);
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      valueType: "",
      value: "",
      interval: "",
      workerType: "",
    },
    onSubmit,
    validationSchema: bonusValidation,
  });

  return (
    <>
      <div className="text-center">
        <BallBeat loading={isLoading} color="var(--clr-prmiary)" />
      </div>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Bonus Name"
              inputName="name"
              inputValue={values.name}
              inputPlaceholder="i.e. Monthly Bonus"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.name && touched.name}
              errorMessage={errors.name}
              required
            />
            <GlobalSelect
              labelText="Interval"
              options={intervals || []}
              selectName="interval"
              selectValue={values.interval}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select an interval"}
              error={errors.interval && touched.interval}
              errorMessage={errors.interval}
              required
            />
            <GlobalSelect
              labelText={"Value Type"}
              options={valueTypes || []}
              selectName={"valueType"}
              selectValue={values.valueType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a target type"}
              error={errors.valueType && touched.valueType}
              errorMessage={errors.valueType}
              required
            />
            <GlobalInput
              labelText="Value"
              inputName="value"
              inputType="number"
              inputValue={values.value}
              inputPlaceholder="i.e. 10,000"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.value && touched.value}
              errorMessage={errors.value}
              required
            />
            <GlobalSelect
              labelText={"Contract Type"}
              options={contractTypes || []}
              selectName="workerType"
              selectValue={values.workerType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a target type"}
              error={errors.workerType && touched.workerType}
              errorMessage={errors.workerType}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" mx="auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </GlobalBtn>
      </form>
    </>
  );
};

export default BonusesForm;
