import { useState } from "react";
import styled from "styled-components";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetQuotationParamsSettings } from "../../../hooks/useQueries/useAdmin";
import CreateLogisticsSettings from "./modal/CreateLogisticsSettings";
import LogisiticsCard from "./LogisticsCards";

const LogisticsHome = () => {
  const { data: labourData, isLoading: labourLoading } =
    useGetQuotationParamsSettings(1);
  const { data: materialData, isLoading: materialLoading } =
    useGetQuotationParamsSettings(2);
  const show =
    labourData?.parameters?.length === 0 ||
    materialData?.parameters?.length === 0 ||
    labourData?.parameters[0]?.minimumLogisticsFee === 0 ||
    materialData?.parameters[0]?.materialMarkup === 0;
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <BackBtn />
      <BtnContainer className="mt-5">
        <PageHeading className="ps-3">Logisitics Settings</PageHeading>
        {show && (
          <GlobalBtn
            className="btn"
            onClick={() => {
              setOpenModal(true);
            }}
            mx="max-content"
            width="max-content"
            height="auto"
            py="14px"
          >
            Create Logistics settings
          </GlobalBtn>
        )}
      </BtnContainer>
      <GlobalBallBeat loading={labourLoading && materialLoading} />
      {!labourLoading &&
        !materialLoading &&
        labourData?.parameters?.length !== 0 &&
        materialData?.parameters?.length !== 0 && (
          <LogisiticsCard
            labourData={labourData?.parameters}
            materialData={materialData?.parameters}
          />
        )}
      {!labourLoading &&
        !materialLoading &&
        labourData?.parameters?.length === 0 &&
        materialData?.parameters?.length === 0 && (
          <p className={{ textAlign: "center" }}>No records available</p>
        )}
      {openModal && (
        <>
          <CreateLogisticsSettings
            loading={labourLoading && materialLoading}
            labourData={labourData?.parameters}
            materialData={materialData?.parameters}
            open={openModal}
            close={() => setOpenModal(false)}
          />
        </>
      )}
    </>
  );
};
export default LogisticsHome;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;