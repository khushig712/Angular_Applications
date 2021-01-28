import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
//import { HeaderComponent } from "./header/header.component";
//import { IplComponent } from './ipl/ipl.component';
import { FormGroup, FormControl } from '@angular/forms';

const routes: Routes = [

    {
      path:'',
      component:HomeComponent,
      pathMatch:'full'
    },
    {
      path:'quiz',
      component: QuizComponent
    },
    {
      path:'ipl',
      loadChildren: ()=>import("./ipl/ipl.module").then(m=>m.IplModule)
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
