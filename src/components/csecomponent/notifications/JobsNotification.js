import styled from "styled-components";
import FilterNotification from "./FilterNotification";
import { InfoTable, NoData } from "../../globalcomponents/Utilities";
import UseNotificationSearch from "./UseNotificationSearch";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { useReducer } from "react";
import useDateQueries from "../../../hooks/useDateQueries";

const initState = {
  activeJobId: "",
  isJobDetailsOpen: false,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "setId":
      return {
        ...state,
        activeJobId: action.id,
      };
    case "openModal":
      return {
        activeJobId: action.id,
        isJobDetailsOpen: true,
      };
    case "closeModal":
      return {
        ...state,
        isJobDetailsOpen: false,
      };
    default:
      return state;
  }
};
const JobsNotification = () => {
  const getSupplierRequest = [
    {
      id: 0,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 1,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 2,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 3,
      class: "ref",
      type: "fast",
      category: "exp",
    },
    {
      id: 4,
      class: "ref",
      type: "fast",
      category: "exp",
    },
  ];
  const [state, setState] = useReducer(stateReducer, initState);
  const { dateQueries, setDateQueries } = useDateQueries();
  const completedJobs = useFetch({
    action: getSupplierRequest,
    args: [dateQueries.from.date, dateQueries.to.date],
    deps: [dateQueries.from.date, dateQueries.to.date],
  });

  const { isLoading } = useSelector((state) => state.auth);
  const {
    filteredResults,
    filterAll,
    options,
    presentFilter,
    setPresentFilter,
    setFilterAll,
  } = UseNotificationSearch(completedJobs);

  const tbodyTemplate = filteredResults?.map((message, key) => {
    return (
      <tr key={key}>
        <td>{message.date}</td>
        <td>{message.type}</td>
        <td>{message.description}</td>
        <td>{message.time}</td>
        <td>
          <button
            className="primary"
            onClick={() => setState({ type: "openModal", id: message.id })}
          >
            View Details
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <PageHeading>Notification</PageHeading>
      <FilterNotification
        dateQueries={dateQueries}
        filterAll={filterAll}
        options={options}
        presentFilter={presentFilter}
        setDateQueries={setDateQueries}
        setFilterAll={setFilterAll}
        setPresentFilter={setPresentFilter}
        title="Jobs Notification"
      />
      <InfoTable>
        <thead className="fullbody">
          <tr>
            <th>Date</th>
            <th>Job Ref</th>
            <th>Description</th>
            <th>Time</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody className="fullbody">
          {filteredResults?.length > 0 ? tbodyTemplate : <NoData cols="6" />}
        </tbody>
      </InfoTable>
    </div>
  );
};

export default JobsNotification;
const PageHeading = styled.h1`
  margin-bottom: 20px;
  font-size: 32px;
  text-align: flex-start;
  font-weight: 700;
`;
