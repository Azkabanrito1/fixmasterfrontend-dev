import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CategoryCards(props) {
  return (
    <Container>
      <Categories>
        <div className="image">
          <img src={props.cateImg} />
        </div>
        <div className="center">
          <h3>{props.cateLabelText}</h3>
          <p>{props.cateDescText}</p>
          <Link to="#">Read More</Link>
        </div>
      </Categories>
    </Container>
  );
}

export default CategoryCards;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  background: #fff;
  padding: 10px 10px 35px;

  .image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .center {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.2rem;
    }
    p {
      margin-bottom: 1.5rem;
    }
    a {
      text-decoration: none;
      padding: 10px 15px;
      border: 2px solid var(--clr-primary);
      color: var(--clr-primary);
    }
  }
`;
