import React from 'react';
import styled from "styled-components";

function StashedBoxes() {
  return (
    <Container>
        <Boxes>
              <BoxRow>
                <BoxRowA></BoxRowA>
                <BoxRowB></BoxRowB>
              </BoxRow>
              <BoxRow2>
                <BoxRow2A></BoxRow2A>
                <BoxRow2B></BoxRow2B>
              </BoxRow2>
            </Boxes>
    </Container>
  )
}

export default StashedBoxes;

const Container = styled.div`

`

const Boxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const BoxRowA = styled.div`
  width: 18px;
  height: 17px;

  background: #c4c4c4;
`;
const BoxRowB = styled(BoxRowA)``;

const BoxRow2 = styled(BoxRow)``;
const BoxRow2A = styled(BoxRowA)``;
const BoxRow2B = styled(BoxRowA)``;
