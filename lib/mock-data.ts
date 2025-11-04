// Mock data for videos, quizzes, practice tests, and study groups

export interface Video {
  id: string
  title: string
  subject: string
  chapter: string
  youtubeUrl: string
  duration: number
  description: string
  thumbnail: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface Quiz {
  id: string
  title: string
  subject: string
  videoId: string
  questions: QuizQuestion[]
  passingScore: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface PracticeTest {
  id: string
  title: string
  subject: string
  duration: number
  totalQuestions: number
  questions: PracticeQuestion[]
  difficulty: "easy" | "medium" | "hard"
}

export interface PracticeQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  marks: number
}

export interface StudyGroup {
  id: string
  name: string
  subject: string
  description: string
  members: string[]
  createdBy: string
  createdAt: string
  maxMembers: number
  status: "active" | "inactive"
}

export interface UserProgress {
  userId: string
  videoId: string
  completed: boolean
  watchedDuration: number
  totalDuration: number
  completedAt?: string
}

export interface QuizResult {
  userId: string
  quizId: string
  score: number
  totalScore: number
  passed: boolean
  completedAt: string
  answers: number[]
}

export interface Doubt {
  id: string
  userId: string
  userName: string
  subject: string
  title: string
  description: string
  createdAt: string
  responses: DoubtResponse[]
  status: "open" | "resolved"
  views: number
}

export interface DoubtResponse {
  id: string
  userId: string
  userName: string
  response: string
  createdAt: string
  helpful: number
  isAccepted: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  criteria: string
  type: "streak" | "score" | "completion" | "milestone"
  earnedAt?: string
  progress?: number
  maxProgress?: number
}

export interface UserSettings {
  userId: string
  notificationsEnabled: boolean
  emailNotifications: boolean
  studyGoalHours: number
  preferredSubjects: string[]
  theme: "light" | "dark"
  language: string
}

export interface UserMetrics {
  userId: string
  studyHoursThisWeek: number
  averageQuizScore: number
  videosWatchedThisWeek: number
  quizzesTakenThisWeek: number
  currentStreak: number
  longestStreak: number
  totalStudyHours: number
  completedLessons: number
}

// Mock Videos Data
export const mockVideos: Video[] = [
  // Mathematics
  {
    id: "math-1",
    title: "Algebra Basics - Variables and Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    youtubeUrl: "https://www.youtube.com/embed/NybHckSEQBI",
    duration: 1200,
    description: "Learn the fundamentals of algebra including variables, equations, and solving techniques.",
    thumbnail: "/algebra-mathematics-equations.jpg",
    difficulty: "beginner",
  },
  {
    id: "math-2",
    title: "Quadratic Equations and Factoring",
    subject: "Mathematics",
    chapter: "Algebra",
    youtubeUrl: "https://www.youtube.com/embed/2ZzuZvz33X0",
    duration: 1500,
    description: "Master quadratic equations, factoring methods, and the quadratic formula.",
    thumbnail: "/algebra-mathematics-equations.jpg",
    difficulty: "intermediate",
  },
  {
    id: "math-3",
    title: "Calculus - Limits and Derivatives",
    subject: "Mathematics",
    chapter: "Calculus",
    youtubeUrl: "https://www.youtube.com/embed/riXcZT2ICjA",
    duration: 1800,
    description: "Introduction to calculus concepts including limits, continuity, and derivatives.",
    thumbnail: "/algebra-mathematics-equations.jpg",
    difficulty: "advanced",
  },
  {
    id: "math-4",
    title: "Trigonometry - Sine, Cosine, Tangent",
    subject: "Mathematics",
    chapter: "Trigonometry",
    youtubeUrl: "https://www.youtube.com/embed/jLJLXka2wEM",
    duration: 1400,
    description: "Learn trigonometric ratios and their applications in solving problems.",
    thumbnail: "/algebra-mathematics-equations.jpg",
    difficulty: "intermediate",
  },

  // Physics
  {
    id: "physics-1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    youtubeUrl: "https://www.youtube.com/embed/kKKM8Y-u7f4",
    duration: 1600,
    description: "Understand Newton's three laws of motion and their real-world applications.",
    thumbnail: "/physics-mechanics-motion.jpg",
    difficulty: "beginner",
  },
  {
    id: "physics-2",
    title: "Energy and Work",
    subject: "Physics",
    chapter: "Mechanics",
    youtubeUrl: "https://www.youtube.com/embed/Ij-4ISOqOSA",
    duration: 1400,
    description: "Explore concepts of work, energy, and conservation of energy.",
    thumbnail: "/physics-mechanics-motion.jpg",
    difficulty: "intermediate",
  },
  {
    id: "physics-3",
    title: "Electromagnetism Fundamentals",
    subject: "Physics",
    chapter: "Electromagnetism",
    youtubeUrl: "https://www.youtube.com/embed/1tqf_K-zW3w",
    duration: 1700,
    description: "Introduction to electric fields, magnetic fields, and electromagnetic waves.",
    thumbnail: "/physics-mechanics-motion.jpg",
    difficulty: "advanced",
  },
  {
    id: "physics-4",
    title: "Waves and Sound",
    subject: "Physics",
    chapter: "Waves",
    youtubeUrl: "https://www.youtube.com/embed/AZIB-pVKKEw",
    duration: 1500,
    description: "Learn about wave properties, sound waves, and wave interference.",
    thumbnail: "/physics-mechanics-motion.jpg",
    difficulty: "intermediate",
  },

  // Chemistry
  {
    id: "chem-1",
    title: "Atomic Structure and Periodic Table",
    subject: "Chemistry",
    chapter: "Atomic Structure",
    youtubeUrl: "https://www.youtube.com/embed/FXHcb-_Uh0s",
    duration: 1300,
    description: "Understand atoms, electrons, and the organization of the periodic table.",
    thumbnail: "/organic-chemistry-molecules.png",
    difficulty: "beginner",
  },
  {
    id: "chem-2",
    title: "Chemical Bonding and Reactions",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    youtubeUrl: "https://www.youtube.com/embed/Eo-R0r01zFE",
    duration: 1450,
    description: "Explore ionic, covalent, and metallic bonds, and chemical reactions.",
    thumbnail: "/organic-chemistry-molecules.png",
    difficulty: "intermediate",
  },
  {
    id: "chem-3",
    title: "Organic Chemistry - Hydrocarbons",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    youtubeUrl: "https://www.youtube.com/embed/yCIqsKvjlAo",
    duration: 1600,
    description: "Introduction to organic compounds, alkanes, alkenes, and alkynes.",
    thumbnail: "/organic-chemistry-molecules.png",
    difficulty: "advanced",
  },
  {
    id: "chem-4",
    title: "Acids, Bases, and pH",
    subject: "Chemistry",
    chapter: "Acid-Base Chemistry",
    youtubeUrl: "https://www.youtube.com/embed/oDKxVJqKqFE",
    duration: 1350,
    description: "Learn about acids, bases, pH scale, and neutralization reactions.",
    thumbnail: "/organic-chemistry-molecules.png",
    difficulty: "intermediate",
  },

  // Biology
  {
    id: "bio-1",
    title: "Cell Structure and Function",
    subject: "Biology",
    chapter: "Cell Biology",
    youtubeUrl: "https://www.youtube.com/embed/URUJD5NEXC8",
    duration: 1400,
    description: "Explore cell organelles, their functions, and cell types.",
    thumbnail: "/genetics-dna-biology.jpg",
    difficulty: "beginner",
  },
  {
    id: "bio-2",
    title: "Genetics and DNA",
    subject: "Biology",
    chapter: "Genetics",
    youtubeUrl: "https://www.youtube.com/embed/zwibgNGe4aY",
    duration: 1550,
    description: "Understand DNA structure, genes, and inheritance patterns.",
    thumbnail: "/genetics-dna-biology.jpg",
    difficulty: "intermediate",
  },
  {
    id: "bio-3",
    title: "Evolution and Natural Selection",
    subject: "Biology",
    chapter: "Evolution",
    youtubeUrl: "https://www.youtube.com/embed/P3GagfbA2vo",
    duration: 1650,
    description: "Learn about evolution, natural selection, and adaptation.",
    thumbnail: "/genetics-dna-biology.jpg",
    difficulty: "advanced",
  },
]

// Mock Quizzes Data
export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-math-1",
    title: "Algebra Basics Quiz",
    subject: "Mathematics",
    videoId: "math-1",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the value of x in the equation 2x + 5 = 13?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "2x + 5 = 13 → 2x = 8 → x = 4",
      },
      {
        id: "q2",
        question: "Simplify: 3(x + 2) - 2(x - 1)",
        options: ["x + 8", "x + 4", "5x + 4", "x + 6"],
        correctAnswer: 0,
        explanation: "3x + 6 - 2x + 2 = x + 8",
      },
      {
        id: "q3",
        question: "What is the slope of the line y = 2x + 3?",
        options: ["2", "3", "-2", "-3"],
        correctAnswer: 0,
        explanation: "In y = mx + b form, m is the slope. Here m = 2",
      },
      {
        id: "q4",
        question: "Solve: x² - 5x + 6 = 0",
        options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 0, 5"],
        correctAnswer: 0,
        explanation: "(x - 2)(x - 3) = 0, so x = 2 or x = 3",
      },
      {
        id: "q5",
        question: "What is the value of 2³?",
        options: ["6", "8", "9", "12"],
        correctAnswer: 1,
        explanation: "2³ = 2 × 2 × 2 = 8",
      },
    ],
  },
  {
    id: "quiz-physics-1",
    title: "Newton's Laws Quiz",
    subject: "Physics",
    videoId: "physics-1",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question:
          "Newton's First Law states that an object in motion will stay in motion unless acted upon by an external force. What is this property called?",
        options: ["Acceleration", "Inertia", "Momentum", "Friction"],
        correctAnswer: 1,
        explanation: "This property is called inertia - the tendency of objects to resist changes in motion.",
      },
      {
        id: "q2",
        question: "If a 10 kg object experiences a force of 20 N, what is its acceleration?",
        options: ["0.5 m/s²", "2 m/s²", "10 m/s²", "200 m/s²"],
        correctAnswer: 1,
        explanation: "F = ma → a = F/m = 20/10 = 2 m/s²",
      },
      {
        id: "q3",
        question:
          "Newton's Third Law states that for every action, there is an equal and opposite reaction. Which pair demonstrates this?",
        options: ["A book resting on a table", "A car accelerating", "A person jumping", "A ball rolling downhill"],
        correctAnswer: 2,
        explanation: "When a person jumps, they push down on Earth, and Earth pushes up on them with equal force.",
      },
    ],
  },
  {
    id: "quiz-chem-1",
    title: "Atomic Structure Quiz",
    subject: "Chemistry",
    videoId: "chem-1",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the charge of an electron?",
        options: ["Positive", "Negative", "Neutral", "Variable"],
        correctAnswer: 1,
        explanation: "Electrons have a negative charge (-1).",
      },
      {
        id: "q2",
        question: "How many electrons can the first shell (n=1) hold?",
        options: ["2", "8", "18", "32"],
        correctAnswer: 0,
        explanation: "The first shell can hold a maximum of 2 electrons.",
      },
      {
        id: "q3",
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        explanation: "Carbon has 6 protons, so its atomic number is 6.",
      },
    ],
  },
]

