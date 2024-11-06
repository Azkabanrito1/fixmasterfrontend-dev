import moment from "moment";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import styled from "styled-components";
import GlobalInput from "../../globalcomponents/GlobalInput";
import {
  useGetTicketInfo,
  useReplyTicket,
} from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";

const AddResponseModal = ({ open, close, headerText, data, ticketId }) => {
  const { data: ticketResponse, isLoading } = useGetTicketInfo(data?.ticketId);

  const onSubmit = async (values, actions) => {
    submitResponse(payload);
    actions.resetForm();
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      responseMessage: "",
    },
    onSubmit,
  });

  const payload = {
    ticketId: data?.ticketId,
    message: values.responseMessage,
  };

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    close();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
    close();
  };

  const { mutate: submitResponse, isLoading: isApproving } = useReplyTicket(
    onSuccess,
    onFailure
  );

  return (
    <>
      {/* {isLoading && (</>)} */}

      <GlobalModal
        isOpen={open}
        closeModal={close}
        shouldCloseOnOverlayClick={true}
      >
        <AltModalHeader
          closeModal={close}
          heading={headerText}
          alignText={`left`}
        />
        <form onSubmit={handleSubmit}>
          <InfoContainer>
            <InfoCard>
              <Title>Name</Title>
              <ParText>{ticketResponse?.data?.nameOfSender}</ParText>
            </InfoCard>
            <InfoCard>
              <Title>Comment Type</Title>
              <ParText>{ticketResponse?.data?.messageType}</ParText>
            </InfoCard>
            <InfoCard>
              <Title>Comment Date</Title>
              <ParText>
                {moment(ticketResponse?.data?.dateSent).format("DD-MM-YYYY")}
              </ParText>
            </InfoCard>
            <InfoCard>
              <Title>Response Date</Title>
              <ParText>
                {moment(
                  ticketResponse?.data?.followingResponses[0]?.dateSent
                ).format("DD-MM-YYYY")}
              </ParText>
            </InfoCard>
            <InfoCard>
              <Title>Response By</Title>
              <ParText>{data?.responseBy}</ParText>
            </InfoCard>
          </InfoContainer>
          <CommentCard>
            <Title>Comment</Title>
            <ParText>{ticketResponse?.data?.messages}</ParText>
          </CommentCard>
          <CommentCard>
            <Title>Add Response</Title>
            <GlobalInput
              width="100%"
              height="100px"
              inputPlaceholder={`Add Response Here...`}
              inputName="responseMessage"
              inputValue={values.responseMessage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <GlobalBtn
              className="mx-auto mt-4"
              type="submit"
              width="max-content"
              px="2rem"
            >
              SUBMIT
            </GlobalBtn>
          </CommentCard>
        </form>
      </GlobalModal>
    </>
  );
};
export default AddResponseModal;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  column-gap: 20px;
  row-gap: 10px;
  margin-bottom: 10px;
`;

const InfoCard = styled.div`
  width: 200px;
  margin-bottom: 30px;
`;
const Title = styled.h2`
  display: block;
  margin-bottom: 10px;
  color: var(--clr-primary);
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 20px;
`;
const ParText = styled.p`
  word-wrap: break-word;
`;
const CommentCard = styled.div`
  width: 100%;
  margin: 20px 0px;
`;
const Button = styled.button`
  background-color: var(--clr-primary);
  color: #fff;
  padding: 10px 0px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px 8px 8px 8px;
  margin: 20px 0px;
`;
