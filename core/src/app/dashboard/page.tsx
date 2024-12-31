'use client'

import { motion } from 'framer-motion'
import EnrolledCourses from '@/components/EnrolledCourses'
import QuickStats from '@/components/QuickStats'
import ProgressChart from '@/components/ProgressChar'
import Header from '@/components/Header'
import UpcomingAssignments from '@/components/UpcomingAssignment'

export default function Dashboard() {
  return (
     <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
    
  
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="col-span-1 lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProgressChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <QuickStats />
        </motion.div>
        <motion.div
          className="col-span-1 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <EnrolledCourses />
        </motion.div>

        <motion.div
          className="col-span-1 lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <UpcomingAssignments />
        </motion.div>
      </div>
    </div>
    </>  

  )
}