// Mock Practice Tests Data
export const mockPracticeTests: PracticeTest[] = [
  {
    id: "test-math-1",
    title: "Mathematics - Algebra Practice Test",
    subject: "Mathematics",
    duration: 3600,
    totalQuestions: 10,
    difficulty: "medium",
    questions: [
      {
        id: "q1",
        question: "Solve for x: 3x - 7 = 2x + 5",
        options: ["x = 12", "x = -2", "x = 2", "x = -12"],
        correctAnswer: 0,
        explanation: "3x - 2x = 5 + 7 → x = 12",
        marks: 1,
      },
      {
        id: "q2",
        question: "What is the value of (2³ × 3²) / 6?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 3,
        explanation: "(8 × 9) / 6 = 72 / 6 = 12",
        marks: 1,
      },
      {
        id: "q3",
        question: "Factorize: x² + 7x + 12",
        options: ["(x+3)(x+4)", "(x+2)(x+6)", "(x+1)(x+12)", "(x-3)(x-4)"],
        correctAnswer: 0,
        explanation: "(x+3)(x+4) = x² + 7x + 12",
        marks: 1,
      },
      {
        id: "q4",
        question: "If 2x + 3y = 12 and x - y = 1, find x",
        options: ["x = 3", "x = 2", "x = 4", "x = 5"],
        correctAnswer: 0,
        explanation: "From x - y = 1, y = x - 1. Substitute: 2x + 3(x-1) = 12 → 5x = 15 → x = 3",
        marks: 2,
      },
      {
        id: "q5",
        question: "What is the slope of the line passing through (2,3) and (4,7)?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation: "Slope = (7-3)/(4-2) = 4/2 = 2",
        marks: 1,
      },
      {
        id: "q6",
        question: "Simplify: √(16x⁴y²)",
        options: ["4x²y", "4xy", "2x²y", "16x²y"],
        correctAnswer: 0,
        explanation: "√(16x⁴y²) = 4x²y",
        marks: 1,
      },
      {
        id: "q7",
        question: "If f(x) = 2x + 1, what is f(3)?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "f(3) = 2(3) + 1 = 7",
        marks: 1,
      },
      {
        id: "q8",
        question: "Solve: x² - 9 = 0",
        options: ["x = ±3", "x = ±9", "x = 3", "x = 9"],
        correctAnswer: 0,
        explanation: "(x-3)(x+3) = 0 → x = ±3",
        marks: 1,
      },
      {
        id: "q9",
        question: "What is the value of log₁₀(100)?",
        options: ["1", "2", "10", "100"],
        correctAnswer: 1,
        explanation: "log₁₀(100) = 2 because 10² = 100",
        marks: 2,
      },
      {
        id: "q10",
        question: "If a = 2 and b = 3, what is a² + 2ab + b²?",
        options: ["13", "25", "36", "49"],
        correctAnswer: 2,
        explanation: "a² + 2ab + b² = (a+b)² = (2+3)² = 25",
        marks: 1,
      },
    ],
  },
  {
    id: "test-physics-1",
    title: "Physics - Mechanics Practice Test",
    subject: "Physics",
    duration: 3600,
    totalQuestions: 8,
    difficulty: "medium",
    questions: [
      {
        id: "q1",
        question: "A car accelerates from 0 to 60 m/s in 10 seconds. What is its acceleration?",
        options: ["6 m/s²", "60 m/s²", "0.6 m/s²", "600 m/s²"],
        correctAnswer: 0,
        explanation: "a = (v - u) / t = (60 - 0) / 10 = 6 m/s²",
        marks: 1,
      },
      {
        id: "q2",
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The SI unit of force is Newton (N).",
        marks: 1,
      },
      {
        id: "q3",
        question: "A 5 kg object is lifted 2 meters. What is the work done (g = 10 m/s²)?",
        options: ["10 J", "50 J", "100 J", "250 J"],
        correctAnswer: 2,
        explanation: "W = mgh = 5 × 10 × 2 = 100 J",
        marks: 2,
      },
      {
        id: "q4",
        question: "What is the momentum of a 2 kg object moving at 5 m/s?",
        options: ["2.5 kg·m/s", "5 kg·m/s", "10 kg·m/s", "20 kg·m/s"],
        correctAnswer: 2,
        explanation: "p = mv = 2 × 5 = 10 kg·m/s",
        marks: 1,
      },
      {
        id: "q5",
        question: "Which of the following is NOT a vector quantity?",
        options: ["Velocity", "Force", "Speed", "Acceleration"],
        correctAnswer: 2,
        explanation: "Speed is a scalar quantity; velocity is a vector.",
        marks: 1,
      },
      {
        id: "q6",
        question: "What is the kinetic energy of a 3 kg object moving at 4 m/s?",
        options: ["6 J", "12 J", "24 J", "48 J"],
        correctAnswer: 2,
        explanation: "KE = ½mv² = ½ × 3 × 16 = 24 J",
        marks: 2,
      },
      {
        id: "q7",
        question: "If an object is in free fall, what is its acceleration?",
        options: ["0 m/s²", "5 m/s²", "9.8 m/s²", "19.6 m/s²"],
        correctAnswer: 2,
        explanation: "The acceleration due to gravity is approximately 9.8 m/s².",
        marks: 1,
      },
      {
        id: "q8",
        question: "What is the gravitational potential energy of a 2 kg object at a height of 5 meters (g = 10 m/s²)?",
        options: ["10 J", "20 J", "50 J", "100 J"],
        correctAnswer: 3,
        explanation: "PE = mgh = 2 × 10 × 5 = 100 J",
        marks: 2,
      },
    ],
  },
]

