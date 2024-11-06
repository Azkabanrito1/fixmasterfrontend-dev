import { useState, useEffect } from "react";
import styled from "styled-components";
import CardFilters from "./CardFilters";
import { useNavigate } from "react-router-dom";

const JobCards = ({
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
  // console.log(filterKeys);

  if (filterKeys) {
    value = values?.[filterKeys.time];
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

      <View
        color={color}
        className="d-flex align-items-center justify-content-between"
        onClick={() => navigate(link)}
      >
        {linkText ? <span>{linkText}</span> : <span>View All</span>}
        <i className="fa fa-chevron-right"></i>
      </View>
    </CardContainer>
  );
};

export default JobCards;

export const CardContainer = styled.div`
  position: relative;
  gap: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;

  div {
    font-size: 14px;
  }

  h3 {
    width: 50%;
    font-size: 14px;
    font-weight: 700;
  }
`;

export const CardHead = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
`;

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 0.8rem;
  margin-bottom: 50px;
  color: #676767;

  img {
    width: 24px;
  }

  & > div {
    flex-grow: 1;
  }
`;

export const Value = styled.div`
  margin-top: 5px;
  font-size: 20px !important;
  color: ${({ clr }) => clr};
`;

export const View = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  color: #fff;
  background-color: ${({ color }) => color || "var(--clr-primary)"};
  text-decoration: none;
  cursor: pointer;
`;
