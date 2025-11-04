"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users, Star, Search, Filter, Play, ChevronLeft, GraduationCap } from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  lessons: number
  students: number
  rating: number
  level: string
  category: string
  thumbnail: string
  progress?: number
  price: string
  tags: string[]
}

const mockCourses: Course[] = [
  {
    id: "math-algebra-2",
    title: "Algebra II - Advanced Concepts",
    description: "Master quadratic functions, polynomials, and complex equations with interactive problem solving.",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    lessons: 48,
    students: 1245,
    rating: 4.8,
    level: "Intermediate",
    category: "Mathematics",
    thumbnail: "/algebra-mathematics-equations.jpg",
    progress: 78,
    price: "Free",
    tags: ["Algebra", "Functions", "Equations"],
  },
  {
    id: "physics-mechanics",
    title: "Physics: Mechanics Fundamentals",
    description: "Explore motion, forces, and energy through hands-on experiments and real-world applications.",
    instructor: "Prof. Michael Chen",
    duration: "10 weeks",
    lessons: 35,
    students: 892,
    rating: 4.7,
    level: "Beginner",
    category: "Physics",
    thumbnail: "/physics-mechanics-motion.jpg",
    progress: 45,
    price: "Free",
    tags: ["Motion", "Forces", "Energy"],
  },
  {
    id: "chemistry-organic",
    title: "Organic Chemistry Essentials",
    description: "Understand molecular structures, reactions, and synthesis in organic chemistry.",
    instructor: "Dr. Emily Rodriguez",
    duration: "14 weeks",
    lessons: 56,
    students: 678,
    rating: 4.9,
    level: "Advanced",
    category: "Chemistry",
    thumbnail: "/organic-chemistry-molecules.png",
    progress: 23,
    price: "Premium",
    tags: ["Organic", "Molecules", "Reactions"],
  },
  {
    id: "biology-genetics",
    title: "Introduction to Genetics",
    description: "Discover the principles of heredity, DNA, and genetic engineering.",
    instructor: "Dr. James Wilson",
    duration: "8 weeks",
    lessons: 32,
    students: 1156,
    rating: 4.6,
    level: "Intermediate",
    category: "Biology",
    thumbnail: "/genetics-dna-biology.jpg",
    price: "Free",
    tags: ["DNA", "Heredity", "Genetics"],
  },
  {
    id: "english-literature",
    title: "World Literature Analysis",
    description: "Analyze classic and contemporary works from around the globe.",
    instructor: "Prof. Amanda Thompson",
    duration: "16 weeks",
    lessons: 64,
    students: 934,
    rating: 4.8,
    level: "Intermediate",
    category: "English",
    thumbnail: "/literature-books-analysis.jpg",
    price: "Free",
    tags: ["Literature", "Analysis", "Writing"],
  },
  {
    id: "computer-science-python",
    title: "Python Programming Fundamentals",
    description: "Learn programming basics with Python through practical projects and exercises.",
    instructor: "Alex Kumar",
    duration: "12 weeks",
    lessons: 45,
    students: 2134,
    rating: 4.9,
    level: "Beginner",
    category: "Computer Science",
    thumbnail: "/python-code.png",
    price: "Premium",
    tags: ["Python", "Programming", "Coding"],
  },
]

export function CoursesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const categories = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "enrolled" && course.progress !== undefined) ||
      (activeTab === "completed" && course.progress === 100)

    return matchesSearch && matchesCategory && matchesLevel && matchesTab
  })

  const enrolledCourses = mockCourses.filter((course) => course.progress !== undefined)
  const completedCourses = mockCourses.filter((course) => course.progress === 100)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mb-8 text-sidebar-foreground hover:text-sidebar-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">Courses</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      selectedCategory === category
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Level</h3>
              <div className="space-y-1">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      selectedLevel === level
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level === "all" ? "All Levels" : level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-card-foreground">Course Library</h1>
                <p className="text-sm text-muted-foreground">
                  Discover and learn from our comprehensive course collection
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{filteredCourses.length} courses</Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </header>

        {/* Course Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="enrolled">Enrolled ({enrolledCourses.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="enrolled" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} showProgress />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} showProgress />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

interface CourseCardProps {
  course: Course
  showProgress?: boolean
}

function CourseCard({ course, showProgress }: CourseCardProps) {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={course.price === "Free" ? "secondary" : "default"}>{course.price}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.students.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {course.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Badge variant="secondary" className="text-xs">
              {course.level}
            </Badge>
          </div>

          {showProgress && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Link href={`/courses/${course.id}`} className="flex-1">
              <Button className="w-full" size="sm">
                {course.progress !== undefined ? (
                  <>
                    <Play className="mr-2 h-3 w-3" />
                    Continue
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-3 w-3" />
                    View Course
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
