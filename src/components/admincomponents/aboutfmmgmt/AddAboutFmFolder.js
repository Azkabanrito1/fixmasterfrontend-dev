import { useFormik } from "formik";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { useUploadFmFolder } from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";

const AddAboutFmFolder = ({ isOpen, closeModal }) => {
  const { enqueueSnackbar } = useSnackbar();

  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  }

  function onFailed(response) {
    enqueueSnackbar(response.message || response.title, { variant: "error" });
  }

  const { mutate: uploadFolder } = useUploadFmFolder(onSuccess, onFailed);

  const onSubmit = () => {
    const payload = {
      folderName: values.folderName,
    };

    uploadFolder(payload);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        folderName: "",
      },
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={"Add About FixMaster Folder"}
      />

      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="1">
            <GlobalInput
              labelText="Folder Name"
              inputName="folderName"
              inputValue={values.folderName}
              error={touched.folderName && errors.folderName}
              errorMessage={errors.folderName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" mx="auto">
          Add
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddAboutFmFolder;
