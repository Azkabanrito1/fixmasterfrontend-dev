import GlobalBtn from "./GlobalBtn";

const CustomToolbarBtn = ({ action, text, className }) => (
  <GlobalBtn
    height="auto"
    width="max-width"
    py="8px"
    px="20px"
    fs="16px"
    fw="600"
    onClick={action}
    className={`d-inline ${className}`}
  >
    {text || "View All"}
  </GlobalBtn>
);

export default CustomToolbarBtn;
