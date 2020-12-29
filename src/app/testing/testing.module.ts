import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user-http.service';
import { SignInUpValidator } from '../validators/sign-in-up.validator';
import { QuizService } from '../services/quiz-http.service';
import { PassQuizService } from '../services/passed-quiz-http.service';
import { AnswerService } from '../services/answer-http.service';
import { QuestionService } from '../services/question-http.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpAuthInterceptor } from '../classes/http-auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    TestingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [
    TestingComponent
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [
    AuthService,
    UserService,
    SignInUpValidator,
    QuizService,
    PassQuizService,
    AnswerService,
    QuestionService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    JwtHelperService,
  ]
})
export class TestingModule { }
