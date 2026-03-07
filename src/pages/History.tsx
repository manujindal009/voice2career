/*import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

const interviews = [
  { id: 1, date: "2 days ago", completion: 80, status: "Completed", duration: "25 min" },
  { id: 2, date: "5 days ago", completion: 95, status: "Completed", duration: "30 min" },
  { id: 3, date: "1 week ago", completion: 70, status: "Completed", duration: "22 min" },
  { id: 4, date: "1 week ago", completion: 85, status: "Completed", duration: "28 min" },
  { id: 5, date: "2 weeks ago", completion: 75, status: "Completed", duration: "24 min" },
  { id: 6, date: "2 weeks ago", completion: 90, status: "Completed", duration: "29 min" },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Interview History</h1>
                <p className="text-sm text-muted-foreground">View all your past interview sessions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="p-6 transition-all hover:border-primary">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">Interview #{interview.id}</h3>
                    <Badge variant="secondary">{interview.status}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {interview.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {interview.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">{interview.completion}%</span>
                    </div>
                    <Progress value={interview.completion} className="h-2" />
                  </div>
                </div>

                <Button variant="outline">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
*/