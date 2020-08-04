// Author - Abhinav Ramesh
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { SchoolService } from '../services/school.service';
import { School } from '../models/school.model';
import { UserService } from '../services/user.service';
import { SchoolType } from '../models/school-type.model';
import { UserSchools } from '../models/user-schools.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Options {
  name: string;
  id: number;
}
declare var M:any;
@Component({
  selector: 'app-list-of-schools',
  templateUrl: './list-of-schools.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './list-of-schools.component.css',
  ],
  providers: [SchoolService],
})
export class ListOfSchoolsComponent implements OnInit {
  schoolList: School[] = new Array();
  filteredSchools: Observable<School[]>;

  title = 'demo-deploy';
  tempUserSchools: UserSchools = null;
  isLoading: boolean = true;

  form = new FormGroup({
    myControl: new FormControl(),
  });

  constructor(
    private router: Router,
    public schoolService: SchoolService,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}
  
  schoolChoosen: number = 0;

  ngOnInit(): void {
    this.refreshSchoolList();
  }

  reset() {
    this.schoolChoosen = 0;
    this.form.controls['myControl'].setValue('');
  }

  getCard(school: number) {
    if (school) {
      this.schoolChoosen = school;
    } else {
      this.schoolChoosen = 0;
    }
  }

  displayFn(school: School): string {
    return school && school.name ? school.name : '';
  }

  private _filter(name: string): School[] {
    if (name) {
      const filterValue = name.toLowerCase();
      return this.schoolList.filter(
        (school) => school.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }

  //To fetch and display the school rankings
  refreshSchoolList() {
    this.schoolService.getSchoolList().subscribe((res) => {
      this.schoolService.schools = res as School[];
      this.schoolList = this.schoolService.schools;
      this.filteringSchools();
      this.getUserSchools();
      this.isLoading = false;
    });
  }

  filteringSchools() {
    this.filteredSchools = this.form.controls['myControl'].valueChanges.pipe(
      startWith<string | School>(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.schoolList.slice()))
    );
  }

  // Method to add school to user favourites
  addToFavouriteSchools(school: School, schooType:Number) {
    var emailId = this.userService.getUserEmail();
    var userSchools: UserSchools = null;
    this.schoolService.getFavouriteSchool(emailId).subscribe((res) => {
      userSchools = res as UserSchools;
      if (userSchools == null) {
        userSchools = new UserSchools();
        userSchools.userId = emailId;
        var favouriteSchools: SchoolType[] = [];
        var favouriteSchool = new SchoolType();
        favouriteSchool.schoolId = school.id;
        favouriteSchool.schoolName = school.name;
        favouriteSchool.schoolType = schooType;
        favouriteSchools.push(favouriteSchool);
        userSchools.favouriteSchools = favouriteSchools;
        this.schoolService.postFavouriteSchool(userSchools).subscribe((res) => {
          this._snackBar.open("School Added Successfully", "OK", {
            duration: 2000,
          });
        });
      }
      else{
        var favouriteSchool = new SchoolType();
        var favouriteSchools: SchoolType[] = [];
        favouriteSchools = userSchools.favouriteSchools;
        favouriteSchool.schoolId = school.id;
        favouriteSchool.schoolName = school.name;
        favouriteSchool.schoolType = schooType;
        favouriteSchools.push(favouriteSchool);
        userSchools.favouriteSchools = favouriteSchools;
        this.schoolService.postFavouriteSchool(userSchools).subscribe((res) => {
          this._snackBar.open("School Added Successfully", "OK", {
            duration: 2000,
          });
        });
      }
      this.refreshSchoolList();
    });
  }

  getUserSchools() {
    var emailId = this.userService.getUserEmail();
    this.schoolService.getFavouriteSchool(emailId).subscribe((res) => {
    this.tempUserSchools = res as UserSchools;
    }); 
  }

  verifySchoolStatus(school:School):boolean{
    if(this.tempUserSchools != null){
    return this.tempUserSchools.favouriteSchools.some(s => s.schoolId == school.id);
    }
    else{
      return false;
    }
    
  }
}
