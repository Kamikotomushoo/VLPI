import { Component, OnInit, Input } from "@angular/core";
import { IQuizData } from "src/app/interfaces/quiz-data";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { QuizService } from "src/app/services/quiz-http.service";
import { GlobalErrors } from "src/app/classes/error";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PassQuizService } from 'src/app/services/passed-quiz-http.service';

@Component({
  selector: "app-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.scss"],
})
export class QuizListComponent implements OnInit {

  @Input() topic: string;

  quizzes: Array<IQuizData>;

  constructor(
    private dialog: MatDialog,
    private quizService: QuizService,
    private passedQuizService: PassQuizService,
    private router: Router,
    public userService: AuthService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  private get() {
    this.quizzes = this.quizService.getQuizList(this.topic);
  }

  delete(id: string) {
    if (id !== undefined) {
      this.quizzes = this.quizService.deleteQuiz(id, this.topic);
    }
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

  goToTask(quizId: string) {
    if (this.userService.user.getValue().userRole !== 2) {
      this.router.navigate([`/home/quiz/${quizId}`]);
    } else {
      this.router.navigate([`/home/passquiz/${quizId}`]);
    }
  }

  getPassedInfo(quizId: string) {
    const passedQuiz = this.passedQuizService.getQuiz(quizId, this.topic, this.userService.user.getValue().email);

    return passedQuiz.isCorrect ? 'YES' : 'NO';
  }
}
