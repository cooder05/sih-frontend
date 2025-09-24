import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  LineChart,
  Line,
  Legend,
  Tooltip as LineTooltip,
  Brush,
  ReferenceLine,
  Label as RechartsLabel,
} from "recharts";

// Data inferred from hazardMarkers and plausible app usage

// Radar: Frequency of each hazard type
const radarData = [
  { type: "Oil Spill", count: 12 },
  { type: "Tsunami", count: 6 },
  { type: "Coastal Erosion", count: 9 },
  { type: "Cyclone", count: 7 },
  { type: "Marine Debris", count: 10 },
];

// Histogram: Reports per month
const histogramData = [
  { month: "Apr", count: 5 },
  { month: "May", count: 8 },
  { month: "Jun", count: 15 },
  { month: "Jul", count: 13 },
  { month: "Aug", count: 9 },
  { month: "Sep", count: 11 },
];

// SynchronizedLineChart: Two types of hazard reports over time
const syncLineData = [
  { month: "Apr", "Tsunami Warnings": 2, "Flood Alerts": 3 },
  { month: "May", "Tsunami Warnings": 4, "Flood Alerts": 4 },
  { month: "Jun", "Tsunami Warnings": 6, "Flood Alerts": 9 },
  { month: "Jul", "Tsunami Warnings": 5, "Flood Alerts": 8 },
  { month: "Aug", "Tsunami Warnings": 3, "Flood Alerts": 6 },
  { month: "Sep", "Tsunami Warnings": 4, "Flood Alerts": 7 },
];

function GraphWithRightLabel({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mb-12 flex items-center gap-8">
      <div className="flex-1 min-w-0">{children}</div>
      <div className="w-52 flex-shrink-0 flex justify-center">
        <div className="bg-card/60 border border-card-border rounded-lg px-4 py-2 text-center font-medium text-lg text-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Crisis Analytics Dashboard</h2>
      
      {/* Radar chart */}
      <GraphWithRightLabel label="Hazard Type Frequency (Radar)">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis angle={30} domain={[0, 15]} />
            <Radar name="Reports" dataKey="count" stroke="#005f73" fill="#ffd60a" fillOpacity={0.6} />
            <BarTooltip />
          </RadarChart>
        </ResponsiveContainer>
      </GraphWithRightLabel>

      {/* Histogram */}
      <GraphWithRightLabel label="Monthly Report Volume (Histogram)">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <BarTooltip />
            <Bar dataKey="count" fill="#0a9396" />
          </BarChart>
        </ResponsiveContainer>
      </GraphWithRightLabel>

      {/* Synchronized Line Chart */}
      <GraphWithRightLabel label="Hazard Report Trends (Synchronized Line Chart)">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={syncLineData}
            syncId="hazardSync"
            margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <LineTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Tsunami Warnings"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="Flood Alerts"
              stroke="#ff6b6b"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Brush dataKey="month" height={24} stroke="#ffd60a" />
            <ReferenceLine y={10} stroke="#ffd60a" strokeDasharray="3 3">
              <RechartsLabel
                value="Avg. Threshold"
                position="insideTopRight"
                fill="#ffd60a"
                fontSize={12}
                fontWeight={700}
                offset={10}
              />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </GraphWithRightLabel>
    </div>
  );
}

export default AnalyticsPage;