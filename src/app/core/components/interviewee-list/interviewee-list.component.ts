import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/services/user-http.service";
import { IUserData } from "src/app/interfaces/user-data";
import { newArray } from "@angular/compiler/src/util";
import { PassQuizService } from 'src/app/services/passed-quiz-http.service';
import { AuthService } from 'src/app/services/auth.service';

const naming = {
  'unit': 'Unit Tests',
  'nUnit': 'NUnit Tests',
  'jUnit': 'JUnit Tests',
  'embUnit': 'Embunit Tests'
};

@Component({
  selector: "app-interviewee-list",
  templateUrl: "./interviewee-list.component.html",
  styleUrls: ["./interviewee-list.component.scss"],
})
export class IntervieweeListComponent implements OnInit {

  passedQuizzesStat: any;
  chartData = [];

  interviewees: Array<IUserData> = [];

  constructor(
    private dialog: MatDialog,
    private userService: AuthService,
    private passedQuizzesService: PassQuizService
  ) {}

  ngOnInit(): void {
    this.passedQuizzesStat = this.passedQuizzesService.getStatisticsForPassedQuizzes(this.userService.user.getValue().email);
    console.log('results', this.passedQuizzesStat);

    Object.keys(this.passedQuizzesStat).forEach(key => {
      this.chartData.push({
        'name': naming[key],
        'series': [
          {
            'name': 'All tasks',
            'value': this.passedQuizzesStat[key].allTasks
          },
          {
            'name': 'Passed tasks',
            'value': this.passedQuizzesStat[key].passedTasks
          }
        ]
      });
    });
  }

}
