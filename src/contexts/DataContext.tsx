import React, { createContext, useContext, useState } from 'react';

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  totalLessons: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  date: string;
  progress: number;
  assignment: {
    status: 'not-started' | 'submitted' | 'reviewed';
    submission?: string;
    feedback?: string;
    score?: number;
  };
  videoUrl?: string;
  materials: string[];
  quiz?: Quiz;
  duration: number;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  badges: string[];
}

interface DataContextType {
  modules: Module[];
  leaderboard: LeaderboardEntry[];
  updateLessonProgress: (lessonId: string, progress: number) => void;
  submitAssignment: (lessonId: string, submission: string) => void;
  getLesson: (lessonId: string) => Lesson | undefined;
  getModule: (moduleId: string) => Module | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Mind Management Mastery',
      icon: 'Brain',
      description: 'Master your mindset and cognitive abilities for better decision-making',
      totalLessons: 8,
      completedLessons: 3,
      lessons: [
        {
          id: '1',
          moduleId: '1',
          title: 'Introduction to Mind Management',
          date: '2024-01-15',
          progress: 100,
          assignment: { status: 'reviewed', score: 95, feedback: 'Excellent understanding of core concepts!' },
          materials: ['Mind Management Guide.pdf', 'Reflection Journal.pdf'],
          duration: 45
        },
        {
          id: '2',
          moduleId: '1',
          title: 'Cognitive Biases and Decision Making',
          date: '2024-01-17',
          progress: 75,
          assignment: { status: 'submitted' },
          materials: ['Cognitive Biases Handbook.pdf'],
          duration: 60
        }
      ]
    },
    {
      id: '2',
      title: 'Emotional Intelligence',
      icon: 'Heart',
      description: 'Develop emotional awareness and interpersonal skills',
      totalLessons: 6,
      completedLessons: 1,
      lessons: [
        {
          id: '3',
          moduleId: '2',
          title: 'Understanding Emotional Intelligence',
          date: '2024-01-20',
          progress: 100,
          assignment: { status: 'reviewed', score: 88 },
          materials: ['EQ Assessment.pdf'],
          duration: 50
        }
      ]
    },
    {
      id: '3',
      title: 'Decision-Making Mastery',
      icon: 'Target',
      description: 'Learn frameworks for effective strategic decision-making',
      totalLessons: 7,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '4',
      title: 'Productivity Mastery',
      icon: 'Zap',
      description: 'Optimize your time and energy for maximum output',
      totalLessons: 5,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '5',
      title: 'Communication Mastery',
      icon: 'MessageCircle',
      description: 'Master verbal and non-verbal communication skills',
      totalLessons: 8,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '6',
      title: 'Giving Effective Feedback',
      icon: 'MessageSquare',
      description: 'Learn to give constructive and impactful feedback',
      totalLessons: 4,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '7',
      title: 'Motivation & Ownership',
      icon: 'Trophy',
      description: 'Build intrinsic motivation and accountability',
      totalLessons: 6,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '8',
      title: 'Conflict Management',
      icon: 'Shield',
      description: 'Navigate and resolve conflicts effectively',
      totalLessons: 5,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '9',
      title: 'Trust & Openness',
      icon: 'Users',
      description: 'Build trust and foster open communication',
      totalLessons: 4,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '10',
      title: 'Delegation Mastery',
      icon: 'UserCheck',
      description: 'Master the art of effective delegation',
      totalLessons: 5,
      completedLessons: 0,
      lessons: []
    },
    {
      id: '11',
      title: 'Problem Solving & Critical Thinking',
      icon: 'Lightbulb',
      description: 'Develop analytical and creative problem-solving skills',
      totalLessons: 7,
      completedLessons: 0,
      lessons: []
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rank: 1,
      totalPoints: 2450,
      weeklyPoints: 320,
      monthlyPoints: 1200,
      badges: ['Focus Champion', 'Decision Master']
    },
    {
      id: '2',
      name: 'Anita Desai',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rank: 2,
      totalPoints: 2380,
      weeklyPoints: 280,
      monthlyPoints: 1150,
      badges: ['Communication Pro']
    },
    {
      id: '3',
      name: 'Vikram Singh',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rank: 3,
      totalPoints: 2200,
      weeklyPoints: 250,
      monthlyPoints: 980,
      badges: ['Problem Solver']
    },
    {
      id: '4',
      name: 'Meera Patel',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rank: 4,
      totalPoints: 2100,
      weeklyPoints: 220,
      monthlyPoints: 900,
      badges: ['Team Builder']
    }
  ]);

  const updateLessonProgress = (lessonId: string, progress: number) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, progress } : lesson
        )
      }))
    );
  };

  const submitAssignment = (lessonId: string, submission: string) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, assignment: { ...lesson.assignment, status: 'submitted', submission } }
            : lesson
        )
      }))
    );
  };

  const getLesson = (lessonId: string): Lesson | undefined => {
    for (const module of modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  };

  const getModule = (moduleId: string): Module | undefined => {
    return modules.find(m => m.id === moduleId);
  };

  return (
    <DataContext.Provider value={{
      modules,
      leaderboard,
      updateLessonProgress,
      submitAssignment,
      getLesson,
      getModule
    }}>
      {children}
    </DataContext.Provider>
  );
};