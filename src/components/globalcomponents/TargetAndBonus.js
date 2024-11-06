import PropTypes from "prop-types";
import { Grid, Stack } from "@mui/material";
import { FiTarget } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";

const Stat = ({ data, title, type }) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {type === "target" ? (
        <FiTarget fontSize="30px" color="var(--clr-primary)" />
      ) : (
        <TbTargetArrow fontSize="30px" color="#006717" />
      )}
      <Stack>
        <h4 className="fw-normal fs-6">{title}</h4>
        <span
          className="fs-4 ms-2"
          style={{
            color: type === "target" ? `var(--clr-primary)` : "#006717",
          }}
        >
          {typeof data !== "undefined" ? String(data) : "N/A"}
        </span>
      </Stack>
    </Stack>
  );
};

const TargetAndBonus = ({ type, data, title }) => {
  // console.log(data);
  return (
    <Grid xs={6} item={true} p={2}>
      <div>
        <h3 className="mb-4 fs-5">{title}</h3>
        <Stack spacing={2}>
          <Stat type={type} title="Today" data={data?.daily} />
          <Stat type={type} title="This Month" data={data?.monthly} />
        </Stack>
      </div>
    </Grid>
  );
};

export default TargetAndBonus;

TargetAndBonus.propTypes = {
  type: PropTypes.oneOf(["bonus", "target"]).isRequired,
  data: PropTypes.shape({
    daily: PropTypes.number,
    monthly: PropTypes.number,
  }).isRequired,
};
