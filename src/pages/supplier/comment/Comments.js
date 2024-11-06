import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";
import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import styled from "styled-components";

const Comments = ({ close }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values, actions) => {
    const payload = {
      messageType: values.support,
      chatMessage: values.supportMessage,
      fromUserId: "",
      toUserId: "",
    };

    actions.resetForm();
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      support: "",
      supportMessage: "",
    },
    onSubmit,
  });
  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <GlobalModal
      appElement={document.getElementById("app")}
      isOpen={true}
      close={true}
    >
      <AltModalHeader heading="Send us a message" closeModal={handleClick} />
      <ModalBody>
        <p>
          We are always eager to hear from our customers. Kindly send us a
          message, comments,or complaint using the form below. Our Customer
          Support Team will contact you shortly.
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
            width="300px"
            height="64px"
            buttonText="Send Message"
            buttonFont="22px"
          />
        </form>
      </ModalBody>
    </GlobalModal>
  );
};

export default Comments;

export const ModalBody = styled.div`
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
