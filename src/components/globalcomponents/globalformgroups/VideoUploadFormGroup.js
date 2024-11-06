import { useGetVideoTopicSetting } from "../../../hooks/useQueries/useAdmin";
import FileUpload from "../FileUpload";
import { FieldError } from "../GlobalInput";
import GlobalSelect from "../GlobalSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const VideoFormGroup = ({
  formikHandlers,
  topicOption = [],
  removeFile,
  uploadResponse,
  setUploadResponse,
  setInternalErrors,
  internalErrors,
}) => {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    formikHandlers;

  const { data: getVideoTopicSetting } = useGetVideoTopicSetting();

  const videoTopicSetting = getVideoTopicSetting?.data;

  const fileDescription = videoTopicSetting
    ?.map((setting) => `${setting.fileType}`)
    .join(" or ");

  const acceptedFileTypes = videoTopicSetting?.reduce((acc, setting) => {
    acc[`video/${setting.fileType}`] = [`.${setting.fileType}`];
    return acc;
  }, {});

  const maxFileSize = videoTopicSetting
    ? Math.max(...videoTopicSetting.map((setting) => setting.fileSize)) *
      1024 *
      1024
    : null;

  return (
    <Fields>
      <GroupHeading>Mandatory Video Submission</GroupHeading>
      <p
        style={{
          display: "inline-block",
          overflow: "hidden",
          clear: "both",
          whiteSpace: "nowrap",
        }}
      >
        Please choose one of the steps below and submit a one minute video on
        the topic of your choice
      </p>
      <FormGroup style={{ marginBottom: "20px" }} columns="2">
        <GlobalSelect
          labelText="Topics"
          selectName="topics"
          options={topicOption}
          defaultOption="Select Topic"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.topics}
          error={errors.topics && touched.topics}
          required={true}
        />
      </FormGroup>

      <FormGroup columns="2">
        {internalErrors && (
          <FieldError mt={"0"} ml={"0"} mb={"16px"} fs={"14px"}>
            {internalErrors}
          </FieldError>
        )}
        <FileUpload
          labelText="Upload Video"
          description={`Upload ${fileDescription} file with a max size of ${
            maxFileSize / 1024 / 1024
          }MB`}
          inputName="video"
          uploadState={setFieldValue}
          error={errors.video && touched.video}
          errorInfo={errors.video}
          fileState={values.video}
          fileType={"video"}
          removeFile={removeFile}
          uploadResponse={uploadResponse}
          setUploadResponse={setUploadResponse}
          accepted={acceptedFileTypes}
          maximumSize={maxFileSize}
          required={true}
          onClick={() => setInternalErrors("")}
        />
      </FormGroup>
    </Fields>
  );
};

export default VideoFormGroup;
