import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const assignments = [
  { id: 1, title: "Math Problem Set", dueDate: "Tomorrow", subject: "Math" },
  { id: 2, title: "Science Lab Report", dueDate: "Next Week", subject: "Science" },
  { id: 3, title: "History Essay", dueDate: "In 3 days", subject: "History" },
]

export default function UpcomingAssignments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
              </div>
              <Badge>{assignment.subject}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

