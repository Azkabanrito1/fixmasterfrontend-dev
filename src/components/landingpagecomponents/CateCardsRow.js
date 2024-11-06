import React from "react";
import styled from "styled-components";
import CategoryCards from "./CategoryCards";

function CateCardsRow(props) {
  return (
    <Container>
      <CardsRow>
        <CategoryCards
          cateLabelText={props.cateLabelTextRow1}
          cateDescText={props.cateDescTextRow1}
          cateImg={props.cateImgRow1}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow2}
          cateDescText={props.cateDescTextRow2}
          cateImg={props.cateImgRow2}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow3}
          cateDescText={props.cateDescTextRow3}
          cateImg={props.cateImgRow3}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow4}
          cateDescText={props.cateDescTextRow4}
          cateImg={props.cateImgRow4}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow5}
          cateDescText={props.cateDescTextRow5}
          cateImg={props.cateImgRow5}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow6}
          cateDescText={props.cateDescTextRow6}
          cateImg={props.cateImgRow6}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow7}
          cateDescText={props.cateDescTextRow7}
          cateImg={props.cateImgRow7}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow8}
          cateDescText={props.cateDescTextRow8}
          cateImg={props.cateImgRow8}
        />
        <CategoryCards
          cateLabelText={props.cateLabelTextRow9}
          cateDescText={props.cateDescTextRow9}
          cateImg={props.cateImgRow9}
        />
      </CardsRow>
    </Container>
  );
}

export default CateCardsRow;

const Container = styled.div``;
const CardsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;
