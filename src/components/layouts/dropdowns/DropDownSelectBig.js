import React from 'react';
import styled from 'styled-components';

function DropDownSelectBig(props) {

  return (
    <Container>
        <label>{props.labelTextDropDownSelectBg}</label>
        <div className="custom-select">
        <select name="select" id="select">
            <option selected="true" disabled="disabled">{props.selectTextDropDownSelectBg}</option>
            {props.optionsDropDownSelectBg.map((options) => (
            <option value={options.value}>{options.label}</option>
        ))}
        </select>
        </div>
    </Container>
  )
}

export default DropDownSelectBig;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 11.21px;
    width: 345.55px;
    height: 81px;

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
        width: 345.55px;
        height: 53px;
        
        border: 1px solid #8692A6;
        border-radius: 6px;
    }

    select:hover {
        
    }

    select:active {
        
    }

`
