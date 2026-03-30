import React, { useState } from "react";
import { Select, Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2023");

  // Demo data for the line chart
  const activityData = {
    2023: [
      { month: "JAN", value: 1200 },
      { month: "FEB", value: 1500 },
      { month: "MAR", value: 800 },
      { month: "APR", value: 900 },
      { month: "MAY", value: 1100 },
      { month: "JUN", value: 1400 },
      { month: "JUL", value: 1000 },
      { month: "AUG", value: 1200 },
      { month: "SEP", value: 2000 },
      { month: "OCT", value: 2800 },
      { month: "NOV", value: 3500 },
      { month: "DEC", value: 4200 },
    ],
    2024: [
      { month: "JAN", value: 4500 },
      { month: "FEB", value: 4800 },
      { month: "MAR", value: 4200 },
      { month: "APR", value: 4600 },
      { month: "MAY", value: 5100 },
      { month: "JUN", value: 5400 },
      { month: "JUL", value: 5000 },
      { month: "AUG", value: 5200 },
      { month: "SEP", value: 5800 },
      { month: "OCT", value: 6200 },
      { month: "NOV", value: 6800 },
      { month: "DEC", value: 7200 },
    ],
  };

  // Demo data for viewer pie chart
  const viewerData = [
    { name: "Polymarket", value: 700, color: "#f59e42" },
    { name: "Kalshi", value: 556, color: "#52c41a" },
  ];

  const totalViews = viewerData.reduce((sum, item) => sum + item.value, 0);

  // Mini trend data
  const polymarketTrend = [
    { x: 1, y: 30 },
    { x: 2, y: 35 },
    { x: 3, y: 32 },
    { x: 4, y: 28 },
    { x: 5, y: 30 },
    { x: 6, y: 25 },
  ];

  const kalshiTrend = [
    { x: 1, y: 20 },
    { x: 2, y: 22 },
    { x: 3, y: 25 },
    { x: 4, y: 23 },
    { x: 5, y: 21 },
    { x: 6, y: 24 },
  ];

  const MiniTrendLine = ({ data, color }) => {
    const points = data.map((d, i) => `${i * 8},${40 - d.y}`).join(" ");
    return (
      <svg width="48" height="24" className="inline-block">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="mt-5 mb-2">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall User Activity Card */}
          <Card className="shadow-lg rounded-2xl border-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Overall User Activity
              </h2>
              <Select
                value={selectedYear}
                onChange={setSelectedYear}
                className="w-32"
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                />
                <YAxis
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Viewer Card */}
          <Card className="shadow-lg rounded-2xl border-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Events</h2>

            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-6xl font-bold text-gray-900">
                  {totalViews}
                </div>
                <div className="text-gray-500 mt-1">Weekly views</div>
              </div>

              <div className="relative">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={viewerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {viewerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend with trends */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#f59e42" }}
                  ></div>
                  <span className="font-medium text-gray-700">Polymarket</span>
                </div>
                <div className="flex items-center gap-4">
                  <MiniTrendLine data={polymarketTrend} color="#f59e42" />
                  <span className="font-semibold text-gray-900">
                    700 new events
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#52c41a" }}
                  ></div>
                  <span className="font-medium text-gray-700">Kalshi</span>
                </div>
                <div className="flex items-center gap-4">
                  <MiniTrendLine data={kalshiTrend} color="#52c41a" />
                  <span className="font-semibold text-gray-900">
                    423 new events
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
