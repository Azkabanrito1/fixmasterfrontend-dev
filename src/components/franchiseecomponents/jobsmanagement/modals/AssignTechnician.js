import { useState } from "react";
import styled from "styled-components";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import { Star } from "../../../globalcomponents/RatingStars";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { InfoTable, NoData } from "../../../globalcomponents/Utilities";
import { IndividualRow } from "../../csemanagement/modals/AssignFixToCse";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import {
  useAssignJobsToTechnician,
  useGetAllTechnicians,
} from "../../../../hooks/useQueries/useJobs";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const AssignTechnician = ({
  assignedTechnicians,
  isOpen,
  closeModal,
  fixId,
}) => {
  const [searchStr, setSearchStr] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [selected, setSelected] = useState(assignedTechnicians);
  const { enqueueSnackbar } = useSnackbar();

  //---------------------data fetching------------
  const { data: allTechniciansData } = useGetAllTechnicians(fixId);

  //---------------------mutate callback------------
  const onSuccess = () => {
    enqueueSnackbar("Technician assigned successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  //---------------------mutationFn-------------
  const { mutate: assignTech } = useAssignJobsToTechnician(
    onSuccess,
    onFailure
  );

  let filteredResults = allTechniciansData?.data?.filter((tech) =>
    tech?.categoryName?.toLowerCase().includes(searchStr.toLowerCase())
  );

  if (specialization !== "") {
    filteredResults = filteredResults?.filter((tech) =>
      tech.categoryName?.toLowerCase().includes(specialization.toLowerCase())
    );
  }
  const specializationlist = new Set(specializations);
  // console.log(filteredResults);
  const handleAssignTechnician = () => {
    const payload = {
      fixId,
      technicianId: selectedArr,
    };
    assignTech(payload);
  };

  const updateSelected = (id) => {
    if (selected?.filter((tech) => tech.id === id)?.length > 0) {
      setSelected((prev) => prev?.filter((tech) => tech.id !== id));
    } else {
      setSelected((prev) => [
        ...prev,
        ...filteredResults?.filter((tech) => tech?.id === id),
      ]);
    }
  };

  useEffect(() => {
    if (assignedTechnicians) {
      const techspecial = assignedTechnicians?.map((item) => {
        return {
          id: item.id,
          name: item.categoryName,
        };
      });
      setSpecializations(techspecial);
    }
  }, [assignedTechnicians]);
  const selectedArr = selected?.map((item) => {
    return item?.id;
  });

  const Technician = ({ technician, updateSelected }) => {
    return (
      <TechnicianRow>
        <td className="image-row">
          <GlobalCheckbox
            handleChange={() => updateSelected(technician.id)}
            checked={
              selected?.filter((tech) => tech.id === technician.id)?.length > 0
            }
            mb="0"
            disabled={!fixId}
          />
          <span className="fs-6 fw-bold">{`${technician.firstName} ${technician.lastName}`}</span>
        </td>
        <td className="text-center">
          <Star percent={technician.rating * 20 || 0} />
        </td>
        <td className="text-center">{technician.categoryName}</td>
        <td className="text-center">
          {technician.distanceToFixLocation.toLocaleString("en-US")}m
        </td>
        <td className="text-center">
          {technician.showedInterest ? (
            <i className="fa fa-check text-success"></i>
          ) : (
            <i className="fa fa-times text-success"></i>
          )}
        </td>
        <td className="action pe-1">
          <button>
            <a href={`tel:${technician.phoneNumber}`}>
              `<i className="fa fa-phone"></i>`
            </a>
          </button>
        </td>
      </TechnicianRow>
    );
  };

  const tbodyTemplate = filteredResults?.map((tech) => (
    <Technician
      key={tech.id}
      technician={tech}
      updateSelected={updateSelected}
    />
  ));

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={"1000px"}>
      <AltModalHeader title="Assign Technician" closeModal={closeModal} />

      <section className="d-flex align-items-center justify-content-between mb-5">
        <GlobalInput
          handleChange={(e) => setSearchStr(e.target.value)}
          iconSrc="/images/search.png"
          inputPlaceholder="Search..."
        />

        <GlobalSelect
          options={[...specializationlist]}
          defaultOption="Choose a specialization"
          valueType="string"
          handleChange={(e) => setSpecialization(e.target.value)}
        />
      </section>

      <InfoTable>
        <colgroup>
          <col width={"20%"} />
          <col width={"15%"} />
          <col width={"15%"} />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <td className="text-center fw-bold">Name</td>
            <td className="text-center fw-bold">Ratings</td>
            <td className="text-center fw-bold">Specialization</td>
            <td className="text-center fw-bold">Distance To Job</td>
            <td className="text-center fw-bold">Interested</td>
            <td className="fw-bold">Actions</td>
          </tr>
        </thead>
        <tbody>
          {filteredResults?.length > 0 ? (
            tbodyTemplate
          ) : (
            <NoData cols={5} dataName="Technicians" />
          )}
        </tbody>
      </InfoTable>

      {selected?.length > 0 && (
        <GlobalBtn
          mx="auto"
          my="1rem"
          type="submit"
          onClick={handleAssignTechnician}
        >
          Assign
        </GlobalBtn>
      )}
    </GlobalModal>
  );
};

export default AssignTechnician;

const TechnicianRow = styled(IndividualRow)`
  button {
    appearance: none;
    margin-left: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;

    &:active,
    &:focus {
      outline: 1px solid var(--clr-primary);
    }
  }

  i {
    display: inline-block;
    color: var(--clr-primary);
    font-size: 1.5rem;
  }
`;
