'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgressChart() {
  const progress = 75 // Example progress percentage

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-64">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <motion.circle
              className="text-indigo-500 progress-ring__circle stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              initial={{ strokeDasharray: "251.2 251.2", strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (progress / 100) * 251.2 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            ></motion.circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-indigo-500">{progress}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

