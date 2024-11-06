import styled from "styled-components";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import moment from "moment";
import {
  useGetTicketInfo,
  useReplyTicket,
} from "../../../hooks/useQueries/useIdentity";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { commentToMngtSchema } from "../../../Validations/registerValidations";

const ViewResponseModal = ({ open, close, headerText, data }) => {
  const { data: ticketResponse, isLoading } = useGetTicketInfo(data?.ticketId);
  const userId = ticketResponse?.data?.sentBy;
  const userName = ticketResponse?.data?.nameOfSender;

  const onSubmit = async (values, actions) => {
    submitResponse(payload);
    actions.resetForm();
  };

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        responseMessage: "",
      },
      validationSchema: commentToMngtSchema,
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

  const { mutate: submitResponse } = useReplyTicket(onSuccess, onFailure);

  return (
    <>
      <GlobalModal
        isOpen={open}
        closeModal={close}
        shouldCloseOnOverlayClick={true}
        width="85%"
      >
        <AltModalHeader
          closeModal={close}
          heading={headerText}
          alignText="left"
        />
        <GlobalBallBeat loading={isLoading} />
        {!isLoading && (
          <ChatContainer>
            <ChatCard className="collab-chat">
              <div>
                <span className="sender">
                  {ticketResponse?.data?.nameOfSender} (
                  {ticketResponse?.data?.userRole})
                </span>
                <br />
                <span className="chat-date">
                  {moment(ticketResponse?.data?.dateSent).format(
                    "DD-MM-YYYY, h:mm:ss a"
                  )}
                </span>
              </div>
              <p>{ticketResponse?.data?.messages}</p>
            </ChatCard>
            {ticketResponse?.data?.followingResponses.map((response, index) => {
              return (
                <ChatCard
                  key={index}
                  className={`${
                    response.sentBy === userId ? "collab-chat" : "admin-chat"
                  }`}
                >
                  <div>
                    <span className="sender">
                      {response.sentBy === userId
                        ? userName
                        : response.userRole}
                      {response.sentBy === userId
                        ? ` (${ticketResponse?.data?.userRole})`
                        : ""}
                    </span>
                    <br />
                    <span className="chat-date">
                      {moment(response.dateSent).format(
                        "DD-MM-YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <p>{response.response}</p>
                </ChatCard>
              );
            })}
          </ChatContainer>
        )}
        <Form onSubmit={handleSubmit}>
          <GlobalInput
            className="flex-grow-1"
            width="100%"
            height="70px"
            inputPlaceholder={`Add Response Here...`}
            inputName="responseMessage"
            inputValue={values.responseMessage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.responseMessage && errors.responseMessage}
            errorMessage={errors.responseMessage}
          />
          <GlobalBtn
            className="mx-auto align-self-start"
            type="submit"
            width="max-content"
            height="70px"
            px="2rem"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </GlobalBtn>
        </Form>
      </GlobalModal>
    </>
  );
};
export default ViewResponseModal;

const ChatCard = styled.div`
  display: block;
  width: 50%;
  min-width: 350px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: fit-content;
  }
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  row-gap: 30px;
`;
const Form = styled.form`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  background: white;
  width: 100%;
  position: sticky;
  bottom: -32px;
  left: 0;
  right: 0;
  column-gap: 10px;
`;
