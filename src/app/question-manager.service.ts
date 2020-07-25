import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from './question';
import { Observable } from 'rxjs';
import { UserAnswers } from './user-answers';

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
    return this.httpClient.post(
      this.baseUrl + '/saveUserAnswers',
      userAnswers,
      this.noAuthHeader
    );
  }

  saveUserGreScore(emailId: String, score: Number) {
    var body = {
      userEmailID: emailId,
      mockTest: score,
    };
    return this.httpClient.post(
      '/predictor/addHistory',
      body,
      this.noAuthHeader
    );
  }
}
