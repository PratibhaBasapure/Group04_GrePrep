import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PredictionServiceService } from './prediction-service.service';
import { UserService } from '../services/user.service';

export interface GrePredictor {
  country: string;
  school: string;
  specialization: string;
  possibility: string;
}

const ELEMENT_DATA: GrePredictor[] = [
  {
    country: 'USA',
    school: 'Northeastern University',
    specialization: 'Masters in Data Science',
    possibility: 'Dream',
  },
  {
    country: 'USA',
    school: 'Northeastern University',
    specialization: 'Masters in Computer Science',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'Northeastern University',
    specialization: 'Masters in Data Analytics',
    possibility: 'Safe',
  },
  {
    country: 'USA',
    school: 'Northeastern University',
    specialization: 'Masters in Data Science',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'Northeastern University',
    specialization: 'Masters in Data Science',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'Arizona State University',
    specialization: 'Masters in Computer Science',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'Arizona State University',
    specialization: 'Masters in Electrical and Computer Engineering',
    possibility: 'Safe',
  },
  {
    country: 'USA',
    school: 'University of South Carolina',
    specialization: 'Masters in Computer Science',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'University of South Florida',
    specialization: 'Master of Science in Computer Engineering',
    possibility: 'Dream',
  },
  {
    country: 'Singapore',
    school: 'National University of Singapore',
    specialization: 'Master in Computing',
    possibility: 'Dream',
  },
  {
    country: 'Canada',
    school: 'University of Ontario Institute of Technology',
    specialization: 'Master of Information Technology Security (MITS) ',
    possibility: 'Reach',
  },
  {
    country: 'USA',
    school: 'San Jose State University',
    specialization: 'Master of Science in Aerospace Engineering',
    possibility: 'Safe',
  },
];

@Component({
  selector: 'app-gre-predictor',
  templateUrl: './gre-predictor.component.html',
  styleUrls: ['./gre-predictor.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GrePredictorComponent implements OnInit {
  constructor(
    private predictionService: PredictionServiceService,
    private userService: UserService
  ) { }

  collegeList: GrePredictor[] = [];
  displayedColumns: string[] = [
    'school',
    'possibility'
  ];
  dataSource: MatTableDataSource<GrePredictor>;
  // dataSource = new MatTableDataSource<GrePredictor>(this.collegeList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.getCollegeData();

  }

  private getCollegeData() {
    this.predictionService.getColleges(this.userService.getUserEmail).subscribe(
      (res) => {
        console.log(res);
        const dreamCollege = res['DreamColleges'].map((x) => {
          return {
            school: x,
            possibility: 'Dream'
          };
        });
        const reachCollege = res['ReachColleges'].map((x) => {
          return {
            school: x,
            possibility: 'Reach'
          };
        });
        const safeCollege = res['SafeColleges'].map((x) => {
          return {
            school: x,
            possibility: 'Safe'
          };
        });

        this.collegeList = [...dreamCollege, ...reachCollege, ...safeCollege];
        this.dataSource = new MatTableDataSource<GrePredictor>(this.collegeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
