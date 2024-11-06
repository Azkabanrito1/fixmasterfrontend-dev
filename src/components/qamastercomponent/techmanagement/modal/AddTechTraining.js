import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { FormGroup } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { techTrainingSchema } from "../../../../Validations/AddTechTrainingValidation";
import { parseISO, subDays } from "date-fns";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { getToday } from "../../../../utils/dateRanges";
import {
  useCreateTraining,
  useGetAllTechnician,
  useGetTrainig,
  useGetTrainigMaterials,
  useGetTrainigReminder,
  useGetTrainigType,
} from "../../../../hooks/useQueries/useAdmin";
import { useEffect, useState } from "react";
import { attendanceModes } from "../../../../utils/selectOptions";
import GlobalMultipleSelect from "../../../globalcomponents/GlobalMultipleSelect";
import moment from "moment";
import { useSnackbar } from "notistack";

const AddTechTraining = ({ isOpen, closeModal }) => {
  const [trainingType, setTrainingType] = useState([]);
  const [trainingReminder, setTrainingReminder] = useState([]);
  const [techInvite, setTechInvite] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  //fetching data
  const { data: technicianInvite } = useGetAllTechnician();
  const { data: trainingTypeData } = useGetTrainigType();
  const { data: trainingReminderData } = useGetTrainigReminder();
  const { data: trainingData } = useGetTrainig();
  const { data: trainingMaterialData } = useGetTrainigMaterials();

  useEffect(() => {
    if (trainingTypeData) {
      const newTrainingType = trainingTypeData?.data?.map((item) => ({
        id: item.id,
        name: item.typeName,
      }));
      setTrainingType(newTrainingType);
    }
  }, [trainingTypeData]);

  useEffect(() => {
    if (trainingReminderData) {
      const newTrainingReminderArr = trainingReminderData?.data?.map(
        (item) => ({
          id: item.id,
          name: item.remindMe,
        })
      );
      setTrainingReminder(newTrainingReminderArr);
    }
  }, [trainingReminderData]);

  useEffect(() => {
    if (technicianInvite) {
      const newTechArr = technicianInvite?.data?.map((item) => ({
        id: item.userId,
        name: item.userName,
      }));
      setTechInvite(newTechArr);
    }
  }, [technicianInvite]);

  useEffect(() => {
    if (trainingData) {
      const newTrainingArr = trainingData?.data?.map((item) => ({
        id: item.userId,
        name: item.trainingName,
      }));
      setTrainings(newTrainingArr);
    }
  }, [trainingData]);

  const onSuccess = () => {
    enqueueSnackbar("Training assigned successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createTraining } = useCreateTraining(onSuccess, onFailure);

  const onSubmit = async (values, actions) => {
    const payload = {
      trainingId: selectedTraining[0]?.id,
      title: values.title,
      fromDate: moment(`${values.startDate} ${values.startTime}`).toISOString(),
      toDate: moment(`${values.endDate} ${values.endTime}`).toISOString(),
      trainingTypeId: selectedTrainingType[0]?.id,
      assignedToUserIds: techInvitee,
      attendanceMode: selectedAttendance[0]?.name,
      venueLink: values.venue,
      setReminderId: selectedReminder[0]?.id,
      message: values.reminderMsg,
      trainingMaterials,
    };

    createTraining(payload);
    actions.resetForm();
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      type: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      techInvite: [],
      attendanceMode: "",
      venue: "",
      reminderDate: "",
      reminderMsg: "",
      training: "",
      trainingMaterial: [],
    },
    validationSchema: techTrainingSchema,
    onSubmit,
  });

  // console.log(values);

  const selectedTraining = trainingData?.data?.filter((training) =>
    values.training.includes(training.trainingName)
  );

  const selectedTrainingType = trainingTypeData?.data?.filter((type) =>
    values.type.includes(type.typeName)
  );

  const selectedTechnician = technicianInvite?.data?.filter((tech) =>
    values.techInvite.includes(tech.userName)
  );
  const selectedReminder = trainingReminderData?.data?.filter((remind) =>
    values.reminderDate.includes(remind.remindMe)
  );

  const techInvitee = selectedTechnician?.map((item) => {
    return item.userId;
  });
  const selectedTrainingMaterial = trainingMaterialData?.data?.filter((tech) =>
    values.trainingMaterial.includes(tech.name)
  );
  const trainingMaterials = selectedTrainingMaterial?.map((item) => ({
    materialId: item.id,
  }));

  const selectedAttendance = attendanceModes?.filter((item) =>
    values.attendanceMode.includes(item.name)
  );

  const formikHandlers = {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Add Technician Training"
        closeModal={closeModal}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" style={{ marginBottom: "24px" }}>
          <GlobalInput
            labelText="Training Title"
            inputPlaceholder={"Add training title"}
            inputName={"title"}
            inputValue={values.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.title && errors.title}
            errorMessage={errors.title}
            required
          />

          <GlobalSelect
            labelText={"Training Type"}
            defaultOption="Select type of training"
            selectName={"type"}
            selectValue={values.type}
            handleBlur={handleBlur}
            handleChange={handleChange}
            options={trainingType}
            error={errors.type && touched.type}
            errorMessage={errors.type}
            valueType="string"
            required
          />

          <GlobalInput
            labelText="Date From"
            inputName={"startDate"}
            inputType={"date"}
            inputValue={values.startDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.startDate && errors.startDate}
            errorMessage={errors.startDate}
            min={getToday()}
            required
          />
          <GlobalInput
            labelText="To"
            inputName={"endDate"}
            inputType={"date"}
            inputValue={values.endDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.endDate && errors.endDate}
            errorMessage={errors.endDate}
            min={getToday()}
            required
          />

          <GlobalInput
            labelText="Time From"
            inputType="time"
            inputName={"startTime"}
            inputValue={values.startTime}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.startTime && errors.startTime}
            errorMessage={errors.startTime}
            required
          />
          <GlobalInput
            labelText="To"
            inputType="time"
            inputName={"endTime"}
            inputValue={values.endTime}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.endTime && errors.endTime}
            errorMessage={errors.endTime}
            required
          />
        </FormGroup>

        <FormGroup columns="2" style={{ marginBottom: "24px" }}>
          <GlobalSelect
            labelText={"Training"}
            defaultOption="Select Training"
            selectName={"training"}
            selectValue={values.training}
            handleBlur={handleBlur}
            handleChange={handleChange}
            options={trainings}
            valueType="string"
            error={errors.training && touched.training}
            errorMessage={errors.training}
            required
          />
          <GlobalMultipleSelect
            labelText={"Training Material*"}
            initData={trainingMaterialData?.data || []}
            inputName="trainingMaterial"
            required={true}
            formikHandlers={formikHandlers}
          />
        </FormGroup>
        <FormGroup columns="1" style={{ marginBottom: "24px" }}>
          <GlobalMultipleSelect
            labelText={"Invite Technician*"}
            initData={techInvite || []}
            inputName="techInvite"
            required={true}
            formikHandlers={formikHandlers}
          />
          <GlobalSelect
            labelText={"Attendance"}
            defaultOption={"Select attendance mode"}
            options={attendanceModes}
            valueType="string"
            selectName={"attendanceMode"}
            selectValue={values.attendanceMode}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.attendanceMode && errors.attendanceMode}
            errorMessage={touched.attendanceMode}
            required
          />

          <GlobalInput
            inputName={"venue"}
            labelText={"Link/Venue"}
            inputPlaceholder={"Meeting link/venue of meeting"}
            inputType="text"
            inputValue={values.venue}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.venue && touched.venue}
            errorMessage={errors.venue}
            required
          />

          <GlobalSelect
            labelText={"Reminder"}
            defaultOption={"Choose the reminder"}
            options={trainingReminder}
            selectName={"reminderDate"}
            selectValue={values.reminderDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            valueType="string"
            error={touched.reminderDate && errors.reminderDate}
            errorMessage={touched.reminderDate}
            required
          />

          <div className="d-flex flex-column">
            <label htmlFor="reminderMsg">Add Reminder Message (optional)</label>
            <textarea
              placeholder="Please add reminder message"
              name="reminderMsg"
              value={values.reminderMsg}
              onBlur={handleBlur}
              onChange={handleChange}
              resize="none"
              rows="5"
              style={{
                padding: "0.8em",
                marginTop: "8px",
                border: "2px solid #a2a2a2",
                borderRadius: "8px",
              }}
            />
            {errors.reminderMsg && touched.reminderMsg && (
              <span className="error">{errors.reminderMsg}</span>
            )}
          </div>
        </FormGroup>

        <GlobalBtn
          mx="auto"
          type="submit"
          disabled={!values.techInvite || createTraining}
        >
          Send Notification
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddTechTraining;
