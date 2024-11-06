import React, { useState } from "react";
import styled from "styled-components";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../../../globalcomponents/Utilities";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useSendMessageToFmAdmin } from "../../../../../hooks/useQueries/useIdentity";

const CustomerSupport = ({ close, isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (values, actions) => {
    sendMessage(payload);
    actions.resetForm();
  };
  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      support: "",
      supportMessage: "",
    },
    onSubmit,
  });
  const payload = {
    messageType: values.support,
    message: values.supportMessage,
  };
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    close();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: sendMessage, isLoading: loading } = useSendMessageToFmAdmin(
    onSuccess,
    onFailed
  );

  return (
    <GlobalModal
      appElement={document.getElementById("app")}
      isOpen={isOpen}
      close={close}
    >
      <AltModalHeader heading="Send us a message" closeModal={close} />
      <ModalBody>
        <p>
          We are always eager to hear from our customers. Kindly send us a
          message, comments,or complaint using the form below. Our Customer
          Support Team will contact you shortly
        </p>
        <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
          <Fields>
            <GroupHeading style={{ fontFamily: "Roboto", fontWeight: "700" }}>
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
            </FormGroup>
          </Fields>
          <ContactAddressRow5>
            <GlobalInput
              height="118px"
              width="670px"
              labelColor="var(--clr-primary)"
              inputBgColor="#ffffff"
              inputName="supportMessage"
              id="supportMessage"
              inputplaceholder="Enter additional Information"
              inputValue={values.supportMessage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </ContactAddressRow5>

          <GlobalBtn
            className="mx-auto"
            type="submit"
            width="max-content"
            px="2rem"
            style={{ marginTop: "50px" }}
          >
            Send Message
          </GlobalBtn>
        </form>
      </ModalBody>
    </GlobalModal>
  );
};

export default CustomerSupport;

const ModalBody = styled.div`
  gap: 20px;

  && hr {
    width: 100%;
    height: 1px;
    color: #cccccc;
  }

  && h1 {
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

const ContactAddressRow5 = styled.div`
  padding: 0px;
  gap: 20px;

  width: 100%;
  height: 81px;
`;
