import { BsPlusCircle, BsTrash } from "react-icons/bs";
import {
  Fields,
  FormGroup,
  AdditionalBtn,
} from "../../../../../../globalcomponents/Utilities";
import GlobalTextArea from "../../../../../../globalcomponents/GlobalTextArea";
import { IconButton } from "@mui/material";

const DiagnosticFinding = ({ formHandler, alreadyAdded }) => {
  const { values, handleChange, addIssue, removeIssue, setComment, comment } =
    formHandler;

  const issuesTemplate = values?.map((value, index) => (
    <FormGroup columns="2" className="mb-1 pb-4" key={index}>
      <GlobalTextArea
        labelText={`Issue ${index + 1}`}
        inputName={`issues-${index}`}
        handleChange={handleChange}
        inputValue={value.issues}
        required={true}
        readOnly={alreadyAdded}
      />
      <GlobalTextArea
        labelText={`Recommendation ${index + 1}`}
        inputName={`recommendations-${index}`}
        handleChange={handleChange}
        inputValue={value.recommendations}
        required={true}
        readOnly={alreadyAdded}
      />

      {!alreadyAdded && (
        <IconButton
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            color: "var(--clr-primary)",
          }}
          onClick={() => removeIssue(index)}
          aria-label="delete"
        >
          <BsTrash fontSize={"1rem"} />
        </IconButton>
      )}
    </FormGroup>
  ));

  return (
    <Fields>
      {issuesTemplate}
      <FormGroup>
        <GlobalTextArea
          labelText={"Additional Comments"}
          inputName="comments"
          handleChange={(e) => setComment(e.target.value)}
          inputValue={comment}
          readOnly={alreadyAdded}
        />
      </FormGroup>
      {!alreadyAdded && (
        <AdditionalBtn onClick={addIssue}>
          Additional Issues <BsPlusCircle />
        </AdditionalBtn>
      )}
    </Fields>
  );
};

export default DiagnosticFinding;
