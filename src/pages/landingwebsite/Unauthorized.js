import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";

const Unauthorized = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location?.state?.from);

  return (
    <>
      <SiteNavbar
        isOpen={isNavOpen}
        toggleIsOpen={() => {
          setIsNavOpen((prev) => !prev);
        }}
      />

      <div
        style={{ minHeight: "calc(100vh - 105px" }}
        className="d-flex flex-column align-items-center justify-content-center bg-light"
      >
        <p className="mb-4 fs-2">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</p>
        <GlobalBtn onClick={() => navigate(-1)}>Go Back</GlobalBtn>
      </div>
    </>
  );
};

export default Unauthorized;
