import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import MedialLink from "./MedialLink";

const FiteredRef = ({ referralCodeData }) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const inputRef = useRef(null);

  const { values, setFieldValue } = useFormik({
    initialValues: {
      copy: "",
      share: "",
    },
  });

  useEffect(() => {
    if (referralCodeData) {
      setFieldValue("copy", referralCodeData?.referralCode);
      setFieldValue(
        "share",
        `${window.location.host}/sign-up/${referralCodeData.referralCode}`
      );
    }
  }, [referralCodeData]);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");

      // Deselect the text
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <>
      <Container>
        <InputGroup>
          <InputDiv>
            <label>Your Referral Link</label>
            <div>
              <input name="share" value={values.share} readOnly />
              <button onClick={() => setOpenShareModal(true)}>Share</button>
            </div>
          </InputDiv>

          <InputDiv>
            <label>Your Referral Code</label>
            <div>
              <input name="copy" value={values.copy} ref={inputRef} readOnly />
              <button onClick={handleCopy}>Copy</button>
            </div>
          </InputDiv>
        </InputGroup>
        {/* <FilterGroup>
          <GlobalSelect
            selectName="filter"
            options={referralCodeData?.data?.referralDetails}
            defaultOption="Select"
            handleChange={(e) => setFilter(e.target.value)}
            width="300px"
            height="56px"
          />
          <Filtered setFilter={setFilterClass} filter={filterClass} />
        </FilterGroup> */}
      </Container>
      {openShareModal && (
        <MedialLink
          isOpen={openShareModal}
          closeModal={() => setOpenShareModal(false)}
          link={`${window.location.host}/sign-up/${referralCodeData.referralCode}`}
        />
      )}
    </>
  );
};

export default FiteredRef;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 20px;

  > div {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      padding: 15px;
      text-align: center;
      border-radius: 10px 0px 0px 10px;
      border: 1px solid var(--clr-primary);
      margin: 0;
      font-size: 16px; /* Optional: increase font size for better readability */
    }

    button {
      padding: 15px;
      background: var(--clr-primary);
      color: #ffffff;
      border: none;
      border-radius: 0px 10px 10px 0px;
      cursor: pointer;
      font-size: 16px; /* Optional: increase font size for better readability */
    }
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
`;
