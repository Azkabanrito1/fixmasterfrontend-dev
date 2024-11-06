import React from "react";
import styled from "styled-components";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import {
  PageHeading,
  PreboardingContainer,
} from "../../globalcomponents/Utilities";
import { FieldError } from "../../globalcomponents/GlobalInput";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import { useState } from "react";
import useLoginDetails from "../../../hooks/useLoginDetails";
import {
  useAcceptOnboardingDecOrMsg,
  // useGetStageId,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useFormik } from "formik";
import useDashboardRouter from "../../../hooks/useDashboardRouter";
import { useGetUserMsgorDec } from "../../../hooks/useQueries/useAdmin";

const PostDeclaration = () => {
  const [error, setError] = useState("");
  const { role } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();
  const router = useDashboardRouter();

  const { data: decData } = useGetUserMsgorDec({
    category: "declaration",
    type: "onboarding",
  });

  const onAcceptSuccess = () => {
    enqueueSnackbar("Onboarding declarations accepted", {
      variant: "success",
    });
    // router(role);
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

  useEffect(() => {
    if (decData?.contents) {
      decData?.contents?.map((dec) => {
        setFieldValue([dec.id], false);
      });
    }
  }, [decData?.contents]);

  const { values, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {},
  });

  const declarationTemplate = decData?.contents?.map((declaration) => (
    <GlobalCheckbox
      key={declaration.id}
      labelText={declaration.content}
      inputName={declaration.id}
      inputValue={values[declaration.id]}
      handleBlur={handleBlur}
      handleChange={handleChange}
    />
  ));

  function handleClick() {
    setError("");

    if (Object.values(values).some((dec) => !dec)) {
      setError("Please accept all the terms");
      return;
    }

    acceptDeclaration("category");
  }

  return (
    <>
      <PreboardingContainer>
        <Content>
          <PageHeading>Onboarding Declarations</PageHeading>
          <p className="mb-5">
            Please agree the following statements to continue
          </p>
          <div>{declarationTemplate}</div>
          {error && (
            <FieldError align={"center"} ml={"0"} fs={"20px"}>
              {error}
            </FieldError>
          )}
        </Content>
        {/* {onboarding?.stageName?.includes(
          "welcome" || "passed mcq interview"
        ) && ( */}
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
      </PreboardingContainer>
    </>
  );
};

export default PostDeclaration;

const Content = styled.div`
  width: min(100%, 750px);
  margin-inline: auto;
`;
