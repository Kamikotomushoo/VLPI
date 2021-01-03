import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { IntervieweeListComponent } from './components/interviewee-list/interviewee-list.component';
import { QuillModule } from 'ngx-quill';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CustomEditorComponent } from './components/custom-editor/custom-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    QuizListComponent,
    ErrorDialogComponent,
    IntervieweeListComponent,
    SafeHtmlPipe,
    CustomEditorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BarChartModule
  ],
  exports: [
    LoadingSpinnerComponent,
    QuizListComponent,
    ErrorDialogComponent,
    IntervieweeListComponent,
    SafeHtmlPipe,
    CustomEditorComponent
  ],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class CoreModule { }
