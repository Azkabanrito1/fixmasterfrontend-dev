import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../globalcomponents/Utilities";

const QAMasterRequest = () => {
  return (
    <section className="mb-5">
      <SectionHeading>QA Master Request</SectionHeading>

      <Fields>
        <FormGroup className="mb-3" columns="2">
          <GlobalSelect labelText="Select QA Master Category" />
        </FormGroup>

        <h3 className="text-muted" style={{ fontSize: "1rem" }}>
          QA Master
        </h3>
        <FormGroup columns="6">
          <div></div>
        </FormGroup>

        <GlobalTextArea
          inputName={"detailedReview"}
          labelText={"Detailed Review"}
        />
      </Fields>
    </section>
  );
};

export default QAMasterRequest;
