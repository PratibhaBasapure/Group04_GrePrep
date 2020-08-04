// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionManagerService } from '../services/question-manager.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './quiz.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class QuizComponent implements OnInit {
  // Inject services and router to the component
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionManagerService
  ) {}

  ngOnInit(): void {}

  // Method to route the user to quiz page
  next() {
    if (this.questionService.questionCount == 0) {
      alert(
        'Please select the number of questions to attempt before starting your test!'
      );
    } else {
      this.router.navigate(['takeQuiz'], { relativeTo: this.route });
    }
  }

  // Method to set the number of questions for the test
  setNumberOfQuestions(questionCount: number) {
    this.questionService.questionCount = questionCount;
  }
}
