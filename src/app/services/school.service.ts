import { Injectable } from '@angular/core';
import { School } from '../models/school.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  selectedSchool: School;
  schools: School[];
  readonly baseURL = '/schoolRankings';

  //Used to fetch all the school details from the API
  getSchoolList(){
    return this.http.get(this.baseURL);
  }
}
