import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import { useNavigate } from "react-router-dom";

const AwaitingApproval = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout(() => navigate("/"));

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
        <p className="mb-4 fs-2 text-center">
          You are awaiting approval from the FM team. Please have patience as
          you will be contacted with updates
        </p>
        <GlobalBtn onClick={() => logout()}>Go Back</GlobalBtn>
      </div>
    </>
  );
};

export default AwaitingApproval;
