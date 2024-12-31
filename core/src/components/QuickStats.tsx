import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Clock, Trophy } from 'lucide-react'

const stats = [
  { title: "Courses Completed", value: 12, icon: Book },
  { title: "Study Hours", value: 148, icon: Clock },
  { title: "Achievements", value: 23, icon: Trophy },
]

export default function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

