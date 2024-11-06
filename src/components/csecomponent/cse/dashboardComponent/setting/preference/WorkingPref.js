import React, { useEffect } from "react";
import GlobalSelect from "../../../../../globalcomponents/GlobalSelect";
import GlobalInput, {
  FieldError,
} from "../../../../../globalcomponents/GlobalInput";
import styled from "styled-components";
import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../../../globalcomponents/Utilities";
import {
  useGetDaysOfWeeks,
  useGetEmploymentType,
} from "../../../../../../hooks/useQueries/useAdmin";
import {
  useGetWorkingType,
  useSaveNotificationPreference,
} from "../../../../../../hooks/useQueries/useIdentity";
import { useFormik } from "formik";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import { workingPrefSchema } from "../../../../../../Validations/workingPref";

const WorkingPref = ({ employmentType = false }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values) => {
    const weekDays = weeksData?.data?.map((item) => {
      return item?.id;
    });

    if (!weekDays) {
      // Handle the case where weekDays is not available
      console.error("Week days data is not available.");
      return;
    }
    const weekday =
      values.workPref === "weekDays"
        ? weekDays.slice(0, 5)
        : values.workPref === "weekEnd"
        ? contract.splice(-2)
        : values.workPref === "custom"
        ? values.days
        : null;
    const startTime =
      values.status === "Contract"
        ? "00:00:00"
        : values.status === "Fulltime"
        ? "00:00:00"
        : values.status === "Freelance"
        ? `${values.startTime}:00`
        : null;

    const endTime =
      values.status === "Contract"
        ? "00:00:00"
        : values.status === "Fulltime"
        ? "00:00:00"
        : values.status === "Freelance"
        ? `${values.endTime}:00`
        : null;

    const payload = {
      employmentTypeId: +employmentTypes[0].id,
      startTime,
      stopTime: endTime,
      daysInTheWeek: weekday,
    };
    saveNotification(payload);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      status: "",
      startTime: "",
      endTime: "",
      workPref: "",
      days: [],
    },
    // validationSchema: workingPrefSchema,
    onSubmit,
  });

  //-----------------------------data fetching ------------------------
  const { data: weeksData } = useGetDaysOfWeeks();
  const { data: workingTypeData } = useGetWorkingType();
  const { data: employmentTypeData } = useGetEmploymentType();

  // -----------------------mutations & mutation call fna  --------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: saveNotification, isLoading: isSaving } =
    useSaveNotificationPreference(onSuccess, onFailure);

  const workingData = [];
  workingData?.push(workingTypeData?.data);

  const workingTypes = workingData?.map((item) => {
    return {
      id: item?.id,
      name: item?.workingType,
    };
  });

  const employmentTypes = employmentTypeData?.data?.filter((item) =>
    values.status.includes(item.name)
  );

  const contract = weeksData?.data?.map((data) => data.id);

  return (
    <>
      {employmentType && (
        <section>
          <SectionHeading>Working Preference</SectionHeading>

          <form onSubmit={handleSubmit}>
            <FormGroup columns="3">
              <GlobalSelect
                options={
                  workingTypes[0]?.name === null
                    ? employmentTypeData?.data
                    : workingTypes
                }
                labelText="Status"
                defaultOption="Select Status"
                selectName="status"
                selectValue={values.status}
                handleBlur={handleBlur}
                handleChange={handleChange}
                valueType={"string"}
                error={errors.status && touched.status}
                errorMessage={errors.status}
                required
              />

              {values.status === "Freelance" && (
                <GlobalInput
                  inputType="time"
                  labelText="Start Time"
                  inputName="startTime"
                  inputValue={values.startTime}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.startTime && touched.startTime}
                  errorMessage={errors.startTime}
                  required
                />
              )}
              {values.status === "Freelance" && (
                <GlobalInput
                  inputType="time"
                  labelText="Stop Time"
                  inputName="endTime"
                  inputValue={values.endTime}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.endTime && touched.endTime}
                  errorMessage={errors.endTime}
                  required
                />
              )}
            </FormGroup>

            <Fields>
              <FormGroup columns="1" mb="24px" className="mt-2">
                <div>
                  <div className="description" id="workPref-radio-group">
                    {values.status === "Fulltime" && (
                      <span>Choose working day preference</span>
                    )}
                    {values.status === "Contract" && (
                      <span>Choose working day preference</span>
                    )}
                    {values.status === "Freelance" && (
                      <span>Choose working day preference</span>
                    )}
                  </div>
                  <div role="group" aria-labelledby="workPref-radio-group">
                    {values.status === "Fulltime" && (
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="workPref"
                          value={"weekDays"}
                          checked={values.workPref === "weekDays"}
                        />
                        Week days
                      </label>
                    )}
                    {values.status === "Contract" && (
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="workPref"
                          value={"weekDays"}
                          checked={values.workPref === "weekDays"}
                        />
                        Week days
                      </label>
                    )}
                    {values.status === "Contract" && (
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="workPref"
                          value={"weekEnd"}
                          checked={values.workPref === "weekEnd"}
                        />
                        Weekends
                      </label>
                    )}
                    {values.status === "Freelance" && (
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="workPref"
                          value={"custom"}
                          checked={values.workPref === "custom"}
                        />
                        Custom
                      </label>
                    )}
                    {errors.workPref && touched.workPref && (
                      <FieldError>{errors.workPref}</FieldError>
                    )}
                  </div>
                </div>
              </FormGroup>
              {values.workPref === "allDay" && (
                <div className=" d-flex gap-3 mt-3">
                  {weeksData?.data?.map((day) => (
                    <WeekDay key={day.id}>
                      <h4 className="fs-5 text-center pt-2 ">M</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {day.name}
                      </p>
                    </WeekDay>
                  ))}
                </div>
              )}
              {values.status === "Fulltime" &&
                values.workPref === "weekDays" && (
                  <div className=" d-flex gap-3 mt-3">
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">M</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[0].name}
                      </p>
                    </WeekDay>

                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">T</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[1].name}
                      </p>
                    </WeekDay>
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">W</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[2]?.name}
                      </p>
                    </WeekDay>
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">T</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[3].name}
                      </p>
                    </WeekDay>
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2">F</h4>
                      <p
                        className=" text-center text-muted mb-2 "
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[4].name}
                      </p>
                    </WeekDay>
                  </div>
                )}
              {values.status === "Contract" &&
                values.workPref === "weekDays" && (
                  <div className=" d-flex gap-3 mt-3">
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">M</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[0].name}
                      </p>
                    </WeekDay>

                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">T</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[1].name}
                      </p>
                    </WeekDay>
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">W</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[2]?.name}
                      </p>
                    </WeekDay>
                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2 ">T</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[3].name}
                      </p>
                    </WeekDay>

                    <WeekDay>
                      <h4 className="fs-5 text-center pt-2">F</h4>
                      <p
                        className=" text-center text-muted mb-2 "
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[4].name}
                      </p>
                    </WeekDay>
                  </div>
                )}
              {values.status === "Contract" &&
                values.workPref === "weekEnd" && (
                  <div className=" d-flex gap-3 mt-3">
                    <WeekendDay>
                      <h4 className="fs-5 text-center pt-2 ">S</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[5].name}
                      </p>
                    </WeekendDay>
                    <WeekendDay>
                      <h4 className="fs-5 text-center pt-2 ">S</h4>
                      <p
                        className=" text-center mb-2 text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {weeksData?.data[6].name}
                      </p>
                    </WeekendDay>
                  </div>
                )}
              {values.status === "Freelance" &&
                values.workPref === "custom" && (
                  <CheckBoxContainer>
                    {weeksData?.data.map((day) => (
                      <CheckBox key={day.id}>
                        <input
                          type="checkbox"
                          name={`days${day.id}`}
                          value={day.id}
                          checked={values.days.includes(day.id)}
                          onChange={() => {
                            const selectedDays = values.days.includes(day.id)
                              ? values.days.filter(
                                  (selectedDay) => selectedDay !== day.id
                                )
                              : [...values.days, day.id];
                            setFieldValue("days", selectedDays);
                          }}
                          onBlur={handleBlur}
                        />
                        <label>{day.name}</label>
                      </CheckBox>
                    ))}
                  </CheckBoxContainer>
                )}
            </Fields>
            <GlobalBtn
              type="submit"
              className="m-auto my-4"
              disabled={!values.status || !values.workPref}
            >
              {isSaving ? "Loading..." : "Save"}
            </GlobalBtn>
          </form>
        </section>
      )}
    </>
  );
};

export default WorkingPref;

const WeekDay = styled.div`
  width: 75px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #ffd4c1;
  @media only screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
  }
`;
const WeekendDay = styled.div`
  width: 75px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #e0e0e0;
  @media only screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
  }
`;
const CheckBox = styled.div`
  appearance: none;
  border: none;
  display: inline-flex;
  gap: 1rem;

  input[type="checkbox"] {
    width: 24px;
    aspect-ratio: 1;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
  }
  @media only screen and (max-width: 756px) {
    display: inline-flex;
    /* flex-direction: column; */
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
