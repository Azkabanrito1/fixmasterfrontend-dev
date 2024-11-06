import { InfoTable } from "../../../components/globalcomponents/Utilities";

const GetAccount = () => {
  return (
    <InfoTable>
      <thead className="fullbody">
        <tr>
          <th>Date</th>
          <th>Job Ref</th>
          <th>Job Class</th>
          <th>Job Type</th>
          <th>Amount</th>
          <th>Payment Status</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody className="fullbody">
        <tr>
          <td>19/12/2022</td>
          <td>FHHgt78</td>
          <td>Diagnostics</td>
          <td>Standard</td>
          <td>300,000</td>
          <td>Paid</td>
          <td>Bank Transfer</td>
        </tr>
      </tbody>
    </InfoTable>
  );
};

export default GetAccount;
