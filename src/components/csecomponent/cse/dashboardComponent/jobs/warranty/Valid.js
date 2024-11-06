import styled from "styled-components";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../../../../globalcomponents/Utilities";
import Labour from "./Labour";
import Part from "./Part";
import GlobalTextArea from "../../../../../globalcomponents/GlobalTextArea";

const Valid = ({ formHandler }) => {
  const { values, handleChange } = formHandler;

  return (
    <Container>
      <div className="d-flex gap-1 mb-4">
        <h2 className="blockquote ">Note:</h2>
        <p>
          By clicking 'Confirm' this fix status will be updated to ongoing fix
          and it will be reassigned to cse the same cse and Technician. If
          Technician is not available, you can assign a new Technician for this
          fix.
        </p>
      </div>
      <Fields>
        <FormGroup columns="1">
          <div>
            <GroupHeading>
              Please identify where the issue is coming from
            </GroupHeading>
            <div role="group" aria-labelledby="issue-radio-group">
              <input
                type="radio"
                name="issue"
                value="Labour"
                checked={values.issue === "Labour"}
                onChange={handleChange}
              />
              <label>Labour issue</label>

              <input
                type="radio"
                name="issue"
                value="Part"
                checked={values.issue === "Part"}
                onChange={handleChange}
              />
              <label>Part issue</label>
            </div>
          </div>
        </FormGroup>
      </Fields>
      {values.issue === "labour" && <Labour />}
      {values.issue === "part" && <Part />}
      <FormGroup columns="1" style={{ marginTop: "20px" }}>
        <GlobalTextArea
          fullWidth={true}
          labelColor="#000000"
          labelText={"If the claim is valid, Please clearly specify the issue"}
          inputValue={values.specifyIssue}
          handleChange={handleChange}
          inputName="specifyIssue"
        />

        <GlobalTextArea
          fullWidth={true}
          labelColor="#000000"
          labelText={
            "If the claim is valid, Please clearly specify your recommendation"
          }
          inputValue={values.recommendation}
          handleChange={handleChange}
          inputName="recommendation"
        />
      </FormGroup>
    </Container>
  );
};

export default Valid;

const Container = styled.div`
  padding: 1rem;
`;
