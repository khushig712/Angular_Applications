import { Question } from './../shared/model/question.model';
import { Component, OnInit } from '@angular/core';
import {Server} from '../shared/model/server.model';
import {Contact} from '../shared/model/contact.model';
import * as seeddata from  '../shared/model/seeddata';
import {Player} from '../shared/model/player.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = "Welcome to Angular World!";
  imgSrc = "../../assets/img/off.png";
  username:string = "Manoj Kumar";
  status = false;

  viewType:string = 'table';

  players:Player[] = seeddata.players;

  searchStr:string="";
  searchResPlayers:Player[] = [];
  name:string="";
  contTmp:Contact[]=[];
  questions:Question[] = [

    {"qid":1001,"qdata":"Does Python support ++ operator?","options":["yes","no","Sometimes","Always"],"ans":2},

    {"qid":1002,"qdata":"Does Python support -- operator?","options":["yes","no","Sometimes","Always"],"ans":2},

    ]

  contacts:Contact[] = [
    {"name":"Khushi Gupta","dob":new Date(1999,11,7),"email":"gkhushi712@gmail.com","mobile":8769478094},
  ];
    contForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(5)]),
      dob: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required,Validators.minLength(10)])
    });

  constructor() { }

  ngOnInit(): void {
  }

  removeCont(cont:Contact){
    this.contacts = this.contacts.filter(e=>e.name !== cont.name);
  }
  name_readonly = false;

  editCont(cont:Contact){
      this.contTmp= this.contacts.filter(e=>e.name == cont.name);
      this.display(this.contTmp[0]);
      this.name_readonly=true;
  }

  search(){
        if(this.searchStr.trim().length!=0){
         this.searchResPlayers = this.players.filter(p=>p.name.toLocaleLowerCase().includes(this.searchStr.toLocaleLowerCase()));
      }else{
          this.searchResPlayers = [];
      }
  }
  display(cont:Contact){
    this.contForm = new FormGroup({
      name: new FormControl(cont.name,[Validators.required,Validators.minLength(5)]),
      dob: new FormControl(cont.dob,[Validators.required]),
      email: new FormControl(cont.email,[Validators.required]),
      mobile: new FormControl(cont.mobile,[Validators.required,Validators.minLength(10)])
    });
  }
  onSubmit() {
    console.warn(this.contForm.value);
    this.removeCont(this.contForm.value);
    this.contacts.push(this.contForm.value);
    this.contForm.reset();
    this.name_readonly=false;
  }
}
