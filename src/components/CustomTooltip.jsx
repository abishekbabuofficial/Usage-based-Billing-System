import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const point = payload[0].payload;
        return (
            <div className="bg-white p-2 border rounded shadow text-sm">
          <p><strong>Time:</strong> {point.time}</p>
          <p><strong>Credits:</strong> {point.credits} Remaining</p>
          <p><strong>Reason:</strong> {point.label}</p>
        </div>
      );
    }
    return null;
};

export default CustomTooltip