import React from 'react';
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

function SideBarClose(props) {
  return (
    <Container>
       <Link to="#" className="menu-bars">
          <AiFix>
           
            {props.imgSrc ? <img src={props.imgSrc} alt=""/> : ''}        
            </AiFix>              
        </Link>         
    </Container>
  )
}

export default SideBarClose;

const Container = styled.div`

`
const AiFix = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 120px;
    height: 50px;
    margin-left: 15px;
    margin-top: 12px;
  }
`;
