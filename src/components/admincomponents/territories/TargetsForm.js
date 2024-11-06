import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import { useEffect } from "react";
import { targetValidation } from "../../../Validations/createBonusTargetValidation";
import { BallBeat } from "react-pure-loaders";
import { useGetAllBonuses } from "../../../hooks/useQueries/useAdmin";
import { useParams } from "react-router-dom";

const TargetsForm = ({
  collaborators,
  createUpdateTarget,
  initialValues,
  intervals,
  isLoading,
  isSubmitting,
  territoryId,
  valueTypes,
}) => {
  const { id, collaborator } = useParams();

  const { data: allBonuses, isLoading: isLoadingBonuses } = useGetAllBonuses(
    id,
    { enabled: !!collaborator && !!id },
    { collaboratorId: collaborator }
  );
  const bonuses = allBonuses?.data?.map((bonus) => ({
    id: bonus.id,
    name: bonus.name,
  }));

  useEffect(() => {
    if (initialValues) {
      setFieldValue("name", initialValues?.name);
      setFieldValue("value", initialValues?.value);
      const initValueType = valueTypes.filter(
        (type) => type.name.toLowerCase() === initialValues?.type?.toLowerCase()
      );
      setFieldValue("valueType", initValueType[0].name);
      const initCollaborator = collaborators.filter(
        (collaborator) =>
          collaborator.name.toLowerCase() ===
          initialValues?.roleName?.toLowerCase()
      );
      setFieldValue("collaborator", initCollaborator[0].id);
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
      territoryId: parseInt(territoryId),
      targetName: values.name,
      targetType: values.valueType,
      targetValue: String(values.value),
      bonusId: parseInt(values.bonus),
    };

    createUpdateTarget(payload);
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
      value: "",
      bonus: "",
      valueType: "",
    },
    onSubmit,
    validationSchema: targetValidation,
  });

  // console.log(errors);

  return (
    <>
      <div className="text-center">
        <BallBeat loading={isLoading} color="var(--clr-prmiary)" />
      </div>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Target Name"
              inputName="name"
              inputValue={values.name}
              inputPlaceholder="i.e. Monthly Target"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.name && touched.name}
              errorMessage={errors.name}
              required
            />
            <GlobalSelect
              labelText="Bonus"
              options={bonuses || []}
              selectName="bonus"
              selectValue={values.bonus}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a bonus"}
              error={errors.bonus && touched.bonus}
              errorMessage={errors.bonus}
              required
            />
            <GlobalSelect
              labelText={"Target Type"}
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
          </FormGroup>
        </Fields>

        <GlobalBtn disabled={isSubmitting} type="submit" mx="auto">
          {isSubmitting ? "Submitting" : "Save"}
        </GlobalBtn>
      </form>
    </>
  );
};

export default TargetsForm;
