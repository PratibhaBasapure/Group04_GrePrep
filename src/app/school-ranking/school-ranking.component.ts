// Author - Abhinav Ramesh
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolService } from '../services/school.service';
import { School } from '../models/school.model';
import { FormGroup, FormControl } from '@angular/forms';

interface schoolRanking {
  value: Number;
  viewValue: string;
}

@Component({
  selector: 'app-school-ranking',
  templateUrl: './school-ranking.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './school-ranking.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [SchoolService],
})
//Component responsible for displaying the school ranking
export class SchoolRankingComponent implements OnInit {
  dataSource: MatTableDataSource<School>;
  schoolList: School[] = new Array();
  isLoading: boolean = true;
  selectedRanking: Number;
  private paginator: MatPaginator;

  form: FormGroup;
  rankings: schoolRanking[] = [
    { value: 0, viewValue: 'Global Ranking' },
    { value: 1, viewValue: 'Computer Science Ranking' },
    { value: 2, viewValue: 'Electrical Ranking' },
    { value: 3, viewValue: 'Mechanical Ranking' },
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  rankingControl = new FormControl(this.rankings[1].value);

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(public schoolService: SchoolService) {
    this.form = new FormGroup({
      school: this.rankingControl,
    });
  }

  ngOnInit() {
    this.refreshEmployeeList();
  }

  setDataSourceAttributes() {
    if (!this.isLoading) {
      this.dataSource.paginator = this.paginator;
    }
  }

  //To fetch and display the school rankings
  refreshEmployeeList() {
    this.schoolService.getSchoolList().subscribe((res) => {
      this.schoolService.schools = res as School[];
      this.dataSource = new MatTableDataSource(this.schoolService.schools);
      this.isLoading = false;
      this.setDataSourceAttributes();
    });
  }

  //Function is executed when the value in the drop down is changed
  public onChange(event): void {
    this.selectedRanking = event.value.value;
    if (this.selectedRanking == 1) {
      this.schoolService.schools = this.schoolService.schools.sort((a, b) =>
        a.csRank < b.csRank ? -1 : 1
      );
      this.dataSource = new MatTableDataSource(this.schoolService.schools);
      this.dataSource.paginator = this.paginator;
    } else if (this.selectedRanking == 2) {
      this.schoolService.schools = this.schoolService.schools.sort((a, b) =>
        a.eceRank < b.eceRank ? -1 : 1
      );
      this.dataSource = new MatTableDataSource(this.schoolService.schools);
      this.dataSource.paginator = this.paginator;
    } else if (this.selectedRanking == 3) {
      this.schoolService.schools = this.schoolService.schools.sort((a, b) =>
        a.mechRank < b.mechRank ? -1 : 1
      );
      this.dataSource = new MatTableDataSource(this.schoolService.schools);
      this.dataSource.paginator = this.paginator;
    } else {
      this.schoolService.schools = this.schoolService.schools.sort((a, b) =>
        a.globalRank < b.globalRank ? -1 : 1
      );
      this.dataSource = new MatTableDataSource(this.schoolService.schools);
      this.dataSource.paginator = this.paginator;
    }
  }
}
