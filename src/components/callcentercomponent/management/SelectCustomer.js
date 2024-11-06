import { Rating } from "@mui/material";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { InfoTable } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { useState } from "react";
import { useSnackbar } from "notistack";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { IndividualRow } from "../../franchiseecomponents/csemanagement/modals/AssignFixToCse";

const SelectCustomer = ({ isOpen, closeModal }) => {
  const [customerId, setCustomerId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [searchStr, setSearchStr] = useState("");

  const customersData = [
    {
      id: 1,
      name: "John Phillipson",
      rating: 0,
    },
    {
      id: 2,
      name: "Jonathan Johnson",
      rating: 5,
    },
    {
      id: 3,
      name: "Kent Green",
      rating: 0,
    },
  ];

  let filteredResults = customersData?.filter((customer) =>
    `${customer?.name}`?.toLowerCase().includes(searchStr.toLowerCase())
  );

  const updateSelected = (id) => {
    setCustomerId(id);
  };

  const IndividualCustomer = ({ applicant, selected, updateSelected }) => {
    return (
      <IndividualRow onClick={() => updateSelected(applicant.id)}>
        <td>
          <GlobalCheckbox
            handleChange={() => updateSelected(applicant.id)}
            checked={applicant.id === selected}
            bRad="50%"
            mb="0"
          />
        </td>
        <td className="image-row">
          <span className="fw-bold">{applicant.name}</span>
        </td>
        <td className="text-center">
          <Rating name="read-only" value={applicant.rating * 20} readOnly />
        </td>
      </IndividualRow>
    );
  };
  const template = filteredResults?.map((applicant) => {
    return (
      <IndividualCustomer
        applicant={applicant}
        key={applicant.id}
        updateSelected={updateSelected}
        selected={customerId}
      />
    );
  });
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      {/* <GlobalS */}
      <AltModalHeader heading="Select Customer" closeModal={closeModal} />
      <section className="mb-3">
        <GlobalInput
          handleChange={(e) => setSearchStr(e.target.value)}
          iconSrc="/images/search.png"
          inputPlaceholder="Search..."
        />
      </section>

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
        // onClick={() => assignapplicant()}
        // disabled={isAssigning}
      >
        Proceed
      </GlobalBtn>

      <GlobalFullScreenLoader />
    </GlobalModal>
  );
};

export default SelectCustomer;
