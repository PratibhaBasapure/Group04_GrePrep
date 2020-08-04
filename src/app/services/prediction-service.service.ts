// Author - Neelesh Singh
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PredictionServiceService {
  constructor(private http: HttpClient) {}

  getColleges(user: string) {
    const requestBody = {
      userEmailID: user,
    };
    return this.http.post('/predictor/predict', requestBody);
  }
}
