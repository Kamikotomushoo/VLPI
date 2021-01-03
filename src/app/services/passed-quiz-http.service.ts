import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { GlobalErrors } from "../classes/error";
import { IPassedQuizData } from "../interfaces/quiz-data";
import { QuizService } from './quiz-http.service';
import { AuthService } from './auth.service';
import { LoaderHelperService } from '../core/services/loader-helper.service';

@Injectable()
export class PassQuizService {
  apiUrl: string = environment.apiUrl + "/PassedQuiz";

  constructor(
    private http: HttpClient,
    private quizzesService: QuizService,
    private userService: AuthService
  ) {}

  getQuizList(topicName) {
    const quizzes = JSON.parse(localStorage.getItem('passedQuizzes')) || {};
    return (quizzes && quizzes[topicName]) || [];
  }

  getQuiz(quizId: string, topicName: string, userEmail: string): IPassedQuizData {

    const topicsQuizzes = this.getQuizList(topicName);

    return topicsQuizzes.find(quiz => quiz.quizId === quizId && quiz.userEmail === userEmail) || {
      attempt: 0,
      isCorrect: false,
      quizId,
      userEmail,
      id: '',
      answer: ''
    } as IPassedQuizData;
  }

  setNewQuiz(quiz: IPassedQuizData, topicName: string) {
    const realQuiz = this.quizzesService.getQuiz(topicName, quiz.quizId);
    const passedQuiz = this.getQuiz(realQuiz.id, topicName, this.userService.user.getValue().email);

    passedQuiz.isCorrect =  realQuiz.correctTest === quiz.answer;
    if (passedQuiz.isCorrect) {
      passedQuiz.answer = quiz.answer;
    }
    passedQuiz.attempt++;

    const passedQuizzes = this.getQuizList(topicName);
    if (!passedQuiz.id) {

      if (passedQuizzes.length) {
        passedQuiz.id = `${+passedQuizzes[passedQuizzes.length - 1].id + 1}`;
      } else {
        passedQuiz.id = '1';
      }
      passedQuizzes.push(passedQuiz);
    } else {
      const passedQuizIndex = passedQuizzes.findIndex(passedQuizItem => passedQuizItem.id === passedQuiz.id);
      passedQuizzes[passedQuizIndex] = passedQuiz;
    }


    const quizzes = JSON.parse(localStorage.getItem('passedQuizzes')) || {};

    quizzes[topicName] = passedQuizzes;

    localStorage.setItem('passedQuizzes', JSON.stringify(quizzes));

    return passedQuiz;
  }

  deleteQuiz(id: number) {
    return this.http
      .delete(this.apiUrl + "/DeletePassedQuiz/" + id)
      .pipe(catchError(this.errorHandling));
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

  getStatisticsForPassedQuizzes(userEmail: string) {
    const passedQuizzes = JSON.parse(localStorage.getItem('passedQuizzes')) || {};

    const usersPassedQuizzes: any = {};

    Object.keys(passedQuizzes).forEach(key => {
      usersPassedQuizzes[key] = passedQuizzes[key].filter(quiz => quiz.userEmail === userEmail);

      usersPassedQuizzes[key] = {
        allTasks: usersPassedQuizzes[key].length,
        passedTasks: usersPassedQuizzes[key].filter(quiz => quiz.isCorrect).length
      };
    });

    return usersPassedQuizzes;
  }
}
