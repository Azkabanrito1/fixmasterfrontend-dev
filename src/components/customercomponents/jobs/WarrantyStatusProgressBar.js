import GlobalProgressBar from "../../globalcomponents/GlobalProgressBar";
import differenceInDays from "date-fns/differenceInDays";

const WarrantyProgressBar = ({
  warrantyDuration = 10,
  jobCompletionDate = "2023-07-15",
}) => {
  const now = new Date();
  const completion = new Date(jobCompletionDate);

  const gone = differenceInDays(completion, now);
  const daysElapsed = (gone * 100) / warrantyDuration;
  const daysLeft = warrantyDuration - gone;

  return (
    <GlobalProgressBar
      percent={daysElapsed}
      text={`${daysLeft} days left`}
      bgColor="#c4f9e0"
      progressBarColor="#11e981"
    />
  );
};

export default WarrantyProgressBar;
