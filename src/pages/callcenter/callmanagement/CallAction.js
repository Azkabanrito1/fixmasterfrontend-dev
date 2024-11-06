import { useState } from "react";
import { CallContainer } from "../../../components/callcentercomponent/dashboardcomponent/CallCard";
import SingleCallCard from "../../../components/callcentercomponent/dashboardcomponent/SingleCallCard";
import CustomerType from "../../../components/callcentercomponent/management/CustomerType";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";

const CallAction = () => {
  const [openCustomerType, setOpenCustomerType] = useState(false);

  const openCustomerTypeHandler = () => {
    setOpenCustomerType(true);
  };

  const closeCustomerTypeHandler = () => setOpenCustomerType(false);

  const actions = [
    {
      id: 0,
      icon: "/images/bookafix.png",
      title: "Book A Fix",
      description: "Book a fix for customers, estate, commercial customers",
      to: "/call-center/call-actions",
      notificationCount: null,
      color: "#f37238",
    },
    {
      id: 1,
      icon: "/images/callAction.png",
      title: "Comments",
      description:
        "Record customer's complaints, suggestion and recommendations",
      notificationCount: null,
      color: "#f37238",
    },
  ];

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Call Actions</PageHeading>
      </div>
      <CallContainer>
        {actions.map((call) => {
          return (
            <SingleCallCard
              key={call.id}
              call={call}
              openCustomerType={openCustomerTypeHandler}
            />
          );
        })}
      </CallContainer>
      {openCustomerType && (
        <CustomerType
          isOpen={openCustomerType}
          closeModal={closeCustomerTypeHandler}
        />
      )}
    </>
  );
};

export default CallAction;
