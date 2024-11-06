import { useFormik } from "formik";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../../../../../globalcomponents/GlobalTextArea";
import { Fields, FormGroup } from "../../../../../globalcomponents/Utilities";

const ExtendedDiagnosticTime = ({
  isOpen,
  closeModal,
  respond,
  fixId,
  isExtendingTime,
}) => {
  const onSubmit = (values) => {
    const payload = {
      fixId,
      extendTime: values.time || 0,
      extensionReason: values.reasons,
      extendTImeNeeded: values.fix.toLowerCase() === "yes" ? true : false,
    };
    respond(payload);
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      time: "",
      fix: "",
      reasons: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={"Extended Diagnostic Time"}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="1" className="mb-3">
            <div>
              <p>Do you want to extend time for fix diagnosis?</p>
              <div role="group" aria-labelledby="fix-radio-group">
                <label>
                  <input
                    type="radio"
                    name="fix"
                    id="fix"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={"Yes"}
                    checked={values.fix === "Yes"}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="fix"
                    id="fix"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={"No"}
                    checked={values.fix === "No"}
                  />
                  No
                </label>
              </div>
            </div>
          </FormGroup>
          {values.fix === "Yes" && (
            <FormGroup columns="1">
              <GlobalInput
                inputType="number"
                inputName={"time"}
                labelText="Please specify the extra time reqiured to complete diagnosis"
                descriptionText="Each diagnosis is allocated for a maximum of 60 minutes. Indicate how much more your need"
                inputValue={values.time}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required
              />

              <GlobalTextArea
                inputName="reasons"
                labelText={
                  "If yes, please specify your reasons diagnosis time extension"
                }
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </FormGroup>
          )}
        </Fields>
        <GlobalBtn mx="auto" type="submit" disabled={isExtendingTime}>
          Submit
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default ExtendedDiagnosticTime;
