import { useState } from "react";
import styled from "styled-components";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";

const CustomerCompletion = () => {
  const [complete, setComplete] = useState("");
  const handleChange = (e) => {
    setComplete(e.target.value);
  };
  return (
    <section>
      <SectionHeading>Customer Completion Acceptance</SectionHeading>
      <InputField>
        <input
          type="checkbox"
          name="check"
          value={complete}
          onChange={handleChange}
        />
        <label>Customer has accepted fix completion</label>
      </InputField>
    </section>
  );
};

export default CustomerCompletion;

const InputField = styled.div`
  input {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
    margin-top: 3px;
  }
  input:checked {
    background-color: var(--clr-primary);
  }
  label {
    font-size: 20px;
    line-height: 1.2rem;
    margin-bottom: 5px;
  }
`;
