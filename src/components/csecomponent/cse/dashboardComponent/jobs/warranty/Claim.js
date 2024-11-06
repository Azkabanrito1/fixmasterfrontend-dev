import { useFormik } from "formik";
import Valid from "./Valid";
import NotValid from "./NotValid";
import { Fields, FormGroup, SectionHeading} from "../../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";

const Claim = ({ fixId, logWarranty }) => {
  const onSubmit = (values) => {
    const payload = {
      fixId: Number(fixId),
      issuetype: values.issue,
      claimType: Boolean(values.userClaim),
      description: values.specifyIssue,
      recommendation: values.recommendation,
    };

    const payloads = {
      fixId: Number(fixId),
      issuetype: "",
      claimType: Boolean(values.userClaim),
      description: "",
      recommendation: "",
    };
    if (values.userClaim === "true") {
      logWarranty(payload);
    } else {
      logWarranty(payloads);
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userClaim: "",
      issue: "",
      specifyIssue: "",
      recommendation: "",
    },
    onSubmit,
  });

  const formHandler = { values, handleChange };
  return (
    <section className="mt-3">
      <SectionHeading>Observation from Visit</SectionHeading>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup>
            <div role="group" aria-labelledby="userClaim-radio-group">
              <input
                type="radio"
                name="userClaim"
                value={"true"}
                checked={values.userClaim === "true"}
                onChange={handleChange}
              />
              <label>Claim is Valid</label>

              <input
                type="radio"
                name="userClaim"
                value={""}
                checked={values.userClaim === ""}
                onChange={handleChange}
              />
              <label>Claim is not Valid</label>
            </div>
          </FormGroup>
        </Fields>
        {values.userClaim === "true" && <Valid formHandler={formHandler} />}
        {values.userClaim === "" && <NotValid formHandler={formHandler} />}
        {values.userClaim === "true" ? (
          <GlobalBtn className="m-auto mt-3" type="submit">
            Confirm
          </GlobalBtn>
        ) : (
          <GlobalBtn className="m-auto mt-3" type="submit">
            Confirm
          </GlobalBtn>
        )}
      </form>
    </section>
  );
};

export default Claim;
