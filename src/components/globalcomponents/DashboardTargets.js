import { Box, Grid } from "@mui/material";
import TargetAndBonus from "./TargetAndBonus";
import TargetStatus from "./TargetStatus";

const DashboardTargets = ({ dashBoardData }) => {
  const targets = {
    daily: dashBoardData?.dailyTarget,
    monthly: dashBoardData?.monthlyTarget,
  };

  const bonuses = {
    daily: dashBoardData?.dailyEarnedBonus,
    monthly: dashBoardData?.monthlyEarnedBonus,
  };

  const targetStatus = {
    todayFix: dashBoardData?.thisDayCompletedJobs,
    dailyTarget: dashBoardData?.dailyTarget,
    monthFix: dashBoardData?.thisMonthCompletedJobs,
    monthlyTarget: dashBoardData?.monthlyTarget,
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        bgcolor: "#fff",
        borderRadius: "1rem",
        "& > div:first-of-type": {
          borderBottom: "2px dashed var(--clr-primary)",
        },
      }}
    >
      <Grid
        container
        sx={{
          "& > div:first-of-type": {
            borderRight: "2px dashed var(--clr-primary)",
          },
        }}
      >
        <TargetAndBonus type="target" data={targets} title="Fix Target" />
        <TargetAndBonus type="bonus" data={bonuses} title="Target Bonus" />
      </Grid>
      <TargetStatus data={targetStatus} />
    </Box>
  );
};

export default DashboardTargets;
