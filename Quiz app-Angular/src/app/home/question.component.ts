import { Question } from './../shared/model/question.model';
import {Component, Input} from '@angular/core';

@Component({
    'selector':'app-question',
    'template':`
    <div class="card mb-2">
    <div class="card-header">
      {{question.qdata}}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" *ngFor="let opt of question.options;index as i">
            <input type="radio" name={{question.qid}}>&nbsp;&nbsp;{{opt}}
      </li>
     
    </ul>
  </div> 
     `
})
export class QuestionComponent{

   @Input() question:Question;


}