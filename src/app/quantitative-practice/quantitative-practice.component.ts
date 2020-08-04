// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionManagerService } from '../services/question-manager.service';

@Component({
  selector: 'app-quantitative-practice',
  templateUrl: './quantitative-practice.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './quantitative-practice.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class QuantitativePracticeComponent implements OnInit {
  ngOnInit(): void {}

  // Inject services and router to the component
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionManagerService
  ) {}

  // Method to route the user to quantitative test page
  next() {
    if (
      this.questionService.questionCount == 0 ||
      this.questionService.questionType == ''
    ) {
      alert(
        'Please select all the options available before starting your test!'
      );
    } else {
      this.router.navigate(['takeQuantPracticeTest'], {
        relativeTo: this.route,
      });
    }
  }

  // Method to set the number of questions for the test
  setNumberOfQuestions(questionCount: number) {
    this.questionService.questionCount = questionCount;
  }

  // Method to set the test type in quantitative practice
  setQuestionType(questionType: string) {
    this.questionService.questionType = questionType;
  }
}
