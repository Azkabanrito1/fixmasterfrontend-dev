import { Stack } from "@mui/material";
import { GroupHeading } from "../../globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { Link } from "react-router-dom";
import TerritoryTable from "./TerritoryTable";

const TerritorySection = ({ data, isLoading }) => {
  const shortData = data?.slice(0, 5);

  return (
    <Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <GroupHeading>Territory Management</GroupHeading>
        <Link to={PATH_ADMIN.territory} className="orange">
          See All
        </Link>
      </Stack>

      <TerritoryTable territories={shortData} isLoading={isLoading} />
    </Stack>
  );
};

export default TerritorySection;
