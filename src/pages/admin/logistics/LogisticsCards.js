import { styled } from "@mui/system";
import {
  AddressCards,
  CardContainer,
} from "../../../components/suppliercomponent/setting/AddressCard";
import { Fragment, useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import LabourLogisticsModal from "./modal/MaterialLogisticsModal";
import MaterialLogisticsModal from "./modal/LabourLogisticsModal";

const LogisiticsCard = ({ labourData, materialData }) => {
  return (
    <Container>
      {labourData[0]?.minimumLogisticsFee !== 0 && (
        <Card title="Labour" data={labourData} />
      )}
      {materialData[0]?.materialMarkup !== 0 && (
        <Card title="Material" data={materialData} />
      )}
    </Container>
  );
};

export default LogisiticsCard;

const Card = ({ data, title }) => {
  const [edit, setEdit] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = data?.findIndex((x) => x.id === value);
    setActiveApplicant(data[applicantIndex]);
  };
  const updateQuoteSettings = (id) => {
    setEdit(true);
    getActiveApplicant(id);
  };
  const actions = [
    {
      id: 1,
      name: "Edit details",
      action: () => updateQuoteSettings(data[0]?.id),
    },
  ];
  return (
    <>
      <CardCategory key={data[0]?.id}>
        <header className="d-flex justify-content-between ">
          <h3>{title} Logistics</h3>
          <GlobalTableActions actions={actions} id={data?.id} />
        </header>

        <div className="body">
          <Fragment>
            {data[0]?.minimumLogisticsFee !== 0 && (
              <div className="d-flex justify-content-between p-2">
                <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                  Minimum Logistics Fee
                </h3>
                <p>{data[0]?.minimumLogisticsFee}</p>
              </div>
            )}
            {data[0]?.maximumLogisticsFee !== 0 && (
              <div className="d-flex justify-content-between p-2">
                <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                  Maximum Logistics Fee
                </h3>
                <p>{data[0]?.maximumLogisticsFee}</p>
              </div>
            )}
            {data[0]?.logisticsFeeCap !== 0 && (
              <div className="d-flex justify-content-between p-2">
                <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                  Logistics Fee (%)
                </h3>
                <p>{data[0]?.logisticsFeeCap}</p>
              </div>
            )}
            {data[0]?.materialMarkup !== 0 && (
              <div className="d-flex justify-content-between p-2">
                <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                  {data[0]?.material_fee_type === 1
                    ? "Material Markup (%)"
                    : "Material Markup"}
                </h3>
                <p>{data[0]?.materialMarkup}</p>
              </div>
            )}
            {data[0]?.material_fee_type !== 0 && (
              <div className="d-flex justify-content-between p-2">
                <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                  Material Fee type
                </h3>
                <p>
                  {data[0]?.material_fee_type === 1
                    ? "Percentage"
                    : "Flat rate"}
                </p>
              </div>
            )}
          </Fragment>
        </div>
      </CardCategory>
      {edit && title.toLowerCase() === "material" && (
        <LabourLogisticsModal
          open={edit}
          close={() => setEdit(false)}
          data={activeApplicant}
        />
      )}
      {edit && title.toLowerCase() === "labour" && (
        <MaterialLogisticsModal
          open={edit}
          close={() => setEdit(false)}
          data={activeApplicant}
        />
      )}
    </>
  );
};

const CardCategory = styled(AddressCards)`
  background-color: ${({ status }) =>
    status?.toLowerCase() === "inactive" ? "red" : "white"};

  header {
    background-color: transparent;
    color: #222222;
    h3 {
      font-size: 1.4rem;
    }
  }
`;

const Container = styled(CardContainer)`
  position: relative;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
