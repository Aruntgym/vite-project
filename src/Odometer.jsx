import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Slider from "@mui/material/Slider";
import "react-circular-progressbar/dist/styles.css";

const Speedometer = ({ value }) => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${value} Mbps`}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: "round",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `#6a1b9a`,
          textColor: "black",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

const Odometer = ({ value }) => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${value} Mbps`}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: "round",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `#6a1b9a`,
          textColor: "black",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

function Appodometer() {
  const [speed, setSpeed] = useState(85.7);
  const [showSpeedometer, setShowSpeedometer] = useState(true);

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const toggleComponent = () => {
    setShowSpeedometer(!showSpeedometer);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showSpeedometer ? (
        <Speedometer value={speed} />
      ) : (
        <Odometer value={speed} />
      )}
      <div style={{ width: "50%", marginTop: "20px" }}>
        <Slider
          value={speed}
          onChange={handleSpeedChange}
          min={0}
          max={100}
          aria-labelledby="speed-slider"
          valueLabelDisplay="auto"
          style={{ color: "#6a1b9a" }}
        />
      </div>
      {/* <button
        onClick={toggleComponent}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6a1b9a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Button
      </button> */}
    </div>
  );
}

export default Appodometer;
