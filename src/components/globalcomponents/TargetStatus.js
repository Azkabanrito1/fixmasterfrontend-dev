import { Box, Stack } from "@mui/material";
import { BiHourglass } from "react-icons/bi";
import GlobalProgressBar from "./GlobalProgressBar";

const TargetProgress = ({ achieved, target, title }) => {
  const percentage = (achieved / target) * 100;

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <BiHourglass color="var(--clr-primary)" fontSize="30px" />
      <Stack flex={1}>
        <Stack direction="row" justifyContent="space-between">
          <h4 className="fw-normal fs-6">{title}</h4>
          <span>{`${achieved}/${target}`}</span>
        </Stack>
        <GlobalProgressBar
          percent={percentage || 0}
          bgColor={"#F6E7E0"}
          progressBarColor="#F26222"
        />
      </Stack>
    </Stack>
  );
};

const TargetStatus = ({ data }) => {
  return (
    <Box p={2}>
      <h3 className="mb-4 fs-5">Fix Target Status</h3>
      <Stack spacing={1.5}>
        <TargetProgress
          title="Today"
          achieved={+data?.todayFix}
          target={+data?.dailyTarget}
        />
        <TargetProgress
          title="This Month"
          achieved={+data?.monthFix}
          target={+data?.monthlyTarget}
        />
      </Stack>
    </Box>
  );
};

export default TargetStatus;
