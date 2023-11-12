import { Assignment } from 'src/assignments/assignments.interface';
import { User } from 'src/users/user.interface';

export interface UserAssignment extends User {
  assignments: Assignment[];
}

export interface AssignmentCompletionRate {
  totalAnswers: number;
  totalQuestions: number;
  completion: number;
}

export interface StudentProgressResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  completionRate: number;
  attempts: number;
  timeSpent: string;
  bestScore: number;
  assignments: number;
}
