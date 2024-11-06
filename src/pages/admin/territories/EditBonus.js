import { useParams } from "react-router-dom";
import BonusesForm from "../../../components/admincomponents/territories/BonusesForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetBonusDetails } from "../../../hooks/useQueries/useAdmin";
import {
  targetIntervals,
  bonusTypes,
  collaborators,
} from "../../../utils/selectOptions";

const EditBonus = () => {
  const { id, bonusId } = useParams();
  const { data: details, isLoading } = useGetBonusDetails(bonusId);

  const initialValues = details?.data;

  const createUpdateBonus = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <div className="mb-5">
        <PageHeading>Edit Bonus</PageHeading>
        <BackBtn />
      </div>

      <BonusesForm
        collaborators={collaborators}
        createUpdateBonus={createUpdateBonus}
        initialValues={initialValues}
        intervals={targetIntervals}
        isLoading={isLoading}
        territoryId={id}
        valueTypes={bonusTypes}
      />
    </>
  );
};

export default EditBonus;
