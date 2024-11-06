import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { format } from "date-fns";

const MissedCall = () => {
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "responseTime",
      label: "Response Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "name",
      label: "Avi/Name",
      options: {
        customBodyRender: (value) => (
          <div className="d-flex">
            {" "}
            <div style={{ width: "50px" }}>
              <img
                src={"/images/avatar.png"}
                alt="caller profile picture"
                style={{ width: "100%" }}
              />
            </div>
            <span className="fw-bold mt-3">{value}</span>
          </div>
        ),
      },
    },

    {
      name: "callerNumber",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div className="d-flex">
            {" "}
            <span>
              <a
                href={`tel:${value}`}
                style={{ color: "#f27a30", marginRight: "1em" }}
              >
                <HiOutlinePhoneMissedCall
                  size={30}
                  style={{ marginRight: "1em" }}
                />
                Call Back
              </a>
            </span>
          </div>
        ),
      },
    },
  ];

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Missed Calls</PageHeading>
      </div>

      <GlobalTable columns={columns} data={[]} />
    </>
  );
};

export default MissedCall;
