import SupplyReq from "./SupplyReq";
import RequestForm from "./RequestForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useReducer } from "react";
// import { getSupplierRequest } from "../../../../../redux/user/actions";
import useFetch from "../../../../../hooks/useFetch";

const SupplyHome = () => {
  const getSupplierRequest = [
    {
      id: 0,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 1,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 2,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 3,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 4,
      class: "ref",
      type: "fast",
      category: "exp",
    },
  ];
  const { fixId } = useParams();

  const supplyState = {
    requestSupply: false,
    isSupplyOpen: false,
  };
  const supplyReducer = (state = supplyState, action) => {
    switch (action.type) {
      case "openSupplyModal":
        return {
          ...state,
          isSupplyOpen: true,
        };
      case "closeSupplyModal":
        return {
          ...state,
          isSupplyOpen: false,
        };

      default:
        return state;
    }
  };
  const [supplyInfo, setSupplyInfo] = useReducer(supplyReducer, supplyState);

  // const reguestSupplyItem = useFetch({
  //   action: getSupplierRequest,
  //   args: fixId,
  // });

  return (
    <>
      <SupplyReq
        // reguestSupplyItem={reguestSupplyItem}
        openSupplyModal={() => setSupplyInfo({ type: "openSupplyModal" })}
      />
      {supplyInfo.isSupplyOpen && (
        <SupplyReq
          isOpen={supplyInfo.isSupplyOpen}
          // reguestSupplyItem={reguestSupplyItem}
          closeModal={() => setSupplyInfo({ type: "closeSupplyModal" })}
        />
      )}
    </>
  );
};

export default SupplyHome;
