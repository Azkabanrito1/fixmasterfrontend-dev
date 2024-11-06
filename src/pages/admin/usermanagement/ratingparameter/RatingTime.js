import Collapsible from "react-collapsible";
import { Container } from "../onboardingrequirement/VideoHome";
import {
  FormGroup,
  SectionHeading,
} from "../../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import { useState } from "react";

const RatingTime = () => {
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!setting) {
      setError("Please provide a setting");
    }
    const payload = { setting };
    console.log(payload);
  };
  return (
    <Container>
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            Ratings Settings
            {/* <span className="text-muted">Ratings grading parameters</span> */}
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <span>Ratings computation time</span>
        <FormGroup columns="3">
          <GlobalInput
            inputName="setting"
            inputValue={setting}
            handleChange={(e) => setSetting(e.target.value)}
            errorMessage={error}
            error={error}
            labelText="Please enter the ratings computation time"
            placeholder="Please enter Time"
            required
          />
        </FormGroup>

        <GlobalBtn className="m-auto mt-3" type="button" onClick={handleSubmit}>
          Save
        </GlobalBtn>
      </Collapsible>
    </Container>
  );
};

export default RatingTime;
