import { Component, OnInit, Input } from '@angular/core';
import { IQuizData } from 'src/app/interfaces/quiz-data';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss']
})
export class CustomEditorComponent implements OnInit {

  @Input() quiz: IQuizData;
  @Input() field: string;

  constructor() { }

  ngOnInit(): void {
  }

}
