import { Component, OnInit, Type, OnDestroy } from "@angular/core";
import { IQuizViewData, IPassedQuizData } from "src/app/interfaces/quiz-data";
import { ErrorDialogComponent } from "../../../../core/components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { QuizService } from "src/app/services/quiz-http.service";
import { ActivatedRoute } from "@angular/router";
import { ICustomTimeLimit } from "src/app/interfaces/time-limit";
import { PassQuizService } from "src/app/services/passed-quiz-http.service";
import {
  IPassedQuizAnswer,
  IAnswerViewData,
} from "src/app/interfaces/answer-data";
import { Subscription } from 'rxjs';
import { RouterHelperService } from 'src/app/core/services/router-helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderHelperService } from 'src/app/core/services/loader-helper.service';

@Component({
  selector: "app-pass-quiz",
  templateUrl: "./pass-quiz.component.html",
  styleUrls: ["./pass-quiz.component.scss"],
})
export class PassQuizComponent implements OnInit, OnDestroy {
  id: string;
  quiz: IQuizViewData;
  quizTime: ICustomTimeLimit = { minutes: 0, seconds: 0 };
  passedQuiz: IPassedQuizData = {
    quizId: this.id,
    userEmail: this.userService.user.getValue().email,
    answer: '',
  };
  timeLimit: ICustomTimeLimit = { minutes: 0, seconds: 0 };
  interval;
  topicName: string;

  selectedTopicSub$: Subscription;

  constructor(
    private dialog: MatDialog,
    private quizService: QuizService,
    private passQuizService: PassQuizService,
    private activateRoute: ActivatedRoute,
    private routerHelper: RouterHelperService,
    private userService: AuthService,
    private loader: LoaderHelperService
  ) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this.selectedTopicSub$ = this.routerHelper.selectedTopic.subscribe(topicName => {
      this.topicName = topicName;
      if (this.id) {
        this.getById(this.topicName, this.id);

        if (!this.passedQuiz.isCorrect) {
          this.setTimelimit();
          this.setTimer();
        }
      }
    });

  }

  getById(topicName, id: string) {
    this.quiz = this.quizService.getQuiz(topicName, id);

    this.passedQuiz = this.passQuizService.getQuiz(this.quiz.id, this.topicName, this.userService.user.getValue().email);
    console.log('passedQuiz', this.passedQuiz);
  }

  setTimelimit() {
    this.timeLimit.minutes = Math.floor((this.quiz.timeLimit / 60) || 0);
    this.timeLimit.seconds = Math.floor((this.quiz.timeLimit % 60) || 0);
  }

  createQuiz(quiz: IPassedQuizData) {
    this.passedQuiz = this.passQuizService.setNewQuiz(quiz, this.topicName);
    alert(this.passedQuiz.isCorrect ? 'You passed the task' : 'You failed');

    if (!this.passedQuiz.isCorrect) {
      this.goBack();
    }

  }

  confirm() {
    this.loader.isLoad.next(true);
    clearInterval(this.interval);
    setTimeout(() => {
      this.passedQuiz.quizId = this.id;
      this.createQuiz(this.passedQuiz);
      this.loader.isLoad.next(false);
    }, 1500);
  }

  setTimer() {
    this.interval = setInterval(() => {
      if (this.timeLimit.seconds === 0 && this.timeLimit.minutes > 0) {
        this.timeLimit.seconds = 59;
        if (this.timeLimit.minutes > 0) {
          this.timeLimit.minutes--;
        }
      } else if (this.timeLimit.seconds > 0) {
        this.timeLimit.seconds--;
      } else {
        clearInterval(this.interval);
        alert("Stop!");
        this.confirm();
      }
    }, 1000);
  }


  updateTimeType = (part: number) =>
    part.toString().length > 1 ? part : `0${part}`

  getTimeLimit = (timeLimit: ICustomTimeLimit) =>
    `${this.updateTimeType(timeLimit.minutes || 0)}:${this.updateTimeType(
      timeLimit.seconds || 0)}`


  goBack() {
    clearInterval(this.interval);
    window.history.back();
  }

  ngOnDestroy() {
    this.selectedTopicSub$.unsubscribe();
  }
}
