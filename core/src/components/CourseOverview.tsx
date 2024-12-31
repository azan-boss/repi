import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const courses = [
  { id: 1, name: "Introduction to React", students: 120, progress: 75 },
  { id: 2, name: "Advanced JavaScript", students: 85, progress: 60 },
  { id: 3, name: "Web Design Fundamentals", students: 150, progress: 90 },
]

export default function CourseOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Enrolled Students</TableHead>
              <TableHead>Overall Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.progress}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

