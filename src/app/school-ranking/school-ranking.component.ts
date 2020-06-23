import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SchoolRankingDataSource, SchoolRankingItem } from './school-ranking-datasource';

@Component({
  selector: 'app-school-ranking',
  templateUrl: './school-ranking.component.html',
  styleUrls: ['./school-ranking.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SchoolRankingComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SchoolRankingItem>;
  dataSource: SchoolRankingDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new SchoolRankingDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
