// Author - Abhinav Ramesh
import { Injectable } from '@angular/core';
import { School } from '../models/school.model';
import { UserSchools } from '../models/user-schools.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  selectedSchool: School;
  schools: School[];
  readonly schoolRankingURL = '/schoolRankings';
  readonly addSchoolURL = '/schools/addSchools';
  readonly removeSchoolURL = '/schools/removeSchools';
  readonly getFavouriteSchoolURL = '/schools';

  //Used to fetch all the school details from the API
  getSchoolList() {
    return this.http.get(this.schoolRankingURL);
  }

  postFavouriteSchool(userSchool: UserSchools) {
    return this.http.post(this.addSchoolURL, userSchool);
  }

  getFavouriteSchools() {
    return this.http.get(this.getFavouriteSchoolURL);
  }

  getFavouriteSchool(emailId: String) {
    return this.http.get(this.getFavouriteSchoolURL + '/' + emailId);
  }

  removeFavouriteSchool(emailId: String, schoolId: Number) {
    var body = {
      userId: emailId,
      schoolId: schoolId,
    };
    return this.http.put(this.removeSchoolURL, body);
  }
}
