import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Schools {
  name: string;
  id: number;
}

const DREAM_SCHOOLS: Schools[] = [
  {id: 1, name: 'Massachusetts Institute of Technology'},
  {id: 2, name: 'Stanford University'},
  {id: 3, name: 'University of California--Berkeley'},
  {id: 4, name: 'Carnegie Mellon University'},
  {id: 5, name: 'California Institute of Technology'},
];

const REACH_SCHOOLS: Schools[] = [
  {id: 1, name: 'University of Oxford'},
  {id: 2, name: 'University of Cambridge'},
  {id: 3, name: 'Harvard University'},
  {id: 4, name: '	ETH Zurich'},
  {id: 5, name: 'University of Toronto'}
];

const SAFE_SCHOOLS: Schools[] = [
  {id: 1, name: 'National University of Singapore (NUS)'},
  {id: 2, name: 'Tsinghua University'},
  {id: 3, name: 'Imperial College London'},
  {id: 4, name: 'University of California, Los Angeles (UCLA)'},
  {id: 5, name: 'Nanyang Technological University, Singapore (NTU)'},
];


@Component({
  selector: 'app-my-schools',
  templateUrl: './my-schools.component.html',
  styleUrls: ['./my-schools.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MySchoolsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dream_dataSource: MatTableDataSource<Schools>;
  reach_dataSource: MatTableDataSource<Schools>;
  safe_dataSource: MatTableDataSource<Schools>;
  
  constructor(){
    this.dream_dataSource = new MatTableDataSource(DREAM_SCHOOLS);
    this.reach_dataSource = new MatTableDataSource(REACH_SCHOOLS);
    this.safe_dataSource = new MatTableDataSource(SAFE_SCHOOLS);
  }
  
  @ViewChild('paginatorDream', {static: true}) paginatorDream: MatPaginator;
  @ViewChild('paginatorReach', {static: true}) paginatorReach: MatPaginator;
  @ViewChild('paginatorSafe', {static: true}) paginatorSafe: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dream_dataSource.paginator = this.paginatorDream;
    this.dream_dataSource.sort = this.sort;
    this.reach_dataSource.paginator = this.paginatorReach;
    this.reach_dataSource.sort = this.sort;
    this.safe_dataSource.paginator = this.paginatorSafe;
    this.safe_dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dream_dataSource.filter = filterValue.trim().toLowerCase();
    this.reach_dataSource.filter = filterValue.trim().toLowerCase();
    this.safe_dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dream_dataSource.paginator) {
      this.dream_dataSource.paginator.firstPage();
    }
    if (this.reach_dataSource.paginator) {
      this.reach_dataSource.paginator.firstPage();
    }
    if (this.reach_dataSource.paginator) {
      this.safe_dataSource.paginator.firstPage();
    }
  }
}
