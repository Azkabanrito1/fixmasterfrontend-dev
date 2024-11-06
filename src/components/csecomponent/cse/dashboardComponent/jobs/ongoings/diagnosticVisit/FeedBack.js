import styled from "styled-components";
import { useFormik } from "formik";
import TechnicianRating from "./TechnicianRating";
import CustomerRating from "./CustomerRating";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";

const FeedBack = () => {
  const { values, handleChange } = useFormik({
    initialValues: {
      user: "",
    },
  });
  return (
    <section className="mt-3">
      <SectionHeading>Feedback & Ratings</SectionHeading>
      <div className="d-flex gap-5">
        <RadioButton>
          <input
            name="user"
            type="radio"
            value="customer"
            checked={values.user === "customer"}
            onChange={handleChange}
          />
          <label htmlFor="user">Customer</label>
        </RadioButton>

        <RadioButton>
          <input
            name="user"
            type="radio"
            value="technician"
            checked={values.user === "technician"}
            onChange={handleChange}
          />
          <label htmlFor="user">Technician</label>
        </RadioButton>

        <RadioButton>
          <input
            name="user"
            type="radio"
            value="qaMaster"
            checked={values.user === "qaMaster"}
            onChange={handleChange}
          />
          <label htmlFor="user">QA Master</label>
        </RadioButton>
      </div>
      {values.user === "technician" ? <TechnicianRating /> : null}
      {values.user === "customer" ? <CustomerRating /> : null}
    </section>
  );
};

export default FeedBack;

const RadioButton = styled.div`
  input {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
    margin-top: 3px;
  }
  label {
    font-family: 20px;
    font-weight: 800px;
    margin-bottom: 5px;
  }
`;
