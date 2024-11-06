import styled from "styled-components";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useState } from "react";
import { InfoTable } from "../../../globalcomponents/Utilities";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import {
  useAssignJobToCse,
  useGetAllCse,
} from "../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import { Rating } from "@mui/material";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";

const AssignFixToCse = ({ fixId, isOpen, closeModal }) => {
  const [cseId, setCseId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data: cseData } = useGetAllCse();

  //--------------------------------------------mutatefn----------------------------------
  const onSuccess = (response) => {
    if (response.message.includes("previously assigned")) {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      closeModal();
    }
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: assignCSEs, loading: isAssigning } = useAssignJobToCse(
    fixId,
    onSuccess,
    onFailure
  );

  const CseIndividual = ({ cse, selected, updateSelected }) => {
    return (
      <IndividualRow onClick={() => updateSelected(cse.id)}>
        <td>
          <GlobalCheckbox
            handleChange={() => updateSelected(cse.id)}
            checked={cse.id === selected}
            bRad="50%"
            mb="0"
          />
        </td>
        <td className="image-row">
          <div className="image">
            {/* <img src={cse.profilePic} alt="cse profile picture" /> */}
          </div>
          <span className="fw-bold">{cse.firstName + " " + cse.lastName}</span>
        </td>
        <td className="text-center">
          <Rating name="read-only" value={cse.rating * 20} readOnly />
        </td>
        <td className="text-center">{cse.territoryName}</td>
      </IndividualRow>
    );
  };

  const updateSelected = (id) => {
    setCseId(id);
  };
  const assignCSE = () => {
    const payload = {
      fixId,
      cseId,
    };
    assignCSEs(payload);
  };
  const template = cseData?.data?.map((cse) => {
    return (
      <CseIndividual
        cse={cse}
        key={cse.id}
        updateSelected={updateSelected}
        selected={cseId}
      />
    );
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Assign CSE" closeModal={closeModal} />

      <InfoTable minWidth={"450px"}>
        <colgroup>
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center" colSpan={"2"}>
              Name/Avi
            </th>
            <th className="text-center">Ratings</th>
            <th className="text-center">Territory Name</th>
          </tr>
        </thead>
        <tbody>{template}</tbody>
      </InfoTable>

      <GlobalBtn
        width="80%"
        mx="auto"
        height="auto"
        py="1rem"
        className="mt-4"
        onClick={() => assignCSE()}
        disabled={isAssigning}
      >
        Assign CSE
      </GlobalBtn>

      <GlobalFullScreenLoader open={isAssigning} />
    </GlobalModal>
  );
};

export default AssignFixToCse;

export const IndividualRow = styled.tr`
  .image {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .image-row {
    display: flex;
    align-items: center;
  }
`;
