// Author - Padmesh Donthu
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { QuestionManagerService } from '../services/question-manager.service';
import { UserService } from '../services/user.service';
import { Test } from '../models/test';
import { Attempt } from '../models/attempt';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attempt-history',
  templateUrl: './attempt-history.component.html',
  styleUrls: ['./attempt-history.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AttemptHistoryComponent implements OnInit {
  constructor(
    private questionService: QuestionManagerService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Variable to set the list of columns to be displayed in the table
  displayedColumns: string[] = ['test', 'score', 'dateTaken', 'action'];

  // Variable that stores the data to be shown in the table
  dataSource: MatTableDataSource<Attempt>;
  attemptList: Attempt[];
  loading: boolean = true;

  // Variables to set the paginator and sorting for the table
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  // Method to set the attributes like paging, sorting for the table
  setDataSourceAttributes() {
    if (!this.loading) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.loadAttemptHistory();
  }

  // Method to load the attempt histories for the user
  loadAttemptHistory() {
    this.questionService
      .getAttemptHistory(this.userService.getUserEmail())
      .subscribe((data: Test) => {
        this.fillAttempts(data);
      });
  }

  // Method to apply filter on the datasource when user types something in the search box
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Method to store all the attempts to the datasource which requires a Attempt Array
  fillAttempts(data: Test) {
    this.attemptList = [];
    if (data != null) {
      for (var i = 0; i < data.mockTests.length; i++) {
        var attempt = new Attempt();
        attempt.score = data.mockTests[i].score;
        attempt.testId = data.mockTests[i].mockTestId;
        attempt.dateTaken = data.mockTests[i].createdDate;
        attempt.test = 'Mock Test';
        this.attemptList.push(attempt);
      }
      for (var i = 0; i < data.verbalTests.length; i++) {
        var attempt = new Attempt();
        attempt.score = data.verbalTests[i].score;
        attempt.testId = data.verbalTests[i].verbalTestId;
        attempt.dateTaken = data.verbalTests[i].createdDate;
        attempt.test = 'Verbal Test';
        this.attemptList.push(attempt);
      }
      for (var i = 0; i < data.quantTests.length; i++) {
        var attempt = new Attempt();
        attempt.score = data.quantTests[i].score;
        attempt.testId = data.quantTests[i].quantTestId;
        attempt.dateTaken = data.quantTests[i].createdDate;
        attempt.test = 'Quantitative Test';
        this.attemptList.push(attempt);
      }
      for (var i = 0; i < data.quizTests.length; i++) {
        var attempt = new Attempt();
        attempt.score = data.quizTests[i].score;
        attempt.testId = data.quizTests[i].quizTestId;
        attempt.dateTaken = data.quizTests[i].createdDate;
        attempt.test = 'Quiz';
        this.attemptList.push(attempt);
      }
    }
    this.loading = false;
    this.dataSource = new MatTableDataSource(this.attemptList);
    this.setDataSourceAttributes();
  }

  // Method to navigate the user to to a new page which displays the list of questions and answers
  // attempted by the user
  viewAnswers(testId: string) {
    this.questionService.answerId = testId;
    this.router.navigate(['viewAnswers'], { relativeTo: this.route });
  }
}
