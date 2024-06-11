import React, { useState, useEffect } from "react";
import RacingBarChart from "./RacingBarChart";
import styles from "./css/Racing.module.css";

function Testcontent({ data }) {
  const [start, setStart] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setDisplayedData(data[0].data);
    }
  }, [data]);

  useEffect(() => {
    if (start && !gameOver) {
      const interval = setInterval(() => {
        setCurrentQuarter(prevQuarter => {
          if (prevQuarter + 1 < data.length) {
            return prevQuarter + 1;
          } else {
            setStart(false);
            setGameOver(true);
            return prevQuarter;
          }
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [start, data, gameOver]);

  useEffect(() => {
    if (data.length > 0 && !gameOver) {
      setDisplayedData(data[currentQuarter].data);
    }
  }, [currentQuarter, data, gameOver]);

  const handleStartStop = () => {
    if (gameOver) {
      setGameOver(false);
      setCurrentQuarter(0);
      setDisplayedData(data[0].data);
    }
    setStart(!start);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={displayedData} />
      {gameOver ? (
        <div>
          <h2>Game is over</h2>
          <button className={styles.button} onClick={handleStartStop}>
            {start ? "Stop the race" : "Start the race!"}
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={handleStartStop}>
          {start ? "Stop the race" : "Start the race!"}
        </button>
      )}
    </div>
  );
}

export default Testcontent;
