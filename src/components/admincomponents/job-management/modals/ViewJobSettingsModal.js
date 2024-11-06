import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";

const ViewJobSettingsModal = ({ data, open, close, heading }) => {
  return (
    <>
      <GlobalModal isOpen={open} closeModal={close}>
        <AltModalHeader closeModal={close} heading={heading} />
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Technician Maximum Distance"
              inputType="number"
              inputValue={data?.techMaxDist}
              width="100%"
              disabled={true}
            />
            <GlobalInput
              labelText="Job Advance Wait Time"
              inputType="number"
              width="100%"
              inputValue={data?.jobAdvWaitTime}
              disabled={true}
            />
            <GlobalInput
              width="100%"
              labelText="Job Advance Escape Time"
              inputType="number"
              inputValue={data?.jobAdvEscTime}
              disabled={true}
            />
            <GlobalInput
              labelText="RFQ Advance Wait Time Level 1"
              inputType="number"
              inputValue={data?.rfqAdvWaitTimeLV1}
              width="100%"
              disabled={true}
            />
            <GlobalInput
              labelText="RFQ Advance Wait Time Level 2"
              inputType="number"
              width="100%"
              inputValue={data?.rfqAdvWaitTimeLV2}
              max="60"
              min="0"
              disabled={true}
            />
            <GlobalInput
              width="100%"
              labelText="RFQ Advance Wait Time Level 3"
              inputType="number"
              inputValue={data?.rfqAdvWaitTimeLV3}
              disabled={true}
            />
            <GlobalInput
              labelText="Job Priority Mininimum Rating"
              inputType="number"
              inputValue={data?.jobPrtyMinRating}
              width="100%"
              disabled={true}
            />{" "}
            <GlobalInput
              labelText="RFQ Priority Minimum Rating"
              inputType="number"
              width="100%"
              inputValue={data?.rfqPrtyMinRating}
              disabled={true}
            />
            <GlobalInput
              width="100%"
              labelText="Supplier Maximum Distance"
              inputType="number"
              inputValue={data?.supplierMaxDistance}
              disabled={true}
            />
          </FormGroup>
        </Fields>
      </GlobalModal>
    </>
  );
};
export default ViewJobSettingsModal;
