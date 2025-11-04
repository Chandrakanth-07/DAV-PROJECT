import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  Clock,
  BookOpen,
  TrendingUp,
  GraduationCap,
  ChevronRight,
  Calendar,
  Filter,
} from "lucide-react"

export function EducationDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">EduAnalytics</h1>
          </div>

          <nav className="space-y-2">
            <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3">Overview</div>
            <Button variant="ghost" className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground">
              <BarChart3 className="mr-3 h-4 w-4" />
              Dashboard
            </Button>

            <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3 mt-6">
              Analytics
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Users className="mr-3 h-4 w-4" />
              Student Engagement
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BookOpen className="mr-3 h-4 w-4" />
              Course Progress
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              Performance Metrics
            </Button>

            <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3 mt-6">
              Reports
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Calendar className="mr-3 h-4 w-4" />
              Weekly Reports
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-card-foreground">Education Analytics</h1>
              <p className="text-sm text-muted-foreground">Monitor student engagement and course performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Badge variant="secondary">Production</Badge>
              <Badge variant="outline">Last 24 hours</Badge>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Active Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">1,245</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-1" />
                  <span className="text-chart-1">+12.5%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg. Engagement Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">2h 15m</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-2" />
                  <span className="text-chart-2">+8.2%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Course Completion</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">78%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-3" />
                  <span className="text-chart-3">+5.1%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Average Score</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">85.4</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">+3.2%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">Student Engagement</CardTitle>
                  <p className="text-sm text-muted-foreground">Daily active users over time</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {/* Simulated chart bars */}
                  {[65, 78, 82, 71, 89, 95, 88, 92, 85, 90, 87, 94].map((height, i) => (
                    <div key={i} className="flex-1 bg-chart-1 rounded-t" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>12 hours ago</span>
                  <span>Now</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">Course Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">Completion rates by subject</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground">Mathematics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-20 h-2 bg-chart-1 rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">83%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground">Science</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-18 h-2 bg-chart-2 rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground">Literature</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-22 h-2 bg-chart-3 rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">91%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground">History</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-chart-4 rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">67%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Courses */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Most Popular Courses</CardTitle>
              <p className="text-sm text-muted-foreground">Top performing courses this week</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-chart-1 rounded-full" />
                    <div>
                      <p className="font-medium text-accent-foreground">Advanced Mathematics - Grade 12</p>
                      <p className="text-sm text-muted-foreground">324 active students</p>
                    </div>
                  </div>
                  <Badge variant="secondary">92% completion</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-chart-2 rounded-full" />
                    <div>
                      <p className="font-medium text-accent-foreground">Physics Fundamentals</p>
                      <p className="text-sm text-muted-foreground">287 active students</p>
                    </div>
                  </div>
                  <Badge variant="secondary">88% completion</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-chart-3 rounded-full" />
                    <div>
                      <p className="font-medium text-accent-foreground">World Literature</p>
                      <p className="text-sm text-muted-foreground">256 active students</p>
                    </div>
                  </div>
                  <Badge variant="secondary">85% completion</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
