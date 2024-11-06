import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalInput from "../../globalcomponents/GlobalInput";
import styled from "styled-components";
import { getToday } from "../../../utils/dateRanges";
import {
  useGetBookingType,
  useGetFixCategories,
  useGetFixClass,
} from "../../../hooks/useQueries/useJobs";

const BookingInfo = ({ formikHandlers, mode, timeBounds, setTimeBounds }) => {
  const { data: bookingTypeData } = useGetBookingType();
  const { data: bookingClassData } = useGetFixClass();
  const { data: bookingCategoryData } = useGetFixCategories();

  const [isFixToday, setIsFixToday] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formikHandlers;

  // add offsets to the time when booking is made for today
  const calcTimeOffset = (offset) => {
    const now = new Date();

    if (now.getHours() + offset > 23) {
      if (now.getMinutes() + 10 > 59) {
        return "00:10";
      }
      return `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes() + 10
      ).padStart(2, "0")}`;
    }
    return `${String(now.getHours() + offset).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    const bookingType = bookingTypeData?.data?.filter(
      (type) => type.id === Number(values.bookingInfo.bookingType)
    );
    if (bookingType?.length > 0) {
      setTimeBounds({
        min: bookingType[0].startTime.slice(0, 5),
        max: bookingType[0].endTime.slice(0, 5),
      });
    }
  }, [
    values.bookingInfo.bookingType,
    values.bookingInfo.bookingTime,
    bookingTypeData,
  ]);

  // console.log(bookingTypeData?.data);

  return (
    <Collapsible
      trigger={
        <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="heading">Booking Information</h3>
            <p className="sub-heading">
              Tell us about what you want us to do for you
            </p>
          </div>
          <i className="fas fa-chevron-right collapsible-icon"></i>
        </StyledCollapsible>
      }
    >
      <div className="px-2">
        <Fields>
          <FormGroup columns="2">
            {mode === "booking" ? (
              <>
                <GlobalSelect
                  labelText="Booking Type"
                  descriptionText="Tell us the service you want"
                  labelColor="var(--clr-primary)"
                  defaultOption="Select a booking type"
                  options={bookingClassData?.data}
                  selectValue={values.bookingInfo.bookingClass}
                  selectName="bookingInfo.bookingClass"
                  error={
                    errors.bookingInfo?.bookingClass &&
                    touched.bookingInfo?.bookingClass
                  }
                  errorMessage={errors.bookingInfo?.bookingClass}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  required={true}
                />
                <GlobalSelect
                  labelText="Service Type"
                  descriptionText="Tell us when you want the service delivered"
                  labelColor="var(--clr-primary)"
                  defaultOption={"Select a service type"}
                  options={bookingTypeData?.data}
                  selectValue={values.bookingInfo.bookingType}
                  selectName="bookingInfo.bookingType"
                  error={
                    errors.bookingInfo?.bookingType &&
                    touched.bookingInfo?.bookingType
                  }
                  errorMessage={errors.bookingInfo?.bookingType}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  required={true}
                />
                <GlobalSelect
                  labelText="Booking Category"
                  labelColor="var(--clr-primary)"
                  defaultOption="Select a booking category"
                  options={bookingCategoryData?.data}
                  selectValue={values.bookingInfo.bookingCategory}
                  selectName="bookingInfo.bookingCategory"
                  error={
                    errors.bookingInfo?.bookingCategory &&
                    touched.bookingInfo?.bookingCategory
                  }
                  errorMessage={errors.bookingInfo?.bookingCategory}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  required={true}
                />
              </>
            ) : (
              <>
                <GlobalInput
                  labelText="Service Type"
                  labelColor="var(--clr-primary)"
                  inputValue={values.bookingInfo?.bookingType}
                  inputName="bookingInfo.bookingType"
                  readOnly={true}
                  disabled
                />
                <GlobalInput
                  labelText="Booking Type"
                  labelColor="var(--clr-primary)"
                  inputValue={values.bookingInfo?.bookingClass}
                  inputName="bookingInfo.bookingClass"
                  iconSrc={"/images/readOnlyLock.svg"}
                  readOnly={true}
                  disabled
                />
                <GlobalInput
                  labelText="Booking Category"
                  labelColor="var(--clr-primary)"
                  inputValue={values.bookingInfo?.bookingCategory}
                  inputName="bookingInfo.bookingCategory"
                  iconSrc={"/images/readOnlyLock.svg"}
                  readOnly={true}
                  disabled
                />
              </>
            )}

            <div>
              <label
                style={{
                  color: "var(--clr-primary)",
                  marginBottom: "8px",
                  lineHeight: "20px",
                }}
              >
                Specify a suitable date & time for your fix
              </label>
              <FormGroup columns="2" gap="1rem">
                <GlobalInput
                  inputType="date"
                  inputPlaceholder={"Date"}
                  inputValue={values.bookingInfo.bookingDate}
                  inputName="bookingInfo.bookingDate"
                  error={
                    errors.bookingInfo?.bookingDate &&
                    touched.bookingInfo?.bookingDate
                  }
                  errorMessage={errors.bookingInfo?.bookingDate}
                  handleChange={(e) => {
                    handleChange(e);
                    if (e.target.value === getToday()) {
                      const newTime = calcTimeOffset(1);
                      setFieldValue("bookingInfo.bookingTime", newTime);
                      setIsFixToday(true);
                    } else {
                      setIsFixToday(false);
                    }
                  }}
                  handleBlur={handleBlur}
                  required={true}
                  min={getToday()}
                />
                {!isFixToday && (
                  <GlobalInput
                    inputType="time"
                    inputPlaceholder={"Time"}
                    inputValue={values.bookingInfo.bookingTime}
                    inputName="bookingInfo.bookingTime"
                    error={
                      errors.bookingInfo?.bookingTime &&
                      touched.bookingInfo?.bookingTime
                    }
                    errorMessage={errors.bookingInfo?.bookingTime}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    min={timeBounds?.min}
                    max={timeBounds?.max}
                  />
                )}
              </FormGroup>
            </div>
          </FormGroup>
          {isFixToday && (
            <p className="text-danger text-center mt-4">
              FixMaster cannot guarantee a fix time for the fix to be carried
              out if you want it to be done today. However, we will do our best
              to make it timely.
            </p>
          )}
        </Fields>
      </div>
    </Collapsible>
  );
};

export default BookingInfo;

export const StyledCollapsible = styled.div`
  border-bottom: 1px dashed var(--clr-primary);

  .heading {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
