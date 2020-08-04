// Author - Abhinav Ramesh
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolType } from '../models/school-type.model';
import { UserSchools } from '../models/user-schools.model';
import { SchoolService } from '../services/school.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var M: any;
@Component({
  selector: 'app-my-schools',
  templateUrl: './my-schools.component.html',
  styleUrls: ['./my-schools.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [SchoolService],
})
export class MySchoolsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dream_dataSource: MatTableDataSource<SchoolType>;
  reach_dataSource: MatTableDataSource<SchoolType>;
  safe_dataSource: MatTableDataSource<SchoolType>;

  tempUserSchools: UserSchools = null;
  dreamSchools: SchoolType[] = new Array();
  reachSchools: SchoolType[] = new Array();
  safeSchools: SchoolType[] = new Array();

  constructor(
    public schoolService: SchoolService,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild('paginatorDream', { static: true }) paginatorDream: MatPaginator;
  @ViewChild('paginatorReach', { static: true }) paginatorReach: MatPaginator;
  @ViewChild('paginatorSafe', { static: true }) paginatorSafe: MatPaginator;

  ngOnInit() {
    this.getUserSchools();
  }

  getUserSchools() {
    var emailId = this.userService.getUserEmail();
    this.schoolService.getFavouriteSchool(emailId).subscribe((res) => {
      this.tempUserSchools = res as UserSchools;
      if (this.tempUserSchools != null) {
        var favouriteSchools: SchoolType[] = new Array();
        this.dreamSchools = [];
        this.reachSchools = [];
        this.safeSchools = [];
        favouriteSchools = this.tempUserSchools.favouriteSchools;
        for (var favouriteSchool of favouriteSchools) {
          if (favouriteSchool.schoolType == 1) {
            this.dreamSchools.push(favouriteSchool);
          }
          if (favouriteSchool.schoolType == 2) {
            this.reachSchools.push(favouriteSchool);
          }
          if (favouriteSchool.schoolType == 3) {
            this.safeSchools.push(favouriteSchool);
          }
        }
        this.dream_dataSource = new MatTableDataSource(this.dreamSchools);
        this.dream_dataSource.paginator = this.paginatorDream;
        this.reach_dataSource = new MatTableDataSource(this.reachSchools);
        this.reach_dataSource.paginator = this.paginatorReach;
        this.safe_dataSource = new MatTableDataSource(this.safeSchools);
        this.safe_dataSource.paginator = this.paginatorSafe;
      }
    });
  }

  deleteSchool(schoolId: Number) {
    var emailId = this.userService.getUserEmail();
    this.schoolService
      .removeFavouriteSchool(emailId, schoolId)
      .subscribe((res) => {
        this._snackBar.open('School Removed Successfully', 'OK', {
          duration: 2000,
        });
        this.getUserSchools();
      });
  }
}
