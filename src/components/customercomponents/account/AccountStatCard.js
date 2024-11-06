import { useState, useEffect } from "react";
import CardFilters from "../../franchiseecomponents/dashboardcomponents/CardFilters";
import { useNavigate } from "react-router-dom";
import {
  CardBody,
  CardContainer,
  CardHead,
  Value,
  View,
} from "../../franchiseecomponents/dashboardcomponents/JobCards";
import styled from "styled-components";

const AccountStatCard = ({
  title,
  text,
  img,
  color, // color of text and folder
  linkText,
  link,
  filters = [],
  values = {},
  openFundWallet,
}) => {
  const [filterKeys, setFilterKeys] = useState({});
  const [presentFilter, setPresentFilter] = useState({});

  useEffect(() => {
    const filterKeyStruct = {};
    filters.forEach((filter) => {
      filterKeyStruct[filter.type] = filter.details[0].key;
    });
    setFilterKeys(filterKeyStruct);
    const presFilters = {};
    filters.forEach((filter) => {
      presFilters[filter.type] = filter.details[0].name;
    });
    setPresentFilter(presFilters);
  }, []);

  const navigate = useNavigate();

  let value = null;

  if (Object.keys(filterKeys).length > 0 && Object.keys(values).length > 0) {
    value = values?.[filterKeys?.[Object.keys(filterKeys)[0]]];
  }

  return (
    <CardContainer className="d-flex flex-column">
      <CardHead>
        <h3>{title}</h3>
        <div className="d-flex">
          {filters.map((item) => {
            return (
              <CardFilters
                key={Math.random()}
                filterName={item.type}
                filters={item}
                setFilterKey={setFilterKeys}
                filterKeys={filterKeys}
                presentFilter={presentFilter[item.type]}
                setPresentFilter={(filter) =>
                  setPresentFilter({
                    ...presentFilter,
                    [item.type]: filter,
                  })
                }
              />
            );
          })}
        </div>
      </CardHead>

      <CardBody>
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <div>{text}</div>
          <Value clr={color}>{value}</Value>
        </div>
      </CardBody>

      <AccountView
        color={color}
        className="d-flex align-items-center justify-content-between"
        onClick={() => {
          if (link === "fund-wallet") {
            openFundWallet();
            return;
          }
          navigate(`/customer/account/${link}`);
        }}
      >
        {linkText ? <span>{linkText}</span> : <span>View All</span>}
        <i className="fa fa-chevron-right"></i>
      </AccountView>
    </CardContainer>
  );
};

export default AccountStatCard;

const AccountView = styled(View)`
  background-color: ${({ color }) => color};
`;
