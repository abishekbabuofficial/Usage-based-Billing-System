import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CreditChart = ({ data }) => {
  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Credit Usage Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            content={<CustomTooltip/>}
          />
          <Line
            type="monotone"
            dataKey="credits"
            stroke="#8884d8"
            strokeWidth={2}
            label={{ position: 'top', fill: '#000', fontSize: 12 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreditChart;
