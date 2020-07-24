import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    mobileNumber: 0,
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  //HttpMethods

  postUser(user: User) {
    return this.http.post(
      '/user/register',
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      '/user/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get('/user/userProfile');
  }

  updateUserName(user: User) {
    return this.http.post(
      '/user/userProfile/updateFirstName',
      user
    );
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  setUserEmail(email: string) {
    localStorage.setItem('email', email);
  }

  getUserEmail() {
    return localStorage.getItem('email');
  }

  deleteUserEmail() {
    localStorage.removeItem('email');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
