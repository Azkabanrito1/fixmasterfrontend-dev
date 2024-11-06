import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

function DashboardDefault() {
  //let navigate = useNavigate();
  //const goToInvoicePage = () => navigate('/pages/customerportal/invoice');

  const [sidebar, setSidebar] = useState(false);

  const styleLink = {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    position: "relative",
  };

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <Container>
      <AllNav>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiFix>
                  <AiIcons.AiOutlineClose />
                  <img
                    className="nav-text"
                    src="/images/FixMastercse.png"
                    alt=""
                  />
                </AiFix>
              </Link>
            </li>
            <li className="nav-text">
              <Link style={styleLink} to="/pages/cseportal/overview">
                <DashBIcon src="/images/dashboard.png" alt="" />
                <span>DashBoard</span>
              </Link>

              <Link style={styleLink} to="/pages/customerportal/invoice">
                <InvoiceIcon src="/images/invoice.png" alt="" />
                <span>Invoice</span>
              </Link>

              <Link
                style={styleLink}
                to="/pages/customerportal/jobs/in-warrantyjobs"
              >
                <WarrantyIcon src="/images/warranty.png" alt="" />
                <span>Warranty</span>
              </Link>
              <Link style={styleLink} to="/pages/customerportal/subscription">
                <SubscriptionIcon src="/images/subscription.png" alt="" />
                <span>Subscription</span>
              </Link>
              <Link style={styleLink} to="/pages/customerportal/subscription">
                <WalletIcon src="/images/wallet.png" alt="" />
                <span>Wallet</span>
              </Link>

              <Link style={styleLink} to="/pages/customerportal/subscription">
                <SpecialIcon src="/images/settings.png" alt="" />
                <span>Special Project</span>
              </Link>
              <Link style={styleLink} to="/pages/customerportal/subscription">
                <SettingsIcon src="/images/settings.png" alt="" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </AllNav>
    </Container>
  );
}
export default DashboardDefault;

const Container = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const AllNav = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin-left: 10px;
  }

  .navbar {
    margin-left: 20px;
    background-color: #ffffff;
    width: 1240px;
    height: 80px;
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid #a2a2a2;
    img {
      margin-left: 538px;
      margin-right: 860px;
      margin-top: 10px;
      width: 50px;
      height: 50px;
    }
  }

  .menu-bars {
    padding-right: 45px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-left: 6 rem;
    font-size: 2 rem;
    background: none;
  }

  nav {
    display: flex;
    justify-content: flex-start;
    margin-top: 0px;
  }

  .nav-menu {
    background-color: #ffffff;
    width: 200px;
    height: 800px;
    display: flex;
    align-items: right;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: left;
    padding: 8px;
    list-style: none;
    height: 60px;

    span {
      margin-left: 40px;
      margin-top: 5px;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: row;
      width: 250px;
      height: 0px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: 28px;
      /* identical to box height, or 112% */

      display: flex;
      align-items: center;

      color: #c4c4c4;
      padding: 10px;
      &:hover {
        color: var(--clr-primary);
      }
    }

    .nav-text a {
      text-decoration: none;
      color: green;
      font-size: 18px;
      width: 95%;
      height: 100%;
      display: flex;
      padding: 0 16px;
      border-radius: 4px;
    }
  }

  .nav-menu-items {
    position: relative;
    width: 100%;
  }

  .navbar-toggle {
    position: relative;
    background-color: #fafafa;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  img {
    position: absolute;
    width: 150px;
    height: 120px;
    left: 22px;
    top: 6px;
  }
`;

const DashBIcon = styled.img`
  position: static;
  max-width: 18px;
  max-height: 18px;
`;
const AiFix = styled.div`
  display: flex;
  flex-direction: row;
`;

const InvoiceIcon = styled(DashBIcon)``;
const WarrantyIcon = styled(DashBIcon)``;
const WalletIcon = styled(DashBIcon)``;
const SubscriptionIcon = styled(DashBIcon)``;
const SpecialIcon = styled(DashBIcon)``;
const SettingsIcon = styled(DashBIcon)``;
