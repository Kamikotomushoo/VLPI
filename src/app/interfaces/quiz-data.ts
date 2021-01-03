import { IQuestionData, IQuestionViewData } from "./question-data";
import { IUserData } from "./user-data";
import { IPassedQuizAnswer } from "./answer-data";

export interface IQuizData {
  id?: string;
  name?: string;
  timeLimit?: any;
  maxAttempts?: number;
  quizUrl?: string;
  code?: any;
  correctTest?: any;
}

export interface IQuizViewData {
  id?: string;
  name?: string;
  timeLimit?: number;
  maxAttempts?: number;
  quizUrl?: string;
  code?: any;
  correctTest?: any;
}

export interface IPassedQuizData {
  id?: string;
  quizId?: string;
  userEmail?: string;
  answer?: string;
  isCorrect?: boolean;
  attempt?: number;
}

export interface IPassedFullQuizData {
  id?: string;
  grade?: number;
  quizId?: string;
  user?: IUserData;
  answers?: Array<IPassedQuizAnswer>;
}
