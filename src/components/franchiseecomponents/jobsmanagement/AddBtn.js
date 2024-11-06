import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

const AddBtn = ({
  action,
  justify,
  id,
  text,
  mt,
  mb,
  isEdit,
  isRemove,
  orientation,
}) => {
  return (
    <StyledAddBtn mt={mt} mb={mb} orientation={orientation} justify={justify}>
      <button id={id} onClick={action} type="button">
        {!isEdit && !isRemove && <AiOutlinePlusCircle />}
        {isEdit && <MdOutlineModeEditOutline />}
        {isRemove && <AiOutlineCloseCircle />}
      </button>
      <label htmlFor={id}>{text}</label>
    </StyledAddBtn>
  );
};

export default AddBtn;

const StyledAddBtn = styled.div`
  display: ${({ orientation }) => (orientation === "inline" ? "flex" : "grid")};
  place-items: center;
  justify-content: ${({ justify }) => justify || "center"};
  gap: 0.5rem;
  margin-top: ${({ mt }) => mt || "3rem"};
  margin-bottom: ${({ mb }) => mb};

  button {
    display: grid;
    place-items: center;
    width: 50px;
    aspect-ratio: 1;
    border: none;
    border-radius: 8px;
    font-size: 36px;
    color: var(--clr-primary);
    background-color: transparent;
    transition: 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #404040;
    }
  }

  label {
    text-align: center;
    color: var(--clr-primary);
  }
`;