// Mock Study Groups Data
export const mockStudyGroups: StudyGroup[] = [
  {
    id: "group-1",
    name: "Algebra Masters",
    subject: "Mathematics",
    description: "A group dedicated to mastering algebra concepts and problem-solving techniques.",
    members: ["user1", "user2", "user3", "user4"],
    createdBy: "user1",
    createdAt: "2024-01-15",
    maxMembers: 10,
    status: "active",
  },
  {
    id: "group-2",
    name: "Physics Enthusiasts",
    subject: "Physics",
    description: "Discuss physics concepts, solve problems together, and share resources.",
    members: ["user2", "user5", "user6"],
    createdBy: "user2",
    createdAt: "2024-01-20",
    maxMembers: 15,
    status: "active",
  },
  {
    id: "group-3",
    name: "Chemistry Lab",
    subject: "Chemistry",
    description: "Explore chemical reactions, bonding, and organic chemistry together.",
    members: ["user3", "user4", "user7", "user8"],
    createdBy: "user3",
    createdAt: "2024-02-01",
    maxMembers: 12,
    status: "active",
  },
  {
    id: "group-4",
    name: "Biology Buddies",
    subject: "Biology",
    description: "Study cell biology, genetics, and evolution with fellow students.",
    members: ["user1", "user6", "user9"],
    createdBy: "user6",
    createdAt: "2024-02-05",
    maxMembers: 10,
    status: "active",
  },
]

