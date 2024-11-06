import { useEffect, useState } from "react";
import {
  PageHeading,
  PreboardingContainer,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import GlobalCheckbox from "../../../components/globalcomponents/GlobalCheckbox";
import { FieldError } from "../../../components/globalcomponents/GlobalInput";
import { useFormik } from "formik";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { useAcceptOnboardingDecOrMsg } from "../../../hooks/useQueries/useOnboarding";
import { useGetUserMsgorDec } from "../../../hooks/useQueries/useAdmin";

const Declaration = () => {
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { data: decData } = useGetUserMsgorDec({
    category: "declaration",
    type: "preboarding",
  });

  const onAcceptSuccess = () => {
    enqueueSnackbar("Preboarding declarations accepted", {
      variant: "success",
    });
  };

  const onAcceptError = (error) => {
    enqueueSnackbar(error.data.message, {
      variant: "error",
    });
  };

  const { mutate: acceptDeclaration } = useAcceptOnboardingDecOrMsg({
    onSuccess: onAcceptSuccess,
    onFailed: onAcceptError,
    category: "declaration",
  });

  const { values, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {}, // Change this to an empty object
  });

  useEffect(() => {
    if (decData?.contents) {
      const initialValues = {};
      decData?.contents?.forEach((dec) => {
        initialValues[dec.id] = false;
        setFieldValue(dec.id, false);
      });
    }
  }, [decData?.contents, setFieldValue]);

  const declarationTemplate = decData?.contents?.map((declaration) => (
    <GlobalCheckbox
      key={declaration.id}
      labelText={declaration.content}
      inputName={declaration.id}
      inputValue={!!values[declaration.id]}
      handleBlur={handleBlur}
      handleChange={handleChange}
      checked={!!values[declaration.id]}
    />
  ));

  function handleClick() {
    setError("");

    if (Object.values(values).some((dec) => !dec)) {
      setError("Please accept all the terms");
      return;
    }

    acceptDeclaration();
  }

  return (
    <>
      <PreboardingContainer>
        <Content>
          <PageHeading>Pre-boarding Declarations</PageHeading>
          <p className="mb-5">
            Please agree the following statements to continue
          </p>
          {!!decData?.contents?.length && <div>{declarationTemplate}</div>}
          {error && (
            <FieldError align={"center"} ml={"0"} fs={"20px"}>
              {error}
            </FieldError>
          )}
        </Content>

        {!!decData?.contents?.length && (
          <GlobalBtn
            onClick={handleClick}
            disabled={Object.values(values).some((dec) => !dec)}
            mx="auto"
            height="auto"
            size="large"
            py="16px"
          >
            Accept
          </GlobalBtn>
        )}
      </PreboardingContainer>
    </>
  );
};

export default Declaration;

const Content = styled.div`
  width: min(100%, 750px);
  margin-inline: auto;
`;
