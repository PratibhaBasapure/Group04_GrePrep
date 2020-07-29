// Author - Padmesh Donthu
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { UserAnswers } from '../models/user-answers';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class QuestionManagerService {
  private baseUrl = '/question';

  public questionCount = 0;

  public questionType = '';

  public answerId: string = '-1';

  constructor(private httpClient: HttpClient) {}

  // Get request to get list of questions from the database
  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.baseUrl);
  }

  // Post request to save the user answers for the attempted test to the database
  saveUserAnswers(userAnswers: UserAnswers) {
    return this.httpClient.post(this.baseUrl + '/saveUserAnswers', userAnswers);
  }

  // Post request to save the calculated GRE Score for the Mock Test to the database
  saveUserGreScore(emailId: String, score: Number, data: any) {
    var body = {
      userEmailID: emailId,
      mockTest: score,
      mockTestId: data,
    };
    return this.httpClient.post('/predictor/addHistory', body);
  }

  // Post request to save the calculated Quiz Score to the database
  saveUserQuizScore(emailId: String, score: Number, data: any) {
    var body = {
      userEmailID: emailId,
      quiz: score,
      quizTestId: data,
    };
    return this.httpClient.post(this.baseUrl + '/addQuizHistory', body);
  }

  // Get request to get the list of questions for the Quiz
  getQuestionsForQuiz(): Observable<Question[]> {
    let url = this.baseUrl + '/getQuizQuestions/' + this.questionCount;
    return this.httpClient.get<Question[]>(url);
  }

  // Get request to get the list of questions for the Verbal Practice
  getQuestionsForVerbalAndQuantPractice(): Observable<Question[]> {
    let url = this.baseUrl + '/getVerbalAndQuantQuestions';
    var requestParams = new HttpParams();
    requestParams = requestParams.set(
      'questionCount',
      this.questionCount.toString()
    );
    requestParams = requestParams.set('questionType', this.questionType);
    return this.httpClient.get<Question[]>(url, { params: requestParams });
  }

  // Post request to save the calculated Quiz Score to the database
  saveUserVerbalPracticeScore(emailId: String, score: Number, data: any) {
    var body = {
      userEmailID: emailId,
      score: score,
      verbalTestId: data,
    };
    return this.httpClient.post(
      this.baseUrl + '/addVerbalPracticeHistory',
      body
    );
  }

  // Post request to save the calculated Quiz Score to the database
  saveUserQuantPracticeScore(emailId: String, score: Number, data: any) {
    var body = {
      userEmailID: emailId,
      score: score,
      quantTestId: data,
    };
    return this.httpClient.post(
      this.baseUrl + '/addQuantPracticeHistory',
      body
    );
  }

  // Get request to get the user's attempt history
  getAttemptHistory(emailId: string): Observable<Test> {
    let url = this.baseUrl + '/getAttemptHistory';
    var requestParams = new HttpParams();
    requestParams = requestParams.set('userEmailID', emailId);
    return this.httpClient.get<Test>(url, { params: requestParams });
  }

  // Get request to get the list of answers for the test taken by an user
  getAnswers(): Observable<UserAnswers> {
    let url = this.baseUrl + '/getAnswers';
    var requestParams = new HttpParams();
    requestParams = requestParams.set('id', this.answerId);
    return this.httpClient.get<UserAnswers>(url, { params: requestParams });
  }
}