// Mock Doubts Data
export const mockDoubts: Doubt[] = [
  {
    id: "doubt-1",
    userId: "user1",
    userName: "Raj Kumar",
    subject: "Mathematics",
    title: "How to solve quadratic equations using the quadratic formula?",
    description:
      "I'm having trouble understanding when and how to apply the quadratic formula. Can someone explain with examples?",
    createdAt: "2024-10-25T10:30:00Z",
    responses: [
      {
        id: "resp-1",
        userId: "user2",
        userName: "Priya Singh",
        response:
          "The quadratic formula is used when ax² + bx + c = 0. The formula is x = (-b ± √(b²-4ac)) / 2a. Let me give you an example...",
        createdAt: "2024-10-25T11:00:00Z",
        helpful: 5,
        isAccepted: true,
      },
    ],
    status: "resolved",
    views: 23,
  },
  {
    id: "doubt-2",
    userId: "user3",
    userName: "Arjun Patel",
    subject: "Physics",
    title: "Difference between velocity and speed",
    description: "I'm confused about the difference between velocity and speed. Are they the same thing?",
    createdAt: "2024-10-24T14:20:00Z",
    responses: [
      {
        id: "resp-2",
        userId: "user4",
        userName: "Neha Sharma",
        response:
          "Speed is a scalar quantity (only magnitude), while velocity is a vector quantity (magnitude + direction). For example...",
        createdAt: "2024-10-24T15:00:00Z",
        helpful: 8,
        isAccepted: true,
      },
    ],
    status: "resolved",
    views: 45,
  },
  {
    id: "doubt-3",
    userId: "user5",
    userName: "Vikram Singh",
    subject: "Chemistry",
    title: "How does ionic bonding work?",
    description: "Can someone explain ionic bonding in simple terms? I'm struggling with the concept.",
    createdAt: "2024-10-25T09:15:00Z",
    responses: [],
    status: "open",
    views: 12,
  },
]

