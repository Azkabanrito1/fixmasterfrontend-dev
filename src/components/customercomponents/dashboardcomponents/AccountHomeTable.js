import FilterActions from "./FilterHistoryActions";
import useDateQueries from "../../../hooks/useDateQueries";
import { BallBeat } from "react-pure-loaders";
import { useSelector } from "react-redux";
import {
  InfoTable,
  NoData,
} from "../../../components/globalcomponents/Utilities";
import { getToday } from "../../../utils/dateRanges";
import useHistorySearch from "../../../hooks/useHistorySearch";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalInput from "../../globalcomponents/GlobalInput";
import moment from "moment";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const AccountHomeTable = ({ transactionHistory }) => {
  const {
    filteredResults,
    filterClass,
    options,
    presentFilter,
    setPresentFilter,
    setFilterClass,
  } = useHistorySearch(transactionHistory);
  const { dateQueries, setDateQueries } = useDateQueries();
  const { isLoading } = useSelector((state) => state.auth);

  const today = getToday();

  const tbodyTemplate = filteredResults.map((data) => {
    return (
      <tr key={data.id}>
        <td>{moment(data.datePaid).format("DD-MM-YYYY")}</td>
        <td>{data.id}</td>
        <td>{data.jobClass}</td>
        <td>{data.jobType}</td>
        <td>{data.amount}</td>
        <td className="text-capitalize">{data.paymentStatus}</td>
        <td className="text-capitalize">{data.paymentMethod}</td>
      </tr>
    );
  });

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="d-flex align-items-end align-self-start align-self-md-center">
          <GlobalInput
            inputType="date"
            labelText="From"
            inputValue={dateQueries.from.date}
            handleChange={(e) =>
              setDateQueries({ type: "setFrom", date: e.target.value })
            }
            error={dateQueries.from.error}
            errorMessage={dateQueries.from.errorMsg}
            max={today}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            inputType="date"
            labelText="To"
            inputValue={dateQueries.to.date}
            handleChange={(e) =>
              setDateQueries({ type: "setTo", date: e.target.value })
            }
            error={dateQueries.to.error}
            errorMessage={dateQueries.to.errorMsg}
            min={dateQueries.from.date}
          />
        </div>
        <div className="d-flex align-items-center align-self-end align-self-md-center mt-4 mt-md-0">
          <GlobalSelect
            options={options}
            defaultOption={`All History`}
            valueType="string"
            handleChange={(e) => setPresentFilter(e.target.value)}
            selectValue={presentFilter}
          />
          <FilterActions setFilter={setFilterClass} filter={filterClass} />
        </div>
      </div>

      <GlobalBallBeat loading={isLoading} />

      {(transactionHistory.length > 0 || !isLoading) && (
        <InfoTable minWidth="900px">
          <thead className="fullbody">
            <tr>
              <th>Date</th>
              <th>Job ID</th>
              <th>Job Class</th>
              <th>Job Type</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
            </tr>
          </thead>

          <tbody className="fullbody">
            {filteredResults?.length > 0 ? tbodyTemplate : <NoData cols="7" />}
          </tbody>
        </InfoTable>
      )}
    </section>
  );
};

export default AccountHomeTable;
