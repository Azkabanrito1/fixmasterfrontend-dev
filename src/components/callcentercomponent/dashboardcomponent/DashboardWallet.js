import React from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useNavigate, Link } from "react-router-dom/dist";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import {
  CardBody,
  CardContainer,
  CardHead,
  Value,
  View,
} from "../../franchiseecomponents/dashboardcomponents/JobCards";
import styled from "styled-components";
import { CiWallet } from "react-icons/ci";

const DashboardWallet = ({ accountData }) => {
  const navigate = useNavigate();
  return (
    <CardContainer className="d-flex flex-column">
      <CardHead>
        <span className="text-muted">Available Balance</span>
      </CardHead>
      <CardBody>
        <div>
          <CiWallet size={20} color="#f26222" fill="#f26222" />
        </div>
        <div>
          <div>Balance</div>
          <Value style={{ color: "#f26222" }}></Value>
        </div>
      </CardBody>
      <AccountView
        className="d-flex justify-content-between"
        onClick={() => navigate(`/call-center/wallet`)}
      >
        Withdrawal Fund
        <i className="fa fa-chevron-right"></i>
      </AccountView>
    </CardContainer>
  );
};

export default DashboardWallet;

const AccountView = styled(View)`
  background-color: ${({ color }) => color};
`;
