import { Component, OnInit, Type, OnDestroy } from "@angular/core";
import { IQuizData } from "src/app/interfaces/quiz-data";
import { ErrorDialogComponent } from "../../../../core/components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { QuizService } from "src/app/services/quiz-http.service";
import { GlobalErrors } from "src/app/classes/error";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ITimeLimit, ICustomTimeLimit } from "src/app/interfaces/time-limit";
import { QuestionService } from "src/app/services/question-http.service";
import { IQuestionData } from "src/app/interfaces/question-data";
import { RouterHelperService } from 'src/app/core/services/router-helper.service';
import { Subscription } from 'rxjs';
import { LoaderHelperService } from 'src/app/core/services/loader-helper.service';

type TimePart = "minute" | "second";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent implements OnInit, OnDestroy {

  id: string;
  quiz: IQuizData;
  quizTime: ICustomTimeLimit = { minutes: 0, seconds: 0 };
  topicName: string;

  selectedTopicSub$: Subscription;

  constructor(
    private dialog: MatDialog,
    private quizService: QuizService,
    private questionService: QuestionService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private routerHelper: RouterHelperService,
    private loader: LoaderHelperService
  ) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this.selectedTopicSub$ = this.routerHelper.selectedTopic.subscribe(topicName => {
      this.topicName = topicName;
      if (this.id) {
        this.getById(this.topicName, this.id);
      } else {
        this.createNewQuiz();
      }

    });

  }

  getById(topicName: string, id: string) {
    this.quiz = this.quizService.getQuiz(topicName, id);
    console.log('quiz', this.quiz);
    this.setTimelimit();
  }

  createNewQuiz() {
    this.quiz = {
          name: '',
          timeLimit: 0,
          maxAttempts: 0,
          quizUrl: '',
          code: '',
          correctTest: ''
        };

  }

  setTimelimit() {
    this.quizTime.minutes = Math.floor((this.quiz.timeLimit / 60) || 0);
    this.quizTime.seconds = Math.floor((this.quiz.timeLimit % 60) || 0);
  }

  updateTimeType = (part: number) => part.toString().length > 1 ? part : `0${part}`

  getTimeLimit = (timeLimit: ITimeLimit) =>
    `${this.updateTimeType(timeLimit.minutes || 0)}:${this.updateTimeType(
      timeLimit.seconds || 0)}`

  update(quiz: IQuizData) {

    this.quiz = this.quizService.updateQuiz(quiz, this.topicName);

  }

  createQuiz() {
    this.quiz = this.quizService.setNewQuiz(this.quiz, this.topicName);
    console.log('quiz', this.quiz);
  }

  confirm() {
    this.loader.isLoad.next(true);
    setTimeout(() => {
      if (this.id) {
        this.update(this.quiz);
      } else {
        this.createQuiz();
      }
      this.loader.isLoad.next(false);
    }, 1500);
  }


  onTimeLimitChange(event: any, type: TimePart) {
    const value = Number(event.target.value);

    if (type === "minute") {
      if (value < 0) {
        this.quizTime.minutes = 0;
      } else if (value > 60) {
        this.quizTime.minutes = 60;
      } else {
        this.quizTime.minutes = value;
      }
    } else if (type === "second") {
      if (value < 0) {
        this.quizTime.seconds = 0;
      } else if (value > 59) {
        this.quizTime.minutes++;
        this.quizTime.seconds = 0;
      } else {
        this.quizTime.seconds = value;
      }
    }

    this.quiz.timeLimit = this.quizTime.minutes * 60 + this.quizTime.seconds;
  }

  onPassGradeChange() {
    // if (this.quiz.passGrade > 100) {
    //   this.quiz.passGrade = 100;
    // } else if (this.quiz.passGrade < 0) {
    //   this.quiz.passGrade = 0;
    // }
  }

  private openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "fit-content",
      data: errorName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  goBack() {
    window.history.back();
  }

  ngOnDestroy() {
    this.selectedTopicSub$.unsubscribe();
  }
}
