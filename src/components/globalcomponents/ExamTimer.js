import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ExamTimer = ({ timeValue, minutes, seconds }) => {
  const timeText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const value = minutes * 60 + seconds;

  return (
    <div style={{ marginBottom: "2rem", margin: "auto" }}>
      <div style={{ width: "100px", height: "100px", margin: "auto" }}>
        <CircularProgressbar
          value={value}
          maxValue={timeValue}
          text={timeText}
          styles={buildStyles({
            pathColor: "var(--clr-primary)",
            textColor: "#333",
            trailColor: "#D9D9DB",
            fontWeight: "bold",
          })}
        />
      </div>
    </div>
  );
};

export default ExamTimer;
