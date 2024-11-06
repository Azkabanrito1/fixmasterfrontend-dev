import { BsPlusCircle } from "react-icons/bs";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import {
  AdditionalBtn,
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../globalcomponents/Utilities";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";

const DiagnosticFinding = () => {
  return (
    <section className="mb-5">
      <SectionHeading>Diagnostics Findings</SectionHeading>

      <Fields>
        <FormGroup columns="1" className="mb-3">
          <GlobalInput labelText="Issue Identified 1" />
          <GlobalInput labelText="Issue Identified 2" />
          <AdditionalBtn>
            Additional Issues <BsPlusCircle />
          </AdditionalBtn>
        </FormGroup>

        <GlobalBtn mx="auto">Save</GlobalBtn>
      </Fields>
    </section>
  );
};

export default DiagnosticFinding;
