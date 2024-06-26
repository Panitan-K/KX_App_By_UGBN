import React from 'react';
import './css/Slider.css';

const Slider2 = ({label,sublabel,lowLabel, highLabel, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const getColor = () => {
    const percentage = (value / 10) * 100;
    return `linear-gradient(to right, #1D5D3F 0%, #3DC384 ${percentage}%, #F2F2F2 ${percentage}%)`;
  };

  const sliderStyle = {
    background: getColor(),
  };

  return (
    
    <div className="slider-container">
          <h3>{label}</h3>
          <p>{sublabel}</p>
      <div className="label high-risk">{lowLabel}</div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={handleChange}
        className="slider"
        style={sliderStyle}
        step={1}
      />
      <div className="label low-risk">{highLabel}</div>
    
    </div>
  );
};

export default Slider2;
