import FileUpload from "../FileUpload";
import { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const DocumentsFormGroup = ({
  isSupplier,
  formikHandlers,
  removeFile,
  internalErrors,
  setInternalErrors,
  uploadResponse,
  setUploadResponse,
}) => {
  const { values, errors, touched, setFieldValue } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Additional Documents</GroupHeading>
      {internalErrors && (
        <FieldError mt={"0"} ml={"0"} mb={"16px"} fs={"14px"}>
          {internalErrors}
        </FieldError>
      )}
      <FormGroup columns="2">
        <FileUpload
          labelText={isSupplier ? "CAC" : "CV"}
          inputName={isSupplier ? "cac" : "cv"}
          description="Upload pdf file with max size of 2MB"
          uploadState={setFieldValue}
          error={
            isSupplier ? errors.cac && touched.cac : errors.cv && touched.cv
          }
          errorInfo={isSupplier ? errors.cac : errors.cv}
          fileState={isSupplier ? values.cac : values.cv}
          fileType={"document"}
          removeFile={removeFile}
          uploadResponse={uploadResponse}
          setUploadResponse={setUploadResponse}
          maximumSize={2048000}
          required={true}
          accepted={{
            "application/pdf": [".pdf"],
          }}
          /* onclick should clear internal errors that are generated when a user tries to 
              submit the application without uploading the file */
          onClick={() => setInternalErrors("")}
        />
        <FileUpload
          labelText="Cover Letter"
          inputName="coverLetter"
          description="Upload pdf file with max size of 2MB"
          error={errors.coverLetter && touched.coverLetter}
          errorInfo={errors.coverLetter}
          fileState={values.coverLetter}
          fileType={"document"}
          uploadState={setFieldValue}
          removeFile={removeFile}
          uploadResponse={uploadResponse}
          setUploadResponse={setUploadResponse}
          accepted={{
            "application/pdf": [".pdf"],
          }}
          maximumSize={2048000}
          required={true}
          onClick={() => setInternalErrors("")}
        />
      </FormGroup>
    </Fields>
  );
};

export default DocumentsFormGroup;