// Mock Achievements Data
export const mockAchievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Math Streak",
    description: "Study mathematics for 7 consecutive days",
    icon: "🔥",
    criteria: "7 consecutive days of math study",
    type: "streak",
    earnedAt: "2024-10-25T00:00:00Z",
  },
  {
    id: "ach-2",
    title: "Quiz Master",
    description: "Achieve 90% average score on quizzes",
    icon: "🏆",
    criteria: "90% average quiz score",
    type: "score",
    earnedAt: "2024-10-20T00:00:00Z",
  },
  {
    id: "ach-3",
    title: "Early Bird",
    description: "Complete 5 lessons before 9 AM",
    icon: "🌅",
    criteria: "5 lessons completed before 9 AM",
    type: "milestone",
    earnedAt: "2024-10-18T00:00:00Z",
  },
  {
    id: "ach-4",
    title: "Century Club",
    description: "Complete 100 lessons",
    icon: "💯",
    criteria: "100 lessons completed",
    type: "completion",
    progress: 87,
    maxProgress: 100,
  },
  {
    id: "ach-5",
    title: "Perfect Score",
    description: "Score 100% on a practice test",
    icon: "⭐",
    criteria: "100% on practice test",
    type: "score",
  },
  {
    id: "ach-6",
    title: "Knowledge Seeker",
    description: "Watch 50 educational videos",
    icon: "📚",
    criteria: "50 videos watched",
    type: "completion",
    progress: 42,
    maxProgress: 50,
  },
]
