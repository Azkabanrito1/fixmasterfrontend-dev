import {
  InfoTable,
  NoData,
  BackBtn,
} from "../../../../globalcomponents/Utilities";
import { PageHeading } from "../../../../globalcomponents/Utilities";
import useFetch from "../../../../../hooks/useFetch";
import useDateQueries from "../../../../../hooks/useDateQueries";
import useJobSearch from "../../../../../hooks/useJobSearch";
import WalletFilters from "./WalletFilters";

const Fix = () => {
  const getEarndAmount = [
    {
      id: 0,
      class: "ref",
      type: "fast",
      jobRef: "htfrek78",
      date: "30-05-2023",
      amountEarn: "3,000",
      amount: "40,000",
    },
    {
      id: 1,
      class: "ref",
      type: "fast",
      jobRef: "hfrk78",
      date: "01-06-2023",
      amountEarn: "30,000",
      amount: "70,000",
    },
    {
      id: 2,
      class: "ref",
      type: "fast",
      jobRef: "htfrek78",
      date: "01-06-2023",
      amountEarn: "30,000",
      amount: "55,000",
    },
    {
      id: 3,
      class: "ref",
      type: "fast",
      jobRef: "hfrkp78",
      date: "01-05-2023",
      amountEarn: "20,000",
      amount: "60,000",
    },
    {
      id: 4,
      class: "ref",
      type: "fast",
      jobRef: "hpfrk78",
      date: "01-06-2023",
      amountEarn: "10,000",
      amount: "50,000",
    },
  ];

  const { dateQueries, setDateQueries } = useDateQueries();

  const amountEarned = useFetch({
    action: getEarndAmount,
    args: [dateQueries.from.date, dateQueries.to.date],
    deps: [dateQueries.from.date, dateQueries.to.date],
  });

  const {
    filteredResults,
    filterClass,
    options,
    presentFilter,
    setPresentFilter,
    setFilterClass,
  } = useJobSearch(amountEarned);

  const amountTemplate = filteredResults?.map((item, id) => {
    <tr key={id}>
      <td>{item.jobRef}</td>
      <td>{item.class}</td>
      <td>{item.type}</td>
      <td>{item.amount}</td>
      <td>{item.amountEarn}</td>
      <td>{item.date}</td>
    </tr>;
  });
  return (
    <div>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Job Fix Earnings</PageHeading>
      </div>
      <WalletFilters
        dateQueries={dateQueries}
        filterClass={filterClass}
        options={options}
        presentFilter={presentFilter}
        setDateQueries={setDateQueries}
        setFilterClass={setFilterClass}
        setPresentFilter={setPresentFilter}
        title="Select"
      />
      <InfoTable>
        <thead className="fullbody">
          <tr>
            <th>Job Ref</th>
            <th>Job Class</th>
            <th>Job Type</th>
            <th>Amount</th>
            <th>Amount Earned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="fullbody">
          {filteredResults?.length > 0 ? amountTemplate : <NoData cols="6" />}
        </tbody>
      </InfoTable>
    </div>
  );
};

export default Fix;
