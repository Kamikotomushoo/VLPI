import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { throwError, BehaviorSubject } from "rxjs";
import { GlobalErrors } from "../classes/error";
import { IQuizData, IQuizViewData } from "../interfaces/quiz-data";

@Injectable()
export class QuizService {
  apiUrl: string = environment.apiUrl + "/Quiz";

  currentQuizzes$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getQuizList(topicName: string): IQuizData[]  {

    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    return (quizzes && quizzes[topicName]) || [];
  }

  getQuiz(topicName: string, id: string): IQuizData {
    const quizzes: any = JSON.parse(localStorage.getItem('quizzes')) || {};

    const topicsQuizzes = (quizzes && quizzes[topicName]) || [];

    return topicsQuizzes.find(quiz => quiz.id === id);

  }

  setNewQuiz(quiz: IQuizData, topicName: string) {
    const quizzes: any = JSON.parse(localStorage.getItem('quizzes')) || {};

    const topicsQuizzes = (quizzes && quizzes[topicName]) || [];

    const newId = topicsQuizzes.length ? `${+topicsQuizzes[topicsQuizzes.length - 1].id + 1}` : '1';
    quiz.id = newId;

    topicsQuizzes.push(quiz);

    quizzes[topicName] = topicsQuizzes;

    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    return quiz;

  }

  updateQuiz(quiz: IQuizData, topicName: string) {

    const quizzes: any = JSON.parse(localStorage.getItem('quizzes')) || {};
    const topicsQuizzes = (quizzes && quizzes[topicName]) || [];

    const existedQuizIndex = topicsQuizzes.findIndex(quizItem => quizItem.id === quiz.id);
    topicsQuizzes[existedQuizIndex] = quiz;

    quizzes[topicName] = topicsQuizzes;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    return quiz;

  }

  deleteQuiz(id: string, topicName) {
    const topicsQuizzes = this.getQuizList(topicName);

    const index = topicsQuizzes.findIndex(quiz => quiz.id === id);

    topicsQuizzes.splice(index, 1);

    const quizzes = JSON.parse(localStorage.getItem('quizzes'));

    quizzes[topicName] = topicsQuizzes;

    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    return topicsQuizzes;
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
    if (
      errorResponse.name !== undefined &&
      errorResponse.name === GlobalErrors.undefinedError
    ) {
      return throwError({
        name: errorResponse.name,
        message: errorResponse.message,
      });
    }
    return throwError(errorResponse.message);
  }
}
