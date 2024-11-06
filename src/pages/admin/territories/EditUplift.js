import { useParams } from "react-router-dom";
import UpliftForm from "../../../components/admincomponents/territories/UpliftForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetUpliftDetails } from "../../../hooks/useQueries/useAdmin";

const EditUplift = () => {
  const { id, bonusId } = useParams();
  const { data: details, isLoading } = useGetUpliftDetails(bonusId);

  const initialValues = details?.data;

  const collaborators = [
    { id: 1, name: "CSE" },
    { id: 2, name: "Franchisee" },
    { id: 3, name: "QA Master" },
    { id: 4, name: "Technician" },
    { id: 5, name: "CCO" },
    { id: 6, name: "Supplier" },
  ];

  const createUpdateUplift = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <div className="mb-5">
        <PageHeading>Edit Bonus</PageHeading>
        <BackBtn />
      </div>

      <UpliftForm
        collaborators={collaborators}
        createUpdateUplift={createUpdateUplift}
        initialValues={initialValues}
        isLoading={isLoading}
        territoryId={id}
      />
    </>
  );
};

export default EditUplift;
