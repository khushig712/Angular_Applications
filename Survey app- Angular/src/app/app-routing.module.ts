import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from "./header/header.component";

const routes: Routes = [

    {
      path:'',
      component:LoginComponent,
      // pathMatch:'full'
    },
    {
      path:'survey',
      component: FormComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
