// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionManagerService } from '../services/question-manager.service';

@Component({
  selector: 'app-verbal-practice',
  templateUrl: './verbal-practice.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './verbal-practice.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VerbalPracticeComponent implements OnInit {
  // Inject router and services to the component
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionManagerService
  ) {}

  ngOnInit(): void {}

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
      this.router.navigate(['takeVerbalPracticeTest'], {
        relativeTo: this.route,
      });
    }
  }

  // Method to set the number of questions for the verbal practice test
  setNumberOfQuestions(questionCount: number) {
    this.questionService.questionCount = questionCount;
  }

  // Method to set the verbal questions type
  setQuestionType(questionType: string) {
    this.questionService.questionType = questionType;
  }
}
