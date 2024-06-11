import React, { useState, useEffect } from "react";
import RacingBarChart from "./RacingBarChart";

function Testcontent({ data }) {
  const [start, setStart] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentQuarterIndex, setCurrentQuarterIndex] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setDisplayedData(data[currentQuarterIndex]);
    }
  }, [data, currentQuarterIndex]);

  useEffect(() => {
    let intervalId;

    if (start) {
      intervalId = setInterval(() => {
        setCurrentQuarterIndex(prevIndex => (prevIndex + 1) % data.length);
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [start, data]);

  return (
    <React.Fragment>
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={displayedData} />
      <button onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race!"}
      </button>
    </React.Fragment>
  );
}

export default Testcontent;
