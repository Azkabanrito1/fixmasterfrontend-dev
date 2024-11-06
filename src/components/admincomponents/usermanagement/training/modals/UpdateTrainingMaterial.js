import { useFormik } from "formik";
import GlobalInput, {
  FieldError,
  InputGroup,
} from "../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import { FormGroup } from "../../../../globalcomponents/Utilities";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useUpdateTrainingMaterial } from "../../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalFullScreenLoader from "../../../../globalcomponents/GlobalFullScreenLoader";

const UpdateMaterial = ({ isOpen, closeModal, folderId, materialId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: updateTrainingMaterial, isLoading } =
    useUpdateTrainingMaterial({
      folderId,
      onSuccess,
      onFailed: onError,
    });

  // ========================actions =================

  const onSubmit = (values) => {
    const payload ={
      id: materialId,
      folderId: folderId,
      fileName: values.name,
    }
    updateTrainingMaterial(payload);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={"Update Material Name"}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="1" className="mb-4">
          <GlobalInput
            labelText="Material Name"
            inputName="name"
            inputValue={values.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.name && errors.name}
            errorMessage={errors.name}
            required={true}
          />
        </FormGroup>

        <GlobalBtn mx="auto" type="submit">
          Update
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default UpdateMaterial;
