import { useEffect, useReducer } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import {
  BackBtn,
  Fields,
  FormGroup,
  GroupHeading,
  PageHeading,
  SectionHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import {
  useCreateGradingSettings,
  useGetGradingSettingsByRecord,
  useGetGradingSettingsByRole,
  useUpdateGradingSettings,
} from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import { interviewTypes } from "../../../../utils/selectOptions";
import GlobalCollapsible from "../../../../components/globalcomponents/GlobalCollapsible";
import { BsTrash } from "react-icons/bs";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import { interviewGradingValidation } from "../../../../Validations/addInterviewGradingValidation";
import Collapsible from "react-collapsible";

const initState = [];

const paramReducer = (state, action) => {
  switch (action.type) {
    case "add_param":
      return [
        ...state,
        {
          id: state.length + 1,
          paramName: `Parameter ${state.length + 1}`,
          paramDescription: "",
          minimumValue: 0,
          maximumValue: 0,
        },
      ];
    case "remove_param":
      const newState = state.filter((param) => param.id !== action.id);
      return newState;
    case "update_param":
      const updatedState = state.map((param) => {
        if (param.id !== action.id) {
          return param;
        } else {
          return {
            ...param,
            [action.name]: action.value,
          };
        }
      });
      return updatedState;
    case "init":
      return action.data;
    default:
      return state;
  }
};

const InterviewGradingParameters = ({
  collaborator,
  interviewName,
  interviewType,
}) => {
  const [parameters, setParameters] = useReducer(paramReducer, initState);
  const { enqueueSnackbar } = useSnackbar();

  //   =======================fetching data =======================
  const { data: rolesData } = useGetCollaboratorRoles();

  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() ===
      (collaborator === "qamaster" ? "qa" : collaborator)
  )?.[0];

  const { data: gradingSettings } = useGetGradingSettingsByRole(
    collaboratorData?.id
  );

  const activeGradingParams = gradingSettings?.data?.find(
    (param) => param.interviewType === interviewType
  );

  const { data: fullGradingParams } = useGetGradingSettingsByRecord(
    activeGradingParams?.id,
    { enabled: !!activeGradingParams?.id }
  );
  const activeParam = fullGradingParams?.data;

  // ========================mutations========================
  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
  }
  function onFailed(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }

  const { mutate: createGradingParams } = useCreateGradingSettings({
    collaboratorId: collaboratorData?.id,
    onSuccess,
    onFailed,
  });

  const { mutate: updateGradingParams } = useUpdateGradingSettings({
    collaboratorId: collaboratorData?.id,
    onSuccess,
    onFailed,
  });

  const onSubmit = () => {
    if (!!activeGradingParams) {
      const payload = {
        recordId: activeGradingParams.id,
        interviewName: values.interviewName,
        passMark: +values.passMark,
        interviewType: values.interviewType,
        ratingParameters: parameters.map((param) => ({
          paramName: param.paramName,
          paramDescription: param.paramDescription,
          minimumValue: +param.minimumValue,
          maximumValue: +param.maximumValue,
        })),
      };

      updateGradingParams(payload);
    } else {
      const payload = {
        roleId: collaboratorData?.id,
        interviewName: values.interviewName,
        passMark: +values.passMark,
        interviewType: values.interviewType,
        ratingParameters: parameters.map((param) => ({
          paramName: param.paramName,
          paramDescription: param.paramDescription,
          minimumValue: +param.minimumValue,
          maximumValue: +param.maximumValue,
        })),
      };
      createGradingParams(payload);
    }
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      interviewName: interviewName,
      interviewType: interviewType,
      passMark: "",
    },
    onSubmit,
    validationSchema: interviewGradingValidation,
  });

  useEffect(() => {
    if (activeParam?.name) {
      setFieldValue("interviewName", activeParam.name);
      setFieldValue("interviewType", activeParam.interviewType);
      setFieldValue("passMark", activeParam.passMark);
      setParameters({
        type: "init",
        data: activeParam?.interviewParameters?.map((param, index) => ({
          id: index + 1,
          paramName: param.interviewName,
          paramDescription: param.interviewDescription,
          minimumValue: param.minimumValue,
          maximumValue: param.maximumValue,
        })),
      });
    }
  }, [activeParam?.name]);

  const totalMaxMark = parameters.reduce((total, current) => {
    return (total += current.maximumValue);
  }, 0);

  const possibleMaxMark = totalMaxMark / parameters.length;

  // ===================== actions ===================
  const addNewParam = () => setParameters({ type: "add_param" });
  const removeParam = (id) => setParameters({ type: "remove_param", id });
  const updateParam = (id, name, value) =>
    setParameters({ type: "update_param", id, name, value });

  return (
    <div style={{ marginBottom: "-1rem", marginTop: "-2rem" }}>
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            {`${interviewName} Grading Parameters`}
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormGroup columns={3}>
              <GlobalInput
                labelText="Interview Name"
                inputName="interviewName"
                inputValue={values.interviewName}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.interviewName && touched.interviewName}
                errorMessage={errors.interviewName}
                inputPlaceholder={"Interview Name"}
                required={true}
                disabled={
                  values.interviewName.toLowerCase() ===
                  interviewName.toLowerCase()
                }
              />
              <GlobalInput
                labelText="Cut Off Mark"
                inputType="number"
                inputName="passMark"
                inputValue={values.passMark}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.passMark && touched.passMark}
                errorMessage={errors.passMark}
                inputPlaceholder={"Pass Mark"}
                min={0}
                step={0.1}
                max={possibleMaxMark}
                required={true}
              />
              <GlobalSelect
                labelText="Interview Type"
                selectName="interviewType"
                valueType="string"
                selectValue={values.interviewType}
                handleBlur={handleBlur}
                handleChange={handleChange}
                options={interviewTypes}
                defaultOption={"Select Interview Type"}
                error={errors.interviewType && touched.interviewType}
                errorMessage={errors.interviewType}
                required={true}
                disabled={values.interviewType === interviewType}
              />
            </FormGroup>

            <Fields>
              <GroupHeading style={{ marginBottom: "-1rem" }}>
                Parameters
              </GroupHeading>
              <Stack>
                {parameters?.map((param) => (
                  <div style={{ marginBottom: "-4rem" }}>
                    <GradingParameter
                      key={param.id}
                      param={param}
                      updateParam={updateParam}
                      removeParam={removeParam}
                    />
                  </div>
                ))}
              </Stack>

              <Button
                type="button"
                sx={{
                  marginTop: "3rem",
                  backgroundColor: "#000",
                  color: "#fff",
                  textTransform: "capitalize",
                  marginInline: "auto",
                  "&:hover": {
                    backgroundColor: "#4e4e4e",
                  },
                }}
                onClick={addNewParam}
              >
                Add New Parameter
              </Button>
            </Fields>

            <div style={{ marginBottom: "2rem" }}>
              <GlobalBtn mx="auto" type="submit">
                Save
              </GlobalBtn>
            </div>
          </Stack>
        </form>
      </Collapsible>
    </div>
  );
};

