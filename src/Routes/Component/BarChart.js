import React from 'react';

const BarChart = ({ tickets, width, height }) => {
  const getTicketRatings = () => {
    return tickets.map(({ businessPotential, marketSize, risk, teamPotential, techInnovation }) => ({
      businessPotential: parseFloat(businessPotential),
      marketSize: parseFloat(marketSize),
      risk: parseFloat(risk),
      teamPotential: parseFloat(teamPotential),
      techInnovation: parseFloat(techInnovation)
    }));
  };

  const ratings = getTicketRatings();

  const getMaxRating = () => {
    let maxRating = 0;
    ratings.forEach(ticket => {
      const values = Object.values(ticket);
      const max = Math.max(...values);
      if (max > maxRating) {
        maxRating = max;
      }
    });
    return maxRating;
  };

  const maxRating = getMaxRating();

  const barWidth = width / ratings.length;
  const barHeightScale = height / maxRating;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      {ratings.map((ticket, index) => (
        <div key={index} style={{ width: barWidth, height: ticket.businessPotential * barHeightScale, backgroundColor: 'blue', margin: '0 2px' }} />
      ))}
    </div>
  );
};

export default BarChart;
