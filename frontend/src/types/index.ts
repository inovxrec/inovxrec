export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  solved: boolean;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    [key: string]: string;
  };
}

export interface Submission {
  id: string;
  problemId: string;
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error' | 'pending';
  language: string;
  runtime?: number;
  memory?: number;
  code: string;
  timestamp: Date;
  failedTestCase?: {
    input: string;
    expected: string;
    actual: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  recentSubmissions: Submission[];
}

export type Language = 'javascript' | 'python' | 'java' | 'cpp';

export const SUPPORTED_LANGUAGES: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];
