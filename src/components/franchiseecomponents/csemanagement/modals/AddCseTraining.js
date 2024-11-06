import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { parseISO, subDays } from "date-fns";
import { trainingInvitation } from "../../../../redux/franchisee/actions";
import { useSnackbar } from "notistack";
import { getCSEManaged } from "../../../../redux/franchisee/actions";
import { getToday } from "../../../../utils/dateRanges";
import { cseTrainingSchema } from "../../../../Validations/addCseTrainingValidation";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  cseAttendanceModes,
  cseTrainingNotSchedules,
  cseTrainingTypes,
} from "../../../../utils/selectOptions";

const AddCseTraining = ({ isOpen, closeModal }) => {
  const [selected, setSelected] = useState([]);
  const [cseList, setCseList] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getManagedCses = async () => {
    const response = await dispatch(getCSEManaged());
    if (response.data) setCseList(response.data);
  };

  useEffect(() => {
    getManagedCses();
  }, []);

  const MenuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    variant: "menu",
  };

  const isAllSelected =
    cseList.length > 0 && selected.length === cseList.length;

  const handleMultipleSelect = (event) => {
    const { value } = event.target;
    if (value.at(-1) === "all") {
      setSelected(
        selected.length === cseList.length
          ? []
          : cseList.map((cse) => cse.firstName)
      );
      return;
    }
    setSelected(value);
  };

  const onSubmit = async (values) => {
    const payload = {
      trainingTitle: values.title,
      trainingTypeId: parseInt(values.type),
      trainingDateTime: `${values.date}T${values.time}`,
      attendanceMode: values.attendanceMode,
      trainingLinkVenue: values.venue,
      reminderDate: subDays(
        parseISO(values.date + "T" + values.time),
        values.reminderDate
      ).toISOString(),
      reminder: values.reminderDate,
      reminderMessage: values.reminderMsg,
      cseInvitees: cseInvitees,
    };

    const response = await dispatch(trainingInvitation(payload));
    if (response.status === "Success") {
      enqueueSnackbar("Event added successfully", { variant: "success" });
      resetForm();
      cseInvitees = [];
      closeModal();
    } else {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  const invited = selected.map((cse) => {
    return cseList.filter((item) => item.firstName === cse);
  });
  let cseInvitees = invited.map((invitee) => {
    return { ...invitee[0], id: String(invitee[0].id) };
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      type: "",
      date: "",
      time: "",
      cseInvitees: [], // state for the multiple selection
      attendanceMode: "",
      venue: "",
      reminderDate: "",
      reminderMsg: "",
    },
    validationSchema: cseTrainingSchema,
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Add CSE Training" closeModal={closeModal} />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" style={{ marginBottom: "24px" }}>
          <GlobalInput
            labelText="Training Title"
            labelColor="var(--clr-primary)"
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
            labelColor="var(--clr-primary)"
            defaultOption="Select type of training"
            selectName={"type"}
            selectValue={values.type}
            handleBlur={handleBlur}
            handleChange={handleChange}
            options={cseTrainingTypes}
            error={errors.type && touched.type}
            errorMessage={errors.type}
            required
          />

          <GlobalInput
            labelText="Date"
            labelColor="var(--clr-primary)"
            inputName={"date"}
            inputType={"date"}
            inputValue={values.date}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.date && errors.date}
            errorMessage={errors.date}
            min={getToday()}
            required
          />

          <GlobalInput
            labelText="Time"
            labelColor="var(--clr-primary)"
            inputName={"time"}
            inputType={"time"}
            inputValue={values.time}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.time && errors.time}
            errorMessage={errors.time}
            required
          />
        </FormGroup>

        <FormGroup columns="1" style={{ marginBottom: "24px" }}>
          <FormControl>
            <InputLabel id="mutiple-select-label">Invite CSEs</InputLabel>
            <Select
              labelId="mutiple-select-label"
              multiple
              value={selected}
              onChange={handleMultipleSelect}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              fullWidth
            >
              <MenuItem
                value="all"
                // classes={{
                //   root: isAllSelected ? classes.selectedAll : "",
                // }}
              >
                <ListItemIcon>
                  <Checkbox
                    // classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 && selected.length < cseList.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  // classes={{ primary: classes.selectAllText }}
                  primary="Select All"
                />
              </MenuItem>
              {cseList.map((cse) => (
                <MenuItem key={cse.id} value={cse.firstName}>
                  <ListItemIcon>
                    <Checkbox checked={selected.includes(cse.firstName)} />
                  </ListItemIcon>
                  <ListItemText primary={`${cse.firstName} ${cse.lastName}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <GlobalSelect
            labelText={"Attendance"}
            labelColor="var(--clr-primary)"
            defaultOption={"Select attendance mode"}
            options={cseAttendanceModes}
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
            labelColor="var(--clr-primary)"
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
            labelText={"Reminder Date"}
            labelColor="var(--clr-primary)"
            defaultOption={"Choose the reminder"}
            options={cseTrainingNotSchedules}
            selectName={"reminderDate"}
            selectValue={values.reminderDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.reminderDate && errors.reminderDate}
            errorMessage={touched.reminderDate}
            required
          />

          <div className="d-flex flex-column">
            <label
              htmlFor="reminderMsg"
              style={{ color: "var(--clr-primary)" }}
            >
              Add Reminder Message (optional)
            </label>
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

        <GlobalBtn mx="auto" type="submit">
          Send Notification
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddCseTraining;
