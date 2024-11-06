import { Button, styled } from "@mui/material";

const DropdownBtn = ({ action, id }) => {
  return (
    <>
      <StyledButton id={id} onClick={action}>
        <i
          style={{ color: "#fff", fontSize: "0.6em" }}
          className="fa fa-plus"
        ></i>
      </StyledButton>
    </>
  );
};

export default DropdownBtn;

const StyledButton = styled(Button)`
  display: grid;
  place-items: center;
  min-width: 18px !important;
  border-radius: 5px 5px 5px 0;
  color: #ffffff;
  padding: 0.3em;
  background-color: var(--clr-primary);
  overflow: hidden;

  &:hover {
    background-color: #222;
  }
`;
