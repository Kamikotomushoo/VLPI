import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";
import { LoginFormComponent } from "./components/auth/login-form/login-form.component";
import { RegistrationFormComponent } from "./components/auth/registration-form/registration-form.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./services/auth.guard";
import { QuizComponent } from "./components/home/admin/quiz/quiz.component";
import { QuestionComponent } from "./components/home/admin/question/question.component";
import { PassQuizComponent } from "./components/home/interviewee/pass-quiz/pass-quiz.component";
import { TestingComponent } from './testing/testing.component';
import { IntervieweeListComponent } from './core/components/interviewee-list/interviewee-list.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const appRoutes: Routes = [
  { path: "", component: WelcomePageComponent },
  { path: "login", component: LoginFormComponent },
  { path: "registration", component: RegistrationFormComponent },
  { path: "profile", component:  ProfilePageComponent},
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "testing",
        component: TestingComponent,
        children: [
          { path: "statistics", component: IntervieweeListComponent },
        ]
      },
      { path: "quiz", component: QuizComponent },
      { path: "quiz/:id", component: QuizComponent },
      { path: "passquiz/:id", component: PassQuizComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
