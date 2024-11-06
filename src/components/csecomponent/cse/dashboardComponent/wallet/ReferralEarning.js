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

const ReferralEarning = () => {
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
      <td>{item.userName}</td>
      <td>{item.dateRegistered}</td>
      <td>{item.Earned}</td>
    </tr>;
  });
  return (
    <div>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Referral Earnings</PageHeading>
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
            <th>Username</th>
            <th>Date Registered</th>
            <th> Earned</th>
          </tr>
        </thead>
        <tbody className="fullbody">
          {filteredResults?.length > 0 ? amountTemplate : <NoData cols="3" />}
        </tbody>
      </InfoTable>
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "var(--clr-primary)" }}
      >
        <p className="fs-4 text-light mt-2 p-2">Total</p>
        <span className="fs-4 text-light mt-2 p-2">NGN</span>
      </div>
    </div>
  );
};

export default ReferralEarning;
