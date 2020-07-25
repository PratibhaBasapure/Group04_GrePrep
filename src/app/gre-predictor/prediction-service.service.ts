import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionServiceService {

  constructor(private http: HttpClient) { }

  getColleges(user) {
    return this.http.get('/predictor/predict?userEmailID=' + user);
  }
}
