import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolType } from '../models/school-type.model';
import { UserSchools } from '../models/user-schools.model';
import { SchoolService } from '../services/school.service';
import { UserService } from '../services/user.service';

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
  loading: boolean = true;
  tempUserSchools: UserSchools = null;
  dreamSchools: SchoolType[] = new Array();
  reachSchools: SchoolType[] = new Array();
  safeSchools: SchoolType[] = new Array();

  // Variables to set the paginator and sorting for the table
  private paginatorDream: MatPaginator;
  private paginatorReach: MatPaginator;
  private paginatorSafe: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginatorDream = mp;
    this.paginatorReach = mp;
    this.paginatorSafe = mp;
    this.setDataSourceAttributes();
  }

  // Method to set the attributes like paging, sorting for the table
  setDataSourceAttributes() {
    if (!this.loading) {
      this.dream_dataSource.paginator = this.paginatorDream;
      this.dream_dataSource.sort = this.sort;
      this.reach_dataSource.paginator = this.paginatorReach;
      this.reach_dataSource.sort = this.sort;
      this.safe_dataSource.paginator = this.paginatorSafe;
      this.safe_dataSource.sort = this.sort;
    }
  }

  constructor(
    public schoolService: SchoolService,
    public userService: UserService
  ) {}

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
        this.loading = false;
        this.dream_dataSource = new MatTableDataSource(this.dreamSchools);
        this.reach_dataSource = new MatTableDataSource(this.reachSchools);
        this.safe_dataSource = new MatTableDataSource(this.safeSchools);
        this.setDataSourceAttributes();
      }
    });
  }

  deleteSchool(schoolId: Number) {
    var emailId = this.userService.getUserEmail();
    console.log(schoolId);
    this.schoolService
      .removeFavouriteSchool(emailId, schoolId)
      .subscribe((res) => {
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        this.getUserSchools();
      });
  }
}
