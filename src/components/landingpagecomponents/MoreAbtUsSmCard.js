import React from 'react';
import styled from 'styled-components';

function MoreAbtUsSmCard(props) {
  return (
    <Container>
        <BigCard>
            <p>{props.smallCardText}</p>
        </BigCard>
    </Container>
  )
}

export default MoreAbtUsSmCard;

const Container = styled.div`

`
const BigCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    box-sizing: border-box;

    width: 380px;
    height: 107px;

    background: #E4E9EB;
    border: 1px solid #97ABB9;
    border-radius: 11px;

    && p {
        width: 313px;
        height: 50px;
        
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 16px;
        /* or 67% */
        
        letter-spacing: 0.2em;
        
        color: #000000;
    }

    @media (max-width: 1200px) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      box-sizing: border-box;
  
      width: 300px;
      height: 107px;
  
      background: #E4E9EB;
      border: 1px solid #97ABB9;
      border-radius: 11px;
  
      && p {
          width: 290px;
          height: 50px;
          
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 16px;
          /* or 67% */
          
          letter-spacing: 0.2em;
          
          color: #000000;
      }     
    }

    @media (max-width: 968px) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      box-sizing: border-box;
  
      width: 260px;
      height: 107px;
  
      background: #E4E9EB;
      border: 1px solid #97ABB9;
      border-radius: 11px;
  
      && p {
          width: 240px;
          height: 50px;
          
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          font-size: 14px;
          line-height: 16px;
          /* or 67% */
          
          letter-spacing: 0.2em;
          
          color: #000000;
      }     
    }
`