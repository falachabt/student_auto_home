import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const styles = buildStyles({
  rotation: 0.75,
});

const CircularProgress = () => {
  return (
    <div style={{ height: 200, width: 200 }}>
      <CircularProgressbar
        value={75}
        text={`${75}%`}
        styles={styles}
        strokeWidth={10}
        circleRatio={0.5}
      />
    </div>
  );
};

export default CircularProgress;
