import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
// import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { saveAs } from 'file-saver';
import{SurveyService} from 'src/app/survey.service'

import{ SurveyData } from './survey.seeddata';
import { Survey,Data } from 'src/app/shared/survey.model';
import {Ans} from 'src/app/shared/ans.model'
import {FormDetails,Answers} from 'src/app/shared/form-details.model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // survey:Survey[]=[];
  constructor(private surveyservice:SurveyService) { }

  url = 'src/app/survey.json';
  survey:Survey[]=[
        {
            "topicId": "1001",
            "topicName": "Early Childhood Care & Education (ECCE)",
            "data": [
                {
                    "ref": "1.3",
                    "desc": "A National Curricular and Pedagogical Framework for Early Childhood Care and Education (NCPFECCE)",
                },
                {
                    "ref": "1.4",
                    "desc": "Special attention and priority will be given to districts and locations",
                },
				        {
                    "ref": "1.7",
                    "desc": "New pre-schools will be opened. Anganawadis will be linked with primary education",
                }

            ]
        },
        {
            "topicId": "1002",
            "topicName": "Foundational Literacy and Numeracy (FLN)",
            "data": [
                {
                    "ref": "2.5",
                    "desc": "An interim 3-month play-based ‘school preparation module’ for all Grade 1 students, consisting of activities and workbooks consisting components of foundational literacy and numeracy will be prepared",
                },
                {
                    "ref": "2.6",
                    "desc": "A national repository of high-quality resources on foundational literacy and numeracy will be made available on the Digital Infrastructure for Knowledge Sharing (DIKSHA).",
                },
				        {
                    "ref": "2.7",
                    "desc": "Peer-tutoring will be introduced to promote foundational literacy and numeracy.",
                },
                {
                    "ref": "2.9",
                    "desc": "Children are provided simple but energizing breakfast in addition to midday meals. All school children shall undergo regular health check-ups especially for 100% immunization in schools and health cards will be issued to monitor the same.",
                }

            ]
        }
    ];
  oneForm:FormDetails={};
  ngOnInit() {
  }

  section1:string[]=["Satisfactory","Needs Revamp","New Program to be Implemented"]
  section2:string[]=["Administrative","Pedagogical","Other"]
  section3:string[]=["Short Term","Long Term"]

  contForm = new FormGroup({
      name: new FormControl(''/*,[Validators.required,Validators.minLength(5)]*/),
      mobile: new FormControl(''/*,[Validators.required,,Validators.minLength(10)]*/),
      email: new FormControl(''/*,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]*/),
      org: new FormControl(''/*,[Validators.required]*/),
      resp: new FormControl(''/*,[Validators.required]*/),
      //choices: new FormArray([]),
      textOther:new FormControl('')
    });

  // isSubmitted=false;
  survey_to_post={'surveys':this.oneForm};
  reset=true;
  onSubmit() {
    // console.log(this.contForm.value);
    this.oneForm.name=this.contForm.controls['name'].value;
    this.oneForm.mobile=this.contForm.controls['mobile'].value;
    this.oneForm.email=this.contForm.controls['email'].value;
    this.oneForm.org=this.contForm.controls['org'].value;
    this.oneForm.resp=this.contForm.controls['resp'].value;
    this.oneForm.answers=this.answers;

    this.contForm.reset();
    this.survey_to_post={'surveys':this.oneForm};
    console.log(JSON.parse(JSON.stringify(this.oneForm)));
    // console.log(this.oneForm);
    this.surveyservice.add_survey(this.oneForm).subscribe(resp=>{console.log(resp)});
  }
  enable:boolean[]=[];
  answers:Answers[]=[];
  oneAns:Answer={};
  // surveys:any={'surveys':this.oneForm};
  onCheckChange(event,id,idx,ref,section) {
    var found=0;
    if(event.target.value=="Other"){
      this.enable[idx]=true;
    }
    var value=event.target.value;
    if(value=="Other"){
      value="Other"+" " +this.contForm.controls['textOther'].value;
    }
    if(this.answers.length!=0){
      for(let ans of this.answers){
        if(ans.ref==ref && ans.section==section){
          ans.choice=value;
          found=1;
          break;
        }
      }
    }
    if(found==0)
      this.answers.push({topicId:this.survey[id].topicId,ref:ref,section:section,choice:value});

    // console.log(this.answers);
  }
}
