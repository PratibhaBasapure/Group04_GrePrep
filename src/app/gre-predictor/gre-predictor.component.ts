//Author- Neelesh Singh
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PredictionServiceService } from '../services/prediction-service.service';
import { UserService } from '../services/user.service';

export interface GrePredictor {
  school: string;
  possibility: string;
}

@Component({
  selector: 'app-gre-predictor',
  templateUrl: './gre-predictor.component.html',
  styleUrls: ['./gre-predictor.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class GrePredictorComponent implements OnInit {
  constructor(
    private predictionService: PredictionServiceService,
    private userService: UserService
  ) {}

  collegeList: GrePredictor[] = [];
  totalScore: any;
  displayedColumns: string[] = ['school', 'possibility'];
  dataSource: MatTableDataSource<GrePredictor>;
  // dataSource = new MatTableDataSource<GrePredictor>(this.collegeList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.getCollegeData();
  }
  /** Getting the data corresponding to the school, that is the possibility **/
  private getCollegeData() {
    this.predictionService
      .getColleges(this.userService.getUserEmail())
      .subscribe(
        (res) => {
          const dreamCollege = res['DreamColleges'].map((x) => {
            return {
              school: x,
              possibility: 'Dream',
            };
          });
          const reachCollege = res['ReachColleges'].map((x) => {
            return {
              school: x,
              possibility: 'Reach',
            };
          });
          const safeCollege = res['SafeColleges'].map((x) => {
            return {
              school: x,
              possibility: 'Safe',
            };
          });
          /** adding to the current object **/
          this.collegeList = [...dreamCollege, ...reachCollege, ...safeCollege];
          this.dataSource = new MatTableDataSource<GrePredictor>(
            this.collegeList
          );
          this.totalScore = res['Score'];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
