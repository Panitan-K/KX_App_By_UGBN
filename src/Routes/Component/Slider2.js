import React from 'react';
import './css/SliderX.css';

const Slider2 = ({label,sublabel,lowLabel, highLabel, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const getColor = () => {
    const percentage = (value / 10) * 100;
  
    if (percentage === 100) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 ${percentage}%, #F2F2F2 ${percentage}%)`;
    }
    else if (percentage === 90) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 85%, #F2F2F2 12%)`;
    }
    else if (percentage === 80) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 75%, #F2F2F2 25%)`;
    }
    else if (percentage === 70) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 68%, #F2F2F2 32%)`;
    }
    else if (percentage === 60) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 60%, #F2F2F2 40%)`;
    }
    else if (percentage === 50) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 50%, #F2F2F2 50%)`;
    }
    else if (percentage === 40) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 40%, #F2F2F2 40%)`;
    }
    else if (percentage === 30) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 33%, #F2F2F2 33%)`;
    }
    else if (percentage === 20) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 22%, #F2F2F2 22%)`;
    }
    else if (percentage === 10) {
      return `linear-gradient(to right, #1D5D3F 0%, #3DC384 15%, #F2F2F2 15%)`;
    }
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
        min={0.0}
        max={10.0}
        value={value}
        onChange={handleChange}
        className=""
        style={sliderStyle}
        step={1}
      />
      <div className="label low-risk">{highLabel}</div>
    
    </div>
  );
};

export default Slider2;
