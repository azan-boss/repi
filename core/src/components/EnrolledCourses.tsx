'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const courses = [
  { id: 1, title: "Introduction to Mathematics", progress: 75, category: "Math" },
  { id: 2, title: "World History: Ancient Civilizations", progress: 40, category: "History" },
  { id: 3, title: "Biology 101", progress: 90, category: "Science" },
  { id: 4, title: "English Literature", progress: 60, category: "English" },
]

export default function EnrolledCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Badge>{course.category}</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2 mt-2" />
                  <p className="text-sm text-gray-500 mt-2">{course.progress}% Complete</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

