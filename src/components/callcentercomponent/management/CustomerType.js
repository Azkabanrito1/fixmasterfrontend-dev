import { useState } from "react";
import { OptionsContainer } from "../../customercomponents/payment/PaymentUtilities";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import OptionsCArds from "./OptionsCArds";
import SelectCustomer from "./SelectCustomer";

const CustomerType = ({ isOpen, closeModal }) => {
  const [openIndividualModal, setOpenIndividualModal] = useState(false);

  const openIndividualModalHandler = () => {
    setOpenIndividualModal(true);
  };

  const closeIndividualModalHandler = () => setOpenIndividualModal(false);
  const options = [
    {
      id: 0,
      title: "Individual Customer",
      icon: "/images/individual.png",
      action: () => {
        openIndividualModalHandler("Book a fix");
      },
    },
    {
      id: 1,
      title: "Estates",
      icon: "/images/estate.png",
      action: () => {
        console.log("fix");
      },
    },
    {
      id: 2,
      title: "Commercial Customer",
      icon: "/images/commercial.png",
      action: () => {
        console.log("Book a fix");
      },
    },
  ];

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader
          heading="Please select Customer Type"
          closeModal={closeModal}
        />
        <OptionsContainer>
          {options.map((option) => {
            return <OptionsCArds options={option} key={option.id} />;
          })}
        </OptionsContainer>
      </GlobalModal>
      {openIndividualModal && (
        <SelectCustomer
          isOpen={openIndividualModal}
          closeModal={closeIndividualModalHandler}
        />
      )}
    </>
  );
};

export default CustomerType;

// const Container = styled.div`
//   display: grid;
// `;
