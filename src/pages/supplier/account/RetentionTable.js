import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";

const RetentionTable = () => {
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "noOfRetention",
      label: "Number of Retention",
    },
    {
      name: "duration",
      label: "Duration",
    },
    {
      name: "value",
      label: "Value",
    },
  ];
  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Retentions History</PageHeading>
      </div>
      <GlobalTable data={[]} columns={columns} />;
    </>
  );
};

export default RetentionTable;
