import React from "react";
import styled from "styled-components";

function DropDownSemi(props) {
  return (
    <Container>
      <label>{props.labelText}</label>
      <div className="custom-select">
        <select
          onChange={(e) => {
            props.onSelect(e.target.value);
          }}
        >
          <option selected="true" disabled="disabled">
            select
          </option>
          {props.optionsDropDownSelect.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </Container>
  );
}

export default DropDownSemi;

const Container = styled.div`
  width: 320px;
  height: 81px;
  display: flex;
  flex-direction: column;
  gap: 11.21px;

  && label {
    height: 16px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: var(--clr-primary);
  }

  select {
    padding-left: 25px;

    width: 320px;
    height: 53px;
    font-size: 20px;

    border: 1px solid #8692a6;
    border-radius: 6px;
  }

  select:hover {
  }

  select:active {
  }
`;
