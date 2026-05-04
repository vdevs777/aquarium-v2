import { BarChartIcon } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

const data = [
  { name: "1", previsto: 0.0129, realizado: 0.01161 },
  { name: "2", previsto: 0.015, realizado: 0.0135 },
  { name: "3", previsto: 0.0179, realizado: 0.01611 },
  { name: "4", previsto: 0.0219, realizado: 0.01971 },
  { name: "5", previsto: 0.0255, realizado: 0.02295 },
  { name: "6", previsto: 0.0298, realizado: 0.02682 },
  { name: "7", previsto: 0.0356, realizado: 0.03204 },
  { name: "8", previsto: 0.0416, realizado: 0.03744 },
  { name: "9", previsto: 0.0478, realizado: 0.04302 },
  { name: "10", previsto: 0.0558, realizado: 0.05022 },
  { name: "11", previsto: 0.064, realizado: 0.0576 },
  { name: "12", previsto: 0.0738, realizado: 0.06642 },
  { name: "13", previsto: 0.0834, realizado: 0.07506 },
  { name: "14", previsto: 0.096, realizado: 0.0864 },
  { name: "15", previsto: 0.1089, realizado: 0.09801 },
  { name: "16", previsto: 0.1229, realizado: 0.11061 },
  { name: "17", previsto: 0.1381, realizado: 0.12429 },
  { name: "18", previsto: 0.1546, realizado: 0.13914 },
  { name: "19", previsto: 0.1722, realizado: 0.15498 },
  { name: "20", previsto: 0.191, realizado: 0.1719 },
  { name: "21", previsto: 0.2111, realizado: 0.18999 },
  { name: "22", previsto: 0.2334, realizado: 0.21006 },
  { name: "23", previsto: 0.2574, realizado: 0.23166 },
  { name: "24", previsto: 0.2837, realizado: 0.25533 },
  { name: "25", previsto: 0.3125, realizado: 0.28125 },
  { name: "26", previsto: 0.3442, realizado: 0.30978 },
  { name: "27", previsto: 0.3791, realizado: 0.34119 },
  { name: "28", previsto: 0.4176, realizado: 0.37584 },
  { name: "29", previsto: 0.46, realizado: 0.414 },
  { name: "30", previsto: 0.5067, realizado: 0.45603 },
  { name: "31", previsto: 0.5581, realizado: 0.50229 },
  { name: "32", previsto: 0.6147, realizado: 0.55323 },
  { name: "33", previsto: 0.6772, realizado: 0.60948 },
  { name: "34", previsto: 0.7459, realizado: 0.67131 },
  { name: "35", previsto: 0.8216, realizado: 0.73944 },
  { name: "36", previsto: 0.905, realizado: 0.8145 },
  { name: "37", previsto: 0.9968, realizado: 0.89612 },
  { name: "38", previsto: 1.098, realizado: 0.9882 },
  { name: "39", previsto: 1.2094, realizado: 1.08846 },
];

export function GrowthCurve() {
  const formatNumber = (value: number) => value.toLocaleString("pt-BR");

  return (
    <div className="sm:w-full bg-white rounded-md p-4 border border-input">
      <div className="flex flex-row items-center gap-2">
        <BarChartIcon fontWeight="regular" size={18} />
        <h5 className="font-semibold text-sm">Curva de crescimento</h5>
      </div>

      <div className="bg-white mt-5 w-auto sm:w-full h-112.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              label={{
                value: "Dias de cultivo",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              tickFormatter={formatNumber}
              label={{
                value: "Peso médio (g)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value) =>
                value != null ? Number(value).toLocaleString("pt-BR") : ""
              }
              labelFormatter={(label) => `Dia ${label}`}
            />

            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 20 }}
            />

            <Line
              type="monotone"
              dataKey="previsto"
              name="Previsto"
              stroke={colors.yellow[500]}
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="realizado"
              name="Realizado"
              stroke={colors.green[500]}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
