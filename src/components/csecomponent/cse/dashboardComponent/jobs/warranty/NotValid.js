import styled from "styled-components";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";

const NotValid = () => {
  return (
    <Container>
      <div className="d-flex gap-1">
        <h2 className="blockquote">Note:</h2>
        <p>
          By clicking 'Confirm' this fix status will be updated to unassigned
          and will be automatically be assign to CSE and the technician. Also,
          CSE can assign new technician for this fix
        </p>
      </div>
    </Container>
  );
};

export default NotValid;

const Container = styled.div`
  padding: 1rem;
`;
