import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import GlobalTable from "../../globalcomponents/GlobalTable";
import AddCall from "./AddCall";
import { useState } from "react";
import { format } from "date-fns";

const ReceivedCall = () => {
  const [openCallDetails, setOpenCallDetails] = useState(false);
  const [activeCallerId, setActiveCallerId] = useState("");

  const OpenCallHandler = (id) => {
    setActiveCallerId(id);
    setOpenCallDetails(true);
  };

  const closedCallerHandler = () => setOpenCallDetails(false);

  const columns = [
    {
      name: "s/n ",
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
      name: "callerId",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <span
            onClick={() => OpenCallHandler(value)}
            style={{
              color: "#f27a30",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Enter call details
          </span>
        ),
      },
    },
  ];

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Received Call</PageHeading>
      </div>
      <GlobalTable columns={columns} data={[]} />.
      {openCallDetails && (
        <AddCall
          isOpen={openCallDetails}
          closeModal={closedCallerHandler}
          activeCaller={{}}
          activeCallerId={activeCallerId}
        />
      )}
    </>
  );
};

export default ReceivedCall;
