'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Simulated election data with voter turnout
const nationalData = [
  { name: 'Kamala Harris (D)', value: 51, color: '#3b82f6' },
  { name: 'Donald Trump (R)', value: 47, color: '#ef4444' },
  { name: 'Other', value: 2, color: '#22c55e' },
]

const stateData = {
  WA: {
    results: [
      { name: 'Kamala Harris (D)', value: 58, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 39, color: '#ef4444' },
      { name: 'Other', value: 3, color: '#22c55e' },
    ],
    turnout: 72,
  },
  OR: {
    results: [
      { name: 'Kamala Harris (D)', value: 56, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 41, color: '#ef4444' },
      { name: 'Other', value: 3, color: '#22c55e' },
    ],
    turnout: 70,
  },
  CA: {
    results: [
      { name: 'Kamala Harris (D)', value: 63, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 34, color: '#ef4444' },
      { name: 'Other', value: 3, color: '#22c55e' },
    ],
    turnout: 68,
  },
  TX: {
    results: [
      { name: 'Kamala Harris (D)', value: 46, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 52, color: '#ef4444' },
      { name: 'Other', value: 2, color: '#22c55e' },
    ],
    turnout: 66,
  },
  FL: {
    results: [
      { name: 'Kamala Harris (D)', value: 48, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 51, color: '#ef4444' },
      { name: 'Other', value: 1, color: '#22c55e' },
    ],
    turnout: 71,
  },
  NY: {
    results: [
      { name: 'Kamala Harris (D)', value: 61, color: '#3b82f6' },
      { name: 'Donald Trump (R)', value: 37, color: '#ef4444' },
      { name: 'Other', value: 2, color: '#22c55e' },
    ],
    turnout: 69,
  },
}

const totalVoterTurnout = Object.values(stateData).reduce((sum, state) => sum + state.turnout, 0) / Object.keys(stateData).length

const SimplifiedUSMap = ({ onStateClick }) => (
  <svg viewBox="0 0 959 593" className="w-full h-auto">
    <path d="M110 480l60-100 50 20 30-40 90 20 70-110 100 30 80-80 130 50 100-150 80 50v260l-60 70H110V480z" fill="#374151" stroke="#6B7280" />
    <g onClick={() => onStateClick('WA')} className="cursor-pointer hover:opacity-75">
      <path d="M110 480l60-100 50 20 30-40 90 20v100H110z" fill="#374151" stroke="#6B7280" />
      <text x="180" y="420" fontSize="20" textAnchor="middle" fill="#E5E7EB">WA</text>
    </g>
    <g onClick={() => onStateClick('OR')} className="cursor-pointer hover:opacity-75">
      <path d="M340 380l70-110 100 30v110H340z" fill="#374151" stroke="#6B7280" />
      <text x="425" y="350" fontSize="20" textAnchor="middle" fill="#E5E7EB">OR</text>
    </g>
    <g onClick={() => onStateClick('CA')} className="cursor-pointer hover:opacity-75">
      <path d="M510 300l80-80 130 50v170H510V300z" fill="#374151" stroke="#6B7280" />
      <text x="615" y="320" fontSize="20" textAnchor="middle" fill="#E5E7EB">CA</text>
    </g>
    <g onClick={() => onStateClick('TX')} className="cursor-pointer hover:opacity-75">
      <path d="M720 440l100-150 80 50v170H720V440z" fill="#374151" stroke="#6B7280" />
      <text x="810" y="470" fontSize="20" textAnchor="middle" fill="#E5E7EB">TX</text>
    </g>
    <g onClick={() => onStateClick('FL')} className="cursor-pointer hover:opacity-75">
      <path d="M840 510l60-70v70H840z" fill="#374151" stroke="#6B7280" />
      <text x="870" y="490" fontSize="20" textAnchor="middle" fill="#E5E7EB">FL</text>
    </g>
    <g onClick={() => onStateClick('NY')} className="cursor-pointer hover:opacity-75">
      <path d="M720 290l100-150v150H720z" fill="#374151" stroke="#6B7280" />
      <text x="770" y="220" fontSize="20" textAnchor="middle" fill="#E5E7EB">NY</text>
    </g>
  </svg>
)

const CustomPieChart = ({ data, title, description, turnout }) => (
  <Card className="dark:bg-gray-800">
    <CardHeader>
      <CardTitle className="dark:text-white">{title}</CardTitle>
      <CardDescription className="dark:text-gray-400">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          Democratic: { label: "Democratic", color: "#3b82f6" },
          Republican: { label: "Republican", color: "#ef4444" },
          Other: { label: "Other", color: "#22c55e" },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      {turnout && (
        <div className="mt-4 text-center dark:text-white">
          Voter Turnout: {turnout}%
        </div>
      )}
    </CardContent>
  </Card>
)

const VoterTurnoutChart = ({ data }) => (
  <Card className="dark:bg-gray-800">
    <CardHeader>
      <CardTitle className="dark:text-white">Voter Turnout by State</CardTitle>
      <CardDescription className="dark:text-gray-400">Percentage of registered voters who voted</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          turnout: { label: "Turnout", color: "#3b82f6" },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={Object.entries(data).map(([state, { turnout }]) => ({ state, turnout }))}>
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="turnout" fill="var(--color-turnout)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)

export default function ElectionDashboard() {
  const [selectedState, setSelectedState] = useState(null)

  const handleStateClick = (state) => {
    setSelectedState(state)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">US Elections 2024 Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomPieChart
            data={nationalData}
            title="National Results"
            description="Overall election results"
          />

          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Total Voter Turnout</CardTitle>
              <CardDescription className="dark:text-gray-400">Average turnout across all states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-center dark:text-white">
                {totalVoterTurnout.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">State Map</CardTitle>
              <CardDescription className="dark:text-gray-400">Click on a state to see detailed results</CardDescription>
            </CardHeader>
            <CardContent>
              <SimplifiedUSMap onStateClick={handleStateClick} />
            </CardContent>
          </Card>

          <VoterTurnoutChart data={stateData} />

          {selectedState && (
            <Card className="md:col-span-2 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">{selectedState} State Results</CardTitle>
                <CardDescription className="dark:text-gray-400">Detailed election results for {selectedState}</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomPieChart
                  data={stateData[selectedState].results}
                  title={`${selectedState} Results`}
                  description={`Election results for ${selectedState}`}
                  turnout={stateData[selectedState].turnout}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}