// Author - Padmesh Donthu
import { Component, OnInit } from '@angular/core';
import { QuestionManagerService } from '../services/question-manager.service';
import { UserAnswers } from '../models/user-answers';
import { Answers } from '../models/answers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './view-answers.component.css',
  ],
})
export class ViewAnswersComponent implements OnInit {
  // Inject router and services in the component
  constructor(
    private questionService: QuestionManagerService,
    private router: Router
  ) {}

  userAnswer: UserAnswers;
  loading: boolean = true;

  // Get the list of answers for a particular test for a user
  ngOnInit(): void {
    this.questionService.getAnswers().subscribe((data: UserAnswers) => {
      this.userAnswer = data;
      this.loading = false;
    });
  }

  // Check if the user has checked a particular option or not
  getStatus(value: number, answer: Answers): boolean {
    for (var i = 0; i < answer.answers.length; i++) {
      if (value == answer.answers[i]) {
        return true;
      }
    }
    return false;
  }

  // Method to navigate the user back to the attempt history page
  goToAttemptHistory() {
    this.router.navigate(['/attemptHistory']);
  }

  // Method to get the test type for a test
  getTestType(): string {
    switch (this.userAnswer.testType) {
      case 'MT':
        return 'Mock Test';
      case 'Quiz':
        return 'Quiz';
      case 'QC':
        return 'Quantitative Comparison';
      case 'QMCQ':
        return 'Quantitative - Multiple Choice One Answer';
      case 'QSMQ':
        return 'Quantitative - Multiple Choice One or More Answers';
      case 'VTCQ':
        return 'Verbal - Text Completion';
      case 'VSEQ':
        return 'Verbal - Sentence Equivalence';
      default:
        return 'Test';
    }
  }

  // Method to get the correct answer for each question
  getCorrectAnswer(answer: Answers): string {
    var correctAnswer = '';
    for (var i = 0; i < answer.actualAnswers.length; i++) {
      correctAnswer =
        correctAnswer + answer.options[answer.actualAnswers[i]] + ' ';
    }
    return correctAnswer;
  }

  // Method to check if the user has answered correctly or not
  checkIfUserAnsweredCorrectly(answer: Answers): boolean {
    if (answer.answers.length != answer.actualAnswers.length) {
      return false;
    }
    for (var i = 0; i < answer.actualAnswers.length; i++) {
      if (answer.answers.indexOf(parseInt(answer.actualAnswers[i])) < 0) {
        return false;
      }
    }
    return true;
  }

  // Method to move to bottom of the screen
  moveDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // Method to move to top of the screen
  moveUp() {
    window.scrollTo(0, 0);
  }
}
