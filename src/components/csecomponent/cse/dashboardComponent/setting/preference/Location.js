import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import { SectionHeading } from "../../../../../globalcomponents/Utilities";
import AddressInfoFormGroup from "../../../../../globalcomponents/globalformgroups/AddressInformation";

const Location = ({
  formikHandler,
  inputName,
  inputRef,
  onSubmit,
  value,
  isSaving,
}) => {
  return (
    <section>
      <SectionHeading>Location Preference</SectionHeading>
      <form onSubmit={onSubmit}>
        <AddressInfoFormGroup
          formikHandlers={formikHandler}
          inputNames={inputName}
          columns={3}
          withLocation={true}
          inputRef={inputRef}
        />
        <GlobalBtn type="submit" className="m-auto my-3" disabled={!value.city}>
          {isSaving ? "Loading ...." : "Save"}
        </GlobalBtn>
      </form>
    </section>
  );
};

export default Location;
