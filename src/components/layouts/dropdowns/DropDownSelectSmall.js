import React from 'react';
import styled from 'styled-components';

function DropDownSelectSmall(props) {

  return (
    <Container>
        <label>{props.labelTextDropDownSelectSm}</label>
        <div className="custom-select">
        <select name="cars" id="cars">
            <option selected="true" disabled="disabled">select</option>
            {props.optionsDropDownSelectSm.map((options) => (
            <option value={options.value}>{options.label}</option>
        ))}
        </select>
        </div>
    </Container>
  )
}

export default DropDownSelectSmall;

const Container = styled.div`
    width: 163.55px;
    height: 80px;
    display: flex;
    flex-direction: column;
    gap: 11.21px;

    label {
        width: 110px;
        height: 16px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;

        color: #696F79;
    }

    select {
        padding-left: 25px;
        width: 163.55px;
        height: 53px;
        
        border: 1px solid #8692A6;
        border-radius: 6px;
    }

    select:hover {
        
    }

    select:active {
        
    }

`
