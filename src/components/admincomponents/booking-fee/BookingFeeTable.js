import { useState } from "react";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import UpdateJobBookingFee from "./modal/UpdateJobBookingFeeModal";
import DeleteJobBookingFeeModal from "./modal/DeleteJobBookingFeeModal";

const BookingFeeTable = ({ bookingFeeParam, loading }) => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = bookingFeeParam?.findIndex((x) => x.id === value);
    setActiveApplicant(bookingFeeParam[applicantIndex]);
  };

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  //   modal controls

  const updateBookingFee = (id) => {
    setUpdateModal(true);
    getActiveApplicant(id);
  };
  const deleteBookingFee = (id) => {
    setDeleteModal(true);
    getActiveApplicant(id);
  };

  const columns = [
    { name: "fixClass", label: "Job Fix Class" },
    { name: "fixType", label: "Job Fix Type" },
    { name: "fixCategory", label: "Job Fix Category" },
    { name: "applicableFee", label: "Applicable Fee" },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, meta) => {
          const actions = [
       
            {
              id: 1,
              name: "Update Booking Fee",
              action: () => updateBookingFee(value),
            },
            {
              id: 2,
              name: "Delete Booking Fee",
              action: () => deleteBookingFee(value),
              // disabled: true
            },
          ];
          return <GlobalTableActions actions={actions} id="quotation-params" />;
        },
      },
    },
  ];
  return (
    <>
      <GlobalBallBeat loading={loading} />
      {!loading && (
        <GlobalTable
          columns={columns}
          data={bookingFeeParam}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
      {updateModal &&(<UpdateJobBookingFee activeId={activeApplicant.id} open={updateModal} close={()=>setUpdateModal(false)} data={activeApplicant}/>)}
      {deleteModal &&(<DeleteJobBookingFeeModal open={deleteModal} close={()=>setDeleteModal(false)} id={activeApplicant.id}/>)}
    </>
  );
};
export default BookingFeeTable;
