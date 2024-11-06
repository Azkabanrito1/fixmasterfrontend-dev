import useFetch from "../../../../../hooks/useFetch";
import useDateQueries from "../../../../../hooks/useDateQueries";
import useJobSearch from "../../../../../hooks/useJobSearch";
import { InfoTable, NoData } from "../../../../globalcomponents/Utilities";
import JobFilters from "../../../../franchiseecomponents/jobsmanagement/JobFilters";
import { AssignmentHeader } from "../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";

const ActivitiesTable = () => {
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

  // const amountTemplate = filteredResults?.map((item, id) => {
  //   return (
  //     <tr key={id}>
  //       <td>{item.jobRef}</td>
  //       <td>{item.class}</td>
  //       <td>{item.type}</td>
  //       <td>{item.amount}</td>
  //       <td>{item.amountEarn}</td>
  //       <td>{item.date}</td>
  //     </tr>
  //   );
  // });

  return (
    <div>
      <div className="mt-4">
        <AssignmentHeader>
          <h2>Latest Activities</h2>
        </AssignmentHeader>
      </div>
      <JobFilters
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
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="fullbody">
          <NoData cols="4" />
        </tbody>
      </InfoTable>
    </div>
  );
};

export default ActivitiesTable;
