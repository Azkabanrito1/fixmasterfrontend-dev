import { BsPlusCircle } from "react-icons/bs";
import { SectionHeading } from "../../../../../../../pages/franchisee/jobs/MyJobDetails";
import GlobalInput from "../../../../../../globalcomponents/GlobalInput";
import {
  Fields,
  FormGroup,
  AdditionalBtn,
  GroupHeading,
} from "../../../../../../globalcomponents/Utilities";
import GlobalTextArea from "../../../../../../globalcomponents/GlobalTextArea";

const Recommendation = ({formikHandle}) => {
  const {values, handleChange, handleBlur} = formikHandle
  return (
      <Fields>
        <GroupHeading>Recommendation</GroupHeading>
        <FormGroup columns="1" className="mb-3">
        <GlobalInput
            labelText="Recommendation 1"
            inputName="recommendation1"
            inputValue={values.recommendation1}
            inputType="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <GlobalInput 
          labelText="Recommendation 2"
          inputName="recommendation2"
            inputValue={values.recommendation2}
            inputType="text"
            handleChange={handleChange}
            handleBlur={handleBlur}
           />
          <AdditionalBtn>
            Additional Issues <BsPlusCircle />
          </AdditionalBtn>

          <GlobalTextArea
            inputName="additionalRec"
            labelText={"Additional Comments"}
            inputValue={values.additionalRec}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </FormGroup>
      </Fields>
   
  );
};

export default Recommendation;
