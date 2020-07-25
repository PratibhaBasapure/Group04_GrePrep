import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { UserAnswers } from '../models/user-answers';

@Injectable({
  providedIn: 'root',
})
export class QuestionManagerService {
  private baseUrl = '/question';

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private httpClient: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.baseUrl);
  }

  saveUserAnswers(userAnswers: UserAnswers) {
    return this.httpClient.post(this.baseUrl + '/saveUserAnswers', userAnswers);
  }

  saveUserGreScore(emailId: String, score: Number) {
    var body = {
      userEmailID: emailId,
      mockTest: score,
    };
    return this.httpClient.post('/predictor/addHistory', body);
  }
}