export default InterviewGradingParameters;

const GradingParameter = ({ param, updateParam, removeParam }) => {
  return (
    <GlobalCollapsible
      title={
        <Stack spacing={2} alignItems={"center"} direction="row">
          <IconButton onClick={() => removeParam(param.id)}>
            <BsTrash color="var(--clr-primary)" fontSize={"16px"} />
          </IconButton>
          <span className="fw-normal">{param.paramName}</span>
        </Stack>
      }
    >
      <FormGroup columns={2} style={{ marginBottom: "3rem" }}>
        <GlobalInput
          labelText="Parameter Name"
          inputName="paramName"
          inputValue={param.paramName}
          handleChange={(e) =>
            updateParam(param.id, e.target.name, e.target.value)
          }
          required
        />
        <GlobalInput
          labelText="Parameter Description"
          inputName="paramDescription"
          inputValue={param.paramDescription}
          handleChange={(e) =>
            updateParam(param.id, e.target.name, e.target.value)
          }
          required
        />
        <GlobalInput
          labelText="Minimum Value"
          inputType="number"
          inputName="minimumValue"
          inputValue={param.minimumValue}
          handleChange={(e) =>
            updateParam(param.id, e.target.name, e.target.value)
          }
          min={0}
          required
        />
        <GlobalInput
          labelText="Maximum Value"
          inputType="number"
          inputName="maximumValue"
          inputValue={param.maximumValue}
          handleChange={(e) =>
            updateParam(param.id, e.target.name, e.target.value)
          }
          required
          min={param.minimumValue}
        />
      </FormGroup>
    </GlobalCollapsible>
  );
};
