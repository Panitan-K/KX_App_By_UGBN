import React from 'react';
import './css/Slider.css';

const Slider = ({label,lowLabel, highLabel, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const getColor = () => {
    const percentage = (value / 10) * 100;
    return `linear-gradient(to right, #1D5D3F ${percentage}%, #3DC384 ${percentage}%, #3DC384 ${percentage}%, transparent ${percentage}%, transparent 100%)`;
  };

  const sliderStyle = {
    background: getColor(),
  };

  return (
    <div className="slider-container">
      <div className="label high-risk">{lowLabel}</div>
      <input
        type="range"
        min={0.0}
        max={10.0}
        value={value}
        onChange={handleChange}
        className="slider"
        style={sliderStyle}
        step={0.1}
      />
      <div className="label low-risk">{highLabel}</div>
      <p>{label}: {value}/10</p>
    </div>
  );
};

export default Slider;
