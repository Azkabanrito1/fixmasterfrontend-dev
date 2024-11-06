import React from "react";
import styled from "styled-components";

function BillingAddress({ userCards }) {
  return (
    <div className="mt-5">
      <h3 className="fw-bold mb-3">Billing Address</h3>
      {userCards &&
        Object.values(userCards).map((card, index) => {
          return (
            card.isDefault && (
              <AddressOne key={index}>
                <h4>Address Line 1 </h4>
                <p>{card.billingAddress}</p>
              </AddressOne>
            )
          );
        })}
      {userCards &&
        Object.values(userCards).map((card, index) => {
          return (
            card.isDefault === false && (
              <AddressOne key={index}>
                <h4>Address Line 2 </h4>
                <p>{card.billingAddress}</p>
              </AddressOne>
            )
          );
        })}
    </div>
  );
}

export default BillingAddress;

const AddressOne = styled.div`
  margin-top: 30px;
  border-bottom: 1px solid #ccc;

  h4 {
    font-weight: bold;
    font-size: 16px;
  }

  & p {
    margin-top: 13px;
    font-size: 16px;
  }
`;
