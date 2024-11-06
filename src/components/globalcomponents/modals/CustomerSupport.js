import React from "react";
import styled from "styled-components";
import GlobalModal from "../GlobalModal";
import { Fields, FormGroup, GroupHeading } from "../Utilities";
import { useFormik } from "formik";
import { sendMessage } from "../../../redux/user/actions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../GlobalTextArea";
import GlobalBtn from "../GlobalBtn";

const CustomerSupport = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values, actions) => {
    const payload = {
      messageType: values.support,
      chatMessage: values.supportMessage,
      fromUserId: "",
      toUserId: "",
    };

    const response = dispatch(sendMessage(payload));

    if (!response.status) {
      enqueueSnackbar(" Message has been sent successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    actions.resetForm();
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      support: "",
      supportMessage: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} close={closeModal}>
      <AltModalHeader heading="Send us a message" closeModal={closeModal} />
      <ModalBody>
        <p>
          Send us your complaint, suggestion or recommendation. Our customer
          care support team will get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
          <Fields>
            <GroupHeading>
              Please indicate the type of comment you want to send us
            </GroupHeading>
            <FormGroup columns="1" mb="24px">
              <div
                role="group"
                aria-labelledby="support-radio-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "400px",
                  gap: "30px",
                  textAlign: "center",
                }}
              >
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="support"
                    value={"complaint"}
                    checked={values.support === "complaint"}
                  />
                  Complaints
                </label>

                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="support"
                    value={"suggestion"}
                    checked={values.support === "suggestion"}
                  />
                  Suggestions
                </label>

                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="support"
                    value={"recommendation"}
                    checked={values.support === "recommendation"}
                  />
                  Recommendations
                </label>
              </div>

              <GlobalTextArea
                labelColor="var(--clr-primary)"
                inputBgColor="#ffffff"
                inputName="supportMessage"
                id="supportMessage"
                inputplaceholder="Enter additional Information"
                inputValue={values.supportMessage}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <GlobalBtn mx="auto" width="max-content" px="3.5em" type="submit">
                Send Message
              </GlobalBtn>
            </FormGroup>
          </Fields>
        </form>
      </ModalBody>
    </GlobalModal>
  );
};

export default CustomerSupport;

const ModalBody = styled.div`
  gap: 20px;

  & hr {
    width: 100%;
    height: 1px;
    color: #cccccc;
  }

  & h1 {
    width: 400px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 16px;
    margin-top: 2rem;
    margin-bottom: 2rem;

    color: var(--clr-primary);

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin-top: 10px;
  }
`;
