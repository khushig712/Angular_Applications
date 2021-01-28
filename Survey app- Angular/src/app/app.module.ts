import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component'
import { FormComponent } from './form/form.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule ,AppRoutingModule],
  declarations: [ AppComponent, FormComponent, LoginComponent, HeaderComponent],
  providers:[AuthService, AuthGuard,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
