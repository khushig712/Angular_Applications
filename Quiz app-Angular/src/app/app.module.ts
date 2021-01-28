import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { QuizData } from './quiz/quiz.seeddata';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { QuizComponent } from './quiz/quiz.component';
//import { IplComponent } from './ipl/ipl.component';

import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule} from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    QuizComponent,
    //IplComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [QuizData],
  bootstrap: [AppComponent]
})
export class AppModule { }
