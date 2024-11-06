import styled from "styled-components";
import NotificationBar from "./NotificationBar";
import Logo from "../../globalcomponents/Logo";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { Button } from "@mui/material";

const Header = ({
  openFixModal,
  notifications,
  openNotifications,
  setShowSideBar,
}) => {
  const toggleSideBar = () => setShowSideBar((prev) => !prev);

  return (
    <HeaderContainer>
      <Logo maxWidth="140px" />
      <NotificationBar
        className="mx-auto"
        notifications={notifications}
        openNotifications={openNotifications}
      />
      <div className="button">
        <GlobalBtn
          className="book-fix"
          onClick={openFixModal}
          width="80%"
          height="auto"
          px="3rem"
          py="1.2rem"
        >
          BOOK A FIX
        </GlobalBtn>

        <Button onClick={toggleSideBar} className="menu-btn">
          <i className="fa fa-bars"></i>
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  height: 90px;
  padding: 8px 32px;
  background-color: #fff;
  z-index: 10;

  .book-fix {
    margin-inline: auto 8px;
  }

  .menu-btn {
    display: none;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.4rem;
    height: auto;
    padding-bottom: 1rem;

    .button {
      display: flex;
      justify-content: space-between;
      grid-column: 2 / 4;
      grid-row: 1 / 2;
    }

    .book-fix {
      margin-inline-start: 0;
    }

    .menu-btn {
      display: block;
      padding: 0 !important;
      color: var(--clr-primary);
      font-size: 1.8rem;
      font-weight: bold;
    }
  }
`;
