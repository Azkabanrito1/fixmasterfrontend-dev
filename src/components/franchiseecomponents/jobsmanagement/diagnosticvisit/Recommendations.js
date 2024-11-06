import { BsPlusCircle } from "react-icons/bs";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import {
  AdditionalBtn,
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../globalcomponents/Utilities";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";

const Recommendation = () => {
  return (
    <section className="mb-5">
      <SectionHeading>Recommendation</SectionHeading>

      <Fields>
        <FormGroup columns="1" className="mb-3">
          <GlobalInput labelText="Recommendation 1" />
          <GlobalInput labelText="Recommendation 2" />
          <AdditionalBtn>
            Additional Issues <BsPlusCircle />
          </AdditionalBtn>

          <GlobalTextArea
            inputName="addComments"
            labelText={"Additional Comments"}
          />
        </FormGroup>

        <GlobalBtn mx="auto">Save</GlobalBtn>
      </Fields>
    </section>
  );
};

export default Recommendation;
