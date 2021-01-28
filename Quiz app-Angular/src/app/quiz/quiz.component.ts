import { Question } from './../shared/model/question.model';
import { QuizData } from './quiz.seeddata';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions:Question[]=[];
  answerKey:Map<number,number>;

  timeOver=false;

  result:any;
  status:any;
  isSubmitted;

  timeLeft: number = 120;
  interval;
  subscribeTimer: any;

  mins:number=2;
  secs:number=0;

  constructor(private dataService:QuizData) { }

  displayTimer(){
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.mins=Math.floor((this.timeLeft)/60);
        this.secs=(this.timeLeft)%60;
      } else {
          alert("Time Over! Please submit");
          clearInterval(this.interval);
          this.timeOver=true;
        }
    },1000)
  }

  stopTimer(){
    clearInterval(this.interval);
  }

  ngOnInit(): void {
      this.correct=[];
      this.displayTimer();
      this.timeOver=false;
      this.questions = this.dataService.getQuestionWithOutAnswers();
      this.answerKey = this.dataService.getAnswerKeys();
      console.log(this.answerKey)
  }

  ngOnDestroy(): void{
    clearInterval(this.interval);
  }
  correct=[];
  onSubmit(f){
    this.correct=[];
    this.isSubmitted = true;
    this.stopTimer();
    //alert(f.value)
    let ccount =0;
    for(let q of this.questions){
        let ans = this.answerKey[q.qid];
        if(ans==q.ans){
          ccount++;
          this.correct.push(true);
        }
        else{
          this.correct.push(false);
        }
    }
    let score;
    score = (ccount/this.questions.length) * 100;
    this.status = score >= 40;
     if(ccount > 0){
        let i = 1;
        let s = setInterval(()=>{
          if(i >= score -1){
            clearInterval(s);
          }
          i = i + 1;
          this.result = i;
        },0)
    }
    else
     this.result = 0;
    f.reset();
    window.scroll(0,0);
    setTimeout(()=>{
        this.isSubmitted = false;
    },15000)

   }

}
