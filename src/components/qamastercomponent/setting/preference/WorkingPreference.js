import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import styled from "styled-components";
import { FormGroup, SectionHeading } from "../../../globalcomponents/Utilities";

const WorkingPref = ({ handleFormik }) => {
  const time = [
    {
      id: 1,
      name: "9hours",
    },
    {
      id: 2,
      name: "8hours",
    },
    {
      id: 3,
      name: "10hours",
    },
    {
      id: 4,
      name: "10hours",
    },
  ];

  const { values, handleChange, touched, handleBlur, errors } = handleFormik;

  return (
    <section>
      <SectionHeading>Working Preference</SectionHeading>
      <FormGroup columns="3">
        <GlobalSelect
          options={time}
          labelText="Status *"
          defaultOption="Fulltime"
          handleChange={handleChange}
          handleBlur={handleBlur}
          selectName="time"
          errorMessage={errors.time}
          error={errors.time && touched.time}
        />

        <GlobalInput
          inputType="text"
          labelText="Clock in *"
          inputName="clockIn"
          inputPlaceholder="9am"
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errors.clockIn}
          error={errors.clockIn && touched.clockIn}
        />
        <GlobalInput
          inputType="text"
          labelText="Clock out *"
          inputName="clockOut"
          inputPlaceholder="12pm"
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errors.clockOut}
          error={errors.clockOut && touched.clockOut}
        />
      </FormGroup>

      <div className="mt-3">
        <p className="text-muted fs-5">Choose working day preference</p>
        <div className="d-flex gap-3">
          <CheckBox className="d-flex gap-3 text-muted">
            <input
              type="checkbox"
              name="allDays"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.allDays}
              errorMessage={errors.allDays}
              error={errors.allDays && touched.allDays}
            />
            <label>All days</label>
          </CheckBox>

          <CheckBox className="d-flex gap-3 text-muted">
            <input
              type="checkbox"
              name="weekDay"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.weekDay}
              errorMessage={errors.weekDay}
              error={errors.weekDay && touched.weekDay}
            />
            <label>Week days</label>
          </CheckBox>

          <CheckBox className="d-flex gap-3 text-muted">
            <input
              type="checkbox"
              name="weekEnd"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.weekEnd}
              errorMessage={errors.weekEnd}
              error={errors.weekEnd && touched.weekEnd}
            />
            <label>Weekends</label>
          </CheckBox>

          <CheckBox className="d-flex gap-3 text-muted">
            <input
              type="checkbox"
              name="custom"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.custom}
              errorMessage={errors.custom}
              error={errors.custom && touched.custom}
            />
            <label>Custom</label>
          </CheckBox>
        </div>
        <div className="p-2 d-flex gap-3 mt-3">
          <WeekDay>
            <h4 className="fs-5 text-center pt-2 ">M</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              MON
            </p>
          </WeekDay>
          <WeekDay>
            <h4 className="fs-5 text-center pt-2 ">T</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              TUE
            </p>
          </WeekDay>
          <WeekDay>
            <h4 className="fs-5 text-center pt-2 ">W</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              WED
            </p>
          </WeekDay>
          <WeekDay>
            <h4 className="fs-5 text-center pt-2 ">T</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              THU
            </p>
          </WeekDay>
          <WeekDay>
            <h4 className="fs-5 text-center pt-2">F</h4>
            <p
              className=" text-center text-muted mb-2 "
              style={{ fontSize: "10px" }}
            >
              FRI
            </p>
          </WeekDay>
          <WeekendDay>
            <h4 className="fs-5 text-center pt-2 ">S</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              SAT
            </p>
          </WeekendDay>
          <WeekendDay>
            <h4 className="fs-5 text-center pt-2 ">S</h4>
            <p
              className=" text-center mb-2 text-muted"
              style={{ fontSize: "10px" }}
            >
              SUN
            </p>
          </WeekendDay>
        </div>
      </div>
    </section>
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
  height: 75px;
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

  input[type="checkbox"] {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
  }
  @media only screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
  }
`;
