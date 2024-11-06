import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  CardBody,
  CardContainer,
  CardHead,
  Value,
  View,
} from "../../franchiseecomponents/dashboardcomponents/JobCards";
import CardFilters from "../../franchiseecomponents/dashboardcomponents/CardFilters";

const SupplierStats = ({
  title,
  text,
  img,
  color, // color of text and folder
  linkText,
  link,
  filters = [],
  values = {},
}) => {
  const [filterKeys, setFilterKeys] = useState({});
  const [presentFilter, setPresentFilter] = useState({});

  useEffect(() => {
    const filterKeyStruct = {};
    filters.map((filter) => {
      filterKeyStruct[filter.type] = filter.details[0].key;
    });
    setFilterKeys(filterKeyStruct);
    const presFilters = {};
    filters.map((filter) => {
      presFilters[filter.type] = filter.details[0].name;
    });
    setPresentFilter(presFilters);
  }, []);

  const navigate = useNavigate();

  let value = null;

  if (Object.keys(filterKeys).length > 0 && Object.keys(values).length > 0) {
    value = values[filterKeys.time];
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
          <img src={img} alt="" style={{ color: "green" }} />
        </div>
        <div>
          <div>{text}</div>
          <Value clr={color}>{value}</Value>
        </div>
      </CardBody>

      <AccountView
        color={color}
        className="d-flex align-items-center justify-content-between"
        onClick={() => navigate(`../${link}`)}
      >
        {linkText ? <span>{linkText}</span> : <span>View All</span>}
        <i className="fa fa-chevron-right"></i>
      </AccountView>
    </CardContainer>
  );
};

export default SupplierStats;

const AccountView = styled(View)`
  background-color: ${({ color }) => color};
`;
