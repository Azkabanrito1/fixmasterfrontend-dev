import {
  FormGroup,
  GroupHeading,
} from "../../../../../globalcomponents/Utilities";

const Part = () => {
  return (
    <>
      <FormGroup columns="1">
        <GroupHeading>
          Would it be fixed by the supplier(s) who handled the fix or a new
          supplier(s)
        </GroupHeading>
        <div>
          <input type="radio" name="labour" value="labour" />
          <label>
            Fix will be taken of by the supplier(s) who handled the supply
          </label>
        </div>
      </FormGroup>
      <FormGroup>
        <div>
          <input type="radio" name="part" value="part" />
          <label>Fix wii be assigned to new supplier(s)</label>
        </div>
      </FormGroup>
    </>
  );
};

export default Part;
