
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Sample data - in a real app this would come from an API
const data = [
  { name: "Nov 1", total: 45 },
  { name: "Nov 3", total: 35 },
  { name: "Nov 5", total: 55 },
  { name: "Nov 7", total: 40 },
  { name: "Nov 9", total: 50 },
  { name: "Nov 11", total: 55 },
  { name: "Nov 13", total: 60 },
  { name: "Nov 15", total: 35 },
  { name: "Nov 17", total: 45 },
  { name: "Nov 19", total: 50 },
  { name: "Nov 21", total: 65 },
  { name: "Nov 23", total: 40 },
  { name: "Nov 25", total: 55 },
  { name: "Nov 27", total: 60 },
  { name: "Nov 29", total: 75 },
];

export const BarChartComponent = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.split(' ')[1]}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${value}`}
          />
          <Tooltip 
            formatter={(value) => [`€${value}`, 'Earnings']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ 
              backgroundColor: "white", 
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "none"
            }}
          />
          <Bar
            dataKey="total"
            fill="#1E3A8A"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
