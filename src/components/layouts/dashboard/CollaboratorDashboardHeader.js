import styled from "styled-components";
import NotificationBar from "./NotificationBar";
import Logo from "../../globalcomponents/Logo";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import useLogout from "../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Header = ({
  loggedIn,
  setShowSideBar,
  notifications,
  openNotifications,
}) => {
  const navigate = useNavigate();

  const handleLogout = useLogout(() => {
    navigate("/");
  });

  const toggleSideBar = () => setShowSideBar((prev) => !prev);

  const screenWidth = window.innerWidth;

  return (
    <HeaderContainer>
      <Logo maxWidth="140px" />
      {loggedIn && (
        <NotificationBar
          notifications={notifications}
          openNotifications={openNotifications}
        />
      )}

      <div className="d-flex">
        <Button onClick={toggleSideBar} className="menu-btn">
          <i className="fa fa-bars"></i>
        </Button>
        <GlobalBtn
          width="max-content"
          color="#000"
          bgClr="transparent"
          hoverBg="transparent"
          hoverClr="var(--clr-primary)"
          iconWidth="20px"
          iconHeight="18px"
          onClick={handleLogout}
        >
          <img src="/images/logout-orange.png" alt="logout" />
          {screenWidth > 768 && "Logout"}
        </GlobalBtn>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 90px;
  padding: 8px 32px;
  background-color: #fff;
  z-index: 10;

  .menu-btn {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .menu-btn {
      display: block;
      padding: 0 !important;
      color: var(--clr-primary);
      font-size: 1.8rem;
      font-weight: bold;
    }
  }
`;
