// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';

// // TODO: Replace this with your own data model type
// export interface SchoolRankingItem {
//   name: string;
//   id: number;
// }

// // TODO: replace this with real data from your application
// const SCHOOL_DATA: SchoolRankingItem[] = [
//   {id: 1, name: 'Massachusetts Institute of Technology'},
//   {id: 2, name: 'Stanford University'},
//   {id: 3, name: 'University of California--Berkeley'},
//   {id: 4, name: 'Carnegie Mellon University'},
//   {id: 5, name: 'California Institute of Technology'},
//   {id: 6, name: 'University of Oxford'},
//   {id: 7, name: 'University of Cambridge'},
//   {id: 8, name: 'Harvard University'},
//   {id: 9, name: '	ETH Zurich'},
//   {id: 10, name: 'University of Toronto'},
//   {id: 11, name: 'Princeton University'},
//   {id: 12, name: 'National University of Singapore (NUS)'},
//   {id: 13, name: 'Tsinghua University'},
//   {id: 14, name: 'Imperial College London'},
//   {id: 15, name: 'University of California, Los Angeles (UCLA)'},
//   {id: 16, name: 'Nanyang Technological University, Singapore (NTU)'},
//   {id: 17, name: 'University College London'},
//   {id: 18, name: 'University of Washington'},
//   {id: 19, name: 'Columbia University'},
//   {id: 20, name: 'Cornell University'},
// ];

// /**
//  * Data source for the SchoolRanking view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
// export class SchoolRankingDataSource extends DataSource<SchoolRankingItem> {
//   data: SchoolRankingItem[] = SCHOOL_DATA;
//   paginator: MatPaginator;
//   sort: MatSort;

//   constructor() {
//     super();
//   }

//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<SchoolRankingItem[]> {
//     // Combine everything that affects the rendered data into one update
//     // stream for the data-table to consume.
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];

//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect() {}

//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: SchoolRankingItem[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: SchoolRankingItem[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'name': return compare(a.name, b.name, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
