import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface Attempt {
  test: string;
  score: number;
  dateTaken: string;
}

const ELEMENT_DATA: Attempt[] = [
  { test: 'Quiz 1', score: 95, dateTaken: 'June 01, 2020' },
  { test: 'Quiz 2', score: 98, dateTaken: 'June 02, 2020' },
  { test: 'Quiz 3', score: 92, dateTaken: 'June 04, 2020' },
  { test: 'Algebra 1', score: 65, dateTaken: 'June 05, 2020' },
  { test: 'Verbal 1', score: 75, dateTaken: 'June 05, 2020' },
  { test: 'Algebra 2', score: 88, dateTaken: 'June 05, 2020' },
  { test: 'Quantitative 1', score: 91, dateTaken: 'June 06, 2020' },
  { test: 'Reading Comprehension 1', score: 36, dateTaken: 'June 06, 2020' },
  { test: 'Mock Test 1', score: 75, dateTaken: 'June 07, 2020' },
  { test: 'Mock Test 2', score: 85, dateTaken: 'June 07, 2020' },
  { test: 'Quantitative 2 1', score: 90, dateTaken: 'June 07, 2020' },
  { test: 'Quiz 4', score: 77, dateTaken: 'June 07, 2020' },
];

@Component({
  selector: 'app-attempt-history',
  templateUrl: './attempt-history.component.html',
  styleUrls: ['./attempt-history.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AttemptHistoryComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = ['test', 'score', 'dateTaken', 'action'];
  dataSource = new MatTableDataSource<Attempt>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
