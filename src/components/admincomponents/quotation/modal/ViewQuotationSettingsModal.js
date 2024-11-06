import styled from "styled-components";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";

const ViewQuotationSettingsModal = ({ data, open, close }) => {
  return (
    <GlobalModal isOpen={open} closeModal={close} width="">
      <AltModalHeader closeModal={close} />
      <Container>
        <GlobalInput
          labelText="Material Markup (%)"
          inputValue={data?.materialMarkup}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Minimum Logistics Fee"
          inputValue={data?.minimumLogisticsFee}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Maximum Logistics Fee Percentage (%)"
          inputValue={data?.maximumLogisticsFee}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Logistics Fee Cap"
          inputValue={data?.logisticsFeeCap}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Minimum Royalty Fee"
          inputValue={data?.minRoyaltyFee}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Maximum Royalty Fee"
          inputValue={data?.maxRoyaltyFee}
          inputType="number"
          disabled={true}
        />
        <GlobalInput
          labelText="Royalty Fee Cap"
          inputName="royaltyCapFee"
          inputValue={data?.royaltyCapFee}
          inputType="number"
          min={0}
          disabled={true}
        />
        <GlobalInput
          labelText="Diagnonis Fee Percent (%)"
          inputName="diagnosisFeePercent"
          inputValue={data?.diagnosisFeePercent}
          inputType="number"
          disabled={true}
        />
      </Container>
    </GlobalModal>
  );
};
export default ViewQuotationSettingsModal;

const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
  column-gap: 30px;
  row-gap: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
