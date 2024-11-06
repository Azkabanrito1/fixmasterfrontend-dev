import { useEffect, useReducer } from "react";
import { CardContainer, CardHead, CardBody, View, Value } from "./JobCards";
import CardFilter from "./CardFilter";

const initState = {
  value: null,
  presentFilterNames: [],
  presentFilterKeys: [],
};

const filterReducer = (state, action) => {
  const getValue = (values, filterKeys) => {
    let value;
    if (filterKeys.length > 1) {
      value = values?.[filterKeys[0]]?.[filterKeys[1]];
    } else {
      value = values?.[filterKeys[0]];
    }
    return value;
  };

  switch (action.type) {
    case "INIT_SETUP":
      const filterNames = action.filters.map((filter) => filter[0].name);
      const filterKeys = action.filters.map((filter) => filter[0].key);
      const value = getValue(action.values, filterKeys);
      return {
        value,
        presentFilterNames: filterNames,
        presentFilterKeys: filterKeys,
      };
    case "UPDATE":
      const newFilterKeys = state.presentFilterKeys;
      newFilterKeys[action.index] = action.singleFilter.key;
      const newFilterNames = state.presentFilterNames;
      newFilterNames[action.index] = action.singleFilter.name;
      return {
        value: getValue(action.values, newFilterKeys),
        presentFilterNames: newFilterNames,
        presentFilterKeys: newFilterKeys,
      };
    default:
      return state;
  }
};

const TerritoryHealthCards = ({
  title,
  text,
  img,
  color, // color of text and folder
  linkText,
  handleCardClick,
  filters = [],
  values = {},
}) => {
  const [filteringData, setFilteringData] = useReducer(
    filterReducer,
    initState
  );

  const updateFilter = (index, filter) => {
    setFilteringData({ type: "UPDATE", singleFilter: filter, index, values });
  };

  useEffect(() => {
    setFilteringData({ type: "INIT_SETUP", values, filters });
  }, [filters, values]);

  return (
    <CardContainer className="d-flex flex-column">
      <CardHead>
        <h3>{title}</h3>
        <div className="d-flex">
          {filters.map((item, filterIndex) => {
            return (
              <CardFilter
                key={filterIndex}
                filter={item}
                updateFilter={updateFilter}
                index={filterIndex}
                presentFilter={filteringData.presentFilterNames[filterIndex]}
              />
            );
          })}
        </div>
      </CardHead>

      <CardBody>
        <img src={img} alt="" />
        <div>
          <div>{text}</div>
          <Value clr={color} className="text-end pe-4">
            {filteringData.value}
          </Value>
        </div>
      </CardBody>

      <View
        className="d-flex align-items-center justify-content-between"
        onClick={handleCardClick}
      >
        {linkText ? <span>{linkText}</span> : <span>View All</span>}
        <i className="fa fa-chevron-right"></i>
      </View>
    </CardContainer>
  );
};

export default TerritoryHealthCards;
