import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import { useUpdateFolder } from "../../../hooks/useQueries/useAdmin";

const EditAboutFmFolder = ({ isOpen, closeModal, activeFolder }) => {
  const { enqueueSnackbar } = useSnackbar();

  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  }

  function onFailed(response) {
    enqueueSnackbar(response.message || response.title, { variant: "error" });
  }

  const { mutate: createFolder } = useUpdateFolder(onSuccess, onFailed);

  const onSubmit = () => {
    const payload = {
      folderId: activeFolder.folderId,
      folderName: values.folderName,
    };

    createFolder(payload);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        folderName: activeFolder.folderName,
      },
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={"Edit Training Folder"}
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
            />
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" mx="auto">
          Update
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default EditAboutFmFolder;
