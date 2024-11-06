import styled from "styled-components";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useDeleteJobBookingFee } from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";

const DeleteJobBookingFeeModal = ({ open, close, id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    close();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: deleteBookingFee } = useDeleteJobBookingFee(
    onSuccess,
    onFailure
  );

  return (
    <GlobalModal isOpen={open} closeModal={close}>
      <AltModalHeader closeModal={close} />
      <Card>
        <div>
          <i className="fa-regular fa-circle-xmark text-danger border-0 display-1"></i>
        </div>
        <InfoCard className="my-4">
          <p>Do you want to delete this job booking fee?</p>
          <p className="fw-bold">This process is irreversible!</p>
        </InfoCard>
        <div>
          <XButton onClick={close} className="border-0">
            Cancel
          </XButton>
          <DelButton className="border-0" onClick={() => deleteBookingFee(id)}>
            Delete
          </DelButton>
        </div>
      </Card>
    </GlobalModal>
  );
};

export default DeleteJobBookingFeeModal;

const InfoCard = styled.div`
  text-align: center;
  font-size: 1.3rem;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DelButton = styled.button`
  font-size: 1.5rem;
  padding: 5px 25px;
  margin-left: 5px;
  background-color: rgb(220, 53, 69);
  color: white;
  transition: all linear 0.3s;
  border-radius: 10px;
  &:hover {
    background-color: #ddd;
    color: red;
  }
`;
const XButton = styled.button`
  font-size: 1.5rem;
  padding: 5px 25px;
  margin-right: 5px;
  transition: all linear 0.3s;
  border-radius: 10px;
  background-color: #ccc;
  &:hover {
    background-color: black;
    color: white;
  }
`;
