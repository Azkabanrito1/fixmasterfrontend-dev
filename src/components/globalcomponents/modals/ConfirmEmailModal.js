import { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { useSnackbar } from "notistack";
import { useTimer } from "react-timer-hook";
import { Button } from "@mui/material";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import {
  useConfirmEmail,
  useResendVerificationToken,
} from "../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../layouts/modal/ModalHeader";
import GlobalInput from "../GlobalInput";
import { FormGroup } from "../Utilities";

function ConfirmEmailModal({ open, close, onVerify, offsetTime }) {
  const [email, setEmail] = useState("");
  const [showResendLink, setShowResendLink] = useState(false);

  const { minutes, seconds, restart } = useTimer({
    expiryTimestamp: offsetTime,
    onExpire: () => setShowResendLink(true),
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let savedEmail = localStorage.getItem("emailSaved");
    if (savedEmail) savedEmail = JSON.parse(savedEmail);

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const onResendSuccess = (response) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 300);

    restart(now);
    setShowResendLink(false);
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onResendError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: resendVerificationToken } = useResendVerificationToken(
    onResendSuccess,
    onResendError
  );

  const onConfirmSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    localStorage.removeItem("emailSaved");
    onVerify();
  };
  const onConfirmError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: confirmEmail } = useConfirmEmail(
    onConfirmSuccess,
    onConfirmError
  );

  const onSubmit = async () => {
    const token = values.token;
    const payload = {
      email: email,
      token: token,
    };

    confirmEmail(payload);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit,
  });

  const resendToken = async () => {
    resendVerificationToken(email);
  };

  return (
    <GlobalModal
      isOpen={open}
      closeModal={close}
      shouldCloseOnOverlayClick={false}
      width="500px"
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader title="Verify Your Account" />

        <div className="text-center my-3">
          <p className="fs-5">
            Enter the verification code sent to your email/phone number
          </p>
          <FormGroup columns="1">
            <GlobalInput
              inputName="token"
              labelText="Token"
              inputValue={values.token}
              handleChange={handleChange}
              pattern="[0-9]*"
              required={true}
            />
          </FormGroup>

          <div className="text-center my-3 fs-6">
            {!showResendLink && (
              <span className="fs-5 me-2">
                {minutes}min:{seconds}s
              </span>
            )}
            <span style={{ color: showResendLink ? "#000" : "#ccc" }}>
              Didn’t get the code, click{" "}
              <Button
                href="#"
                sx={{
                  color: "var(--clr-primary)",
                  p: 0,
                  minWidth: "max-content",
                  lineHeight: 1,
                }}
                type="button"
                onClick={resendToken}
                disabled={!showResendLink}
              >
                HERE
              </Button>{" "}
              to resend
            </span>
          </div>

          <GlobalBtn width="max-content" px="2.5rem" mx="auto" type="submit">
            Verify my account
          </GlobalBtn>
        </div>
      </form>
    </GlobalModal>
  );
}

export default ConfirmEmailModal;

const Boxes = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 1rem;
`;

const BoxOne = styled.div`
  display: flex;
  align-items: center;

  input {
    appearance: none;
    -webkit-appearance: none;
    margin-right: 10px;
    width: 50px;
    aspect-ratio: 1;
    text-align: center;

    border: 1px solid var(--clr-primary);
    border-radius: 12px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;

const IconSpaceImg = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 30px;
    object-fit: cover;
  }
`;
