import React, { useState } from "react";
import styled from "styled-components";

function TimePicker(props) {
  return (
    <Container>
      <input type="time" placeholder="Time" onChange={props.onChange} />
      <img src="/images/timeVectr.svg" alt="" />
    </Container>
  );
}

export default TimePicker;

const Container = styled.div`
  position: relative;
  && input {
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    gap: 18px;

    width: 166px;
    height: 56px;

    border: 1px solid #a1a1a1;
    border-radius: 8px;

    flex: none;
    order: 0;
    flex-grow: 0;

    font-size: 14px;
  }

  input[type="time"] {
    position: relative;
  }

  input[type="time"]:before {
    content: attr(placeholder);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    color: rgba(0, 0, 0, 0.65);
    pointer-events: none;
    line-height: 1.5;
    padding: 0 0.5rem;
  }

  input[type="time"]:focus:before,
  input[type="time"]:not([value=""]):before {
    display: none;
  }

  input[type="time"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    opacity: 0;
    cursor: pointer;
  }
  input[type="time"]::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
    opacity: 0;
    cursor: pointer;
  }

  && img {
    position: absolute;
    top: 16px;
    left: 125px;
    width: 24px;
    height: 22px;
    pointer-events: none;
  }
`;
