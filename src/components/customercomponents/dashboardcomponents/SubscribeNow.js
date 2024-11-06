import { useNavigate } from "react-router";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { PATH_CUSTOMER } from "../../../routes/paths";

const SubscribeNow = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: "10px" }}
      className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 "
    >
      <p className="m-md-0">You have no active subscription at the moment</p>

      <GlobalBtn
        px="3em"
        py="1.4em"
        width="max-content"
        onClick={() => navigate(PATH_CUSTOMER.subHome)}
      >
        Subscribe Now
      </GlobalBtn>
    </div>
  );
};

export default SubscribeNow;
