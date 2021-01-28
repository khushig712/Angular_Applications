import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormDetails,Answers} from 'src/app/shared/form-details.model'

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

    base = 'http://127.0.0.1:5000';
    constructor(private http:HttpClient) { }

    add_survey(FormDetails){
      return this.http.post<any>(`${this.base}/addSurvey`,FormDetails);
    }
}
