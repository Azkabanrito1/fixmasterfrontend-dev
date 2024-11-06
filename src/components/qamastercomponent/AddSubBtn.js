import { useState } from "react";
import { Button, Menu, MenuItem, styled } from "@mui/material";
import GlobalCheckbox from "../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../globalcomponents/GlobalBtn";
import { FormGroup } from "../globalcomponents/Utilities";
import { Fields, GroupHeading } from "../csecomponent/cse/modal/RegisterCse";
import AltModalHeader from "../layouts/modal/AltModalHeader";

const AddSubBtn = ({ action, options, handleFormik, closeModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const performAction = (id) => {
    action(id);
    handleClose();
  };
  const { values, handleBlur, handleChange, errors, touched } = handleFormik;

  const menuTemplate = options.map((category) => {
    return (
      <GlobalCheckbox
        key={category.id}
        inputName="category"
        fs="1rem"
        gap=".5rem"
        inputValue={category.id}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={touched.category && errors.category}
        errorMessage={errors.category}
        labelText={category.subCategoryName}
        checked={Number(values.categoryType) === category.id}
      />
      // <GlobalCheckbox
      //   key={category.id}
      //   fs="1rem"
      //   gap=".5rem"
      //   inputName="categoryType"
      //   inputValue={category.id}
      //   checked={Number(values.categoryType) === category.id}
      //   handleBlur={handleBlur}
      //   handleChange={handleChange}
      //   labelText={"type.name"}
      // />
    );
  });

  return (
    <>
      <Menu
        id="listing-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "listing-button" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="p-3">
          <AltModalHeader
            heading={"Select Electrical Sub-category"}
            closeModal={closeModal}
          />
          <form action="">
            <Fields>
              <FormGroup columns="2">{menuTemplate}</FormGroup>
            </Fields>
            <GlobalBtn mx="auto" width="100%" height="auto">
              Proceed
            </GlobalBtn>
          </form>
        </div>
      </Menu>
      <StyledButton
        id="listing-button"
        aria-controls={open ? "listing-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i
          style={{ color: "#fff", fontSize: "0.6em" }}
          className="fa fa-plus"
        ></i>
      </StyledButton>
    </>
  );
};

export default AddSubBtn;

const StyledButton = styled(Button)`
  display: grid;
  place-items: center;
  min-width: 12px !important;
  border-radius: 5px 5px 5px 0;
  color: #ffffff;
  padding: 0.3em;
  background-color: var(--clr-primary);
  overflow: hidden;

  &:hover {
    background-color: #222;
  }
`;
