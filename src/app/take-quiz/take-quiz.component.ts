// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Question } from '../models/question';
import { QuestionManagerService } from '../services/question-manager.service';
import { QuestionConfig } from '../models/question-config';
import { UserAnswers } from '../models/user-answers';
import { Answers } from '../models/answers';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './take-quiz.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TakeQuizComponent implements OnInit {
  // Class variables that are used in the html for reactivity
  questions: Question[];
  mode = 'quiz';
  loading = true;

  // Stores the final gre score based on the answers
  quizScore = 0;

  // Stores all the user answers
  userAnswers: UserAnswers = null;

  // Setting the configuration for the Test
  config: QuestionConfig = {
    allowBack: true,
    autoMove: false, // if true, it will move to next question automatically when answered.
    duration: 0, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    showClock: false,
    showPager: true,
    theme: 'none',
  };

  // These attributes are used
  pager = {
    index: 0,
    size: 1,
    count: 1,
  };

  // Injecting services and router to the component
  constructor(
    private questionService: QuestionManagerService,
    private userService: UserService,
    private router: Router
  ) {}

  // Gets all the questions available for the test when the component is initialised
  ngOnInit(): void {
    this.loadQuestions();
  }

  // Gets the questions for the quiz using the question service
  loadQuestions() {
    this.questionService.getQuestionsForQuiz().subscribe((data: Question[]) => {
      this.questions = data;
      this.loading = false;
      this.pager.count = this.questions.length;
    });
  }

  // Used to get the next question based on the button click
  get filteredQuestions() {
    return this.questions
      ? this.questions.slice(
          this.pager.index,
          this.pager.index + this.pager.size
        )
      : [];
  }

  // Used for automatically moving to next question once user selects the option
  onSelect(question: Question) {
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1, question);
    }
  }

  // This method is used to move the user to the question based on the button click
  goTo(index: number, question: Question) {
    var flag = false;
    var confirmation = false;
    if (this.userAnswers != null) {
      for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
        if (
          this.userAnswers.questionAnswers[i].questionId == question.questionId
        ) {
          if (this.userAnswers.questionAnswers[i].answers.length == 0) {
            flag = false;
            break;
          } else {
            flag = true;
            confirmation = true;
            break;
          }
        }
      }
    }

    // Show alert if the user has not answered the current question
    if (!flag) {
      confirmation = confirm(
        'Caution: You have not answered this question.\n Do you want to continue?'
      );
    }

    if (confirmation) {
      if (index >= 0 && index < this.pager.count) {
        this.pager.index = index;
        this.mode = 'quiz';
      }
    }
  }

  //  Submits the quiz if the timer expires or if the user clicks on submit button
  onSubmit() {
    var confirmation = true;
    if (
      this.userAnswers == null ||
      this.userAnswers.questionAnswers.length < this.questions.length
    ) {
      // Show alert if some questions are unanswered
      confirmation = confirm(
        'One or more questions are unanswered. Would you still wish to submit the test?'
      );
    } else {
      // Show alert to ask for the user to confirm if the user wishes to submit the quiz
      confirmation = confirm(
        'Are you sure you want to submit the test? You can review your answers before submitting!'
      );
    }

    // If the user confirms, submit the quiz, save the answers and calculate the score
    if (confirmation) {
      this.mode = 'result';
      this.fillUnansweredQuestions();
      this.questionService
        .saveUserAnswers(this.userAnswers)
        .subscribe((data: any) => {
          this.calculateQuizScore();
          this.saveUserQuizScore(data);
        });
    }
  }

  // Method to save the gre score which is calculated to the database
  saveUserQuizScore(data: any) {
    this.questionService
      .saveUserQuizScore(this.userService.getUserEmail(), this.quizScore, data)
      .subscribe((data: any) => {});
  }

  // Method to calculate the quiz score based on the user answers
  calculateQuizScore() {
    var unitQuestionScore = 1;
    var totalScore = 0;
    var flag = true;
    for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
      var userAnswers = this.userAnswers.questionAnswers[i].answers;
      var actualAnswers = this.userAnswers.questionAnswers[i].actualAnswers;
      if (userAnswers.length != actualAnswers.length) {
        flag = false;
      } else {
        flag = true;
        for (var j = 0; j < actualAnswers.length; j++) {
          if (userAnswers.indexOf(parseInt(actualAnswers[j])) < 0) {
            flag = false;
          }
        }
      }
      if (flag) {
        totalScore += unitQuestionScore;
      }
    }
    this.quizScore = totalScore;
  }

  // Save the answer after every question selection by the user
  singleChoiceAnswer(value: number, question: Question) {
    var flag = false;
    var emailId = this.userService.getUserEmail();

    if (this.userAnswers == null) {
      this.userAnswers = new UserAnswers();
      this.userAnswers.userId = emailId;
      this.userAnswers.testType = 'Quiz';
      var questionAnswers = new Answers();
      this.userAnswers.questionAnswers = [];
      questionAnswers.questionId = question.questionId;
      questionAnswers.actualAnswers = [...question.answer];
      questionAnswers.options = [...question.options];
      questionAnswers.questionTitle = question.title;
      questionAnswers.answers = [];
      questionAnswers.answers.push(value);
      this.userAnswers.questionAnswers.push(questionAnswers);
    } else {
      for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
        if (
          this.userAnswers.questionAnswers[i].questionId == question.questionId
        ) {
          this.userAnswers.questionAnswers[i].answers = [];
          this.userAnswers.questionAnswers[i].answers.push(value);
          flag = true;
          break;
        }
      }
      if (!flag) {
        var questionAnswers = new Answers();
        questionAnswers.questionId = question.questionId;
        questionAnswers.actualAnswers = [...question.answer];
        questionAnswers.options = [...question.options];
        questionAnswers.questionTitle = question.title;
        questionAnswers.answers = [];
        questionAnswers.answers.push(value);
        this.userAnswers.questionAnswers.push(questionAnswers);
      }
    }
  }

  // This method tells the html page if the current option is checked or not for a question
  getStatus(value: number, question: Question): Boolean {
    if (this.userAnswers == null) {
      return false;
    } else {
      for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
        if (
          this.userAnswers.questionAnswers[i].questionId == question.questionId
        ) {
          if (this.userAnswers.questionAnswers[i].answers.indexOf(value) > -1) {
            return true;
          }
        }
      }
      return false;
    }
  }

  // Save the answer after every question selection by the user
  multiChoiceAnswer(value: number, question: Question, event: any) {
    var flag = false;
    var emailId = this.userService.getUserEmail();

    if (event.checked) {
      if (this.userAnswers == null) {
        this.userAnswers = new UserAnswers();
        this.userAnswers.userId = emailId;
        this.userAnswers.testType = 'Quiz';
        var questionAnswers = new Answers();
        this.userAnswers.questionAnswers = [];
        questionAnswers.questionId = question.questionId;
        questionAnswers.actualAnswers = [...question.answer];
        questionAnswers.options = [...question.options];
        questionAnswers.questionTitle = question.title;
        questionAnswers.answers = [];
        questionAnswers.answers.push(value);
        this.userAnswers.questionAnswers.push(questionAnswers);
      } else {
        for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
          if (
            this.userAnswers.questionAnswers[i].questionId ==
            question.questionId
          ) {
            this.userAnswers.questionAnswers[i].answers.push(value);
            flag = true;
            break;
          }
        }
        if (!flag) {
          var questionAnswers = new Answers();
          questionAnswers.questionId = question.questionId;
          questionAnswers.actualAnswers = [...question.answer];
          questionAnswers.options = [...question.options];
          questionAnswers.questionTitle = question.title;
          questionAnswers.answers = [];
          questionAnswers.answers.push(value);
          this.userAnswers.questionAnswers.push(questionAnswers);
        }
      }
    } else {
      for (var i = 0; i < this.userAnswers.questionAnswers.length; i++) {
        if (
          this.userAnswers.questionAnswers[i].questionId == question.questionId
        ) {
          this.userAnswers.questionAnswers[i].answers.splice(
            this.userAnswers.questionAnswers[i].answers.indexOf(value),
            1
          );
          break;
        }
      }
    }
  }

  // Quits the test and redirects to gre page
  quitTest() {
    if (
      confirm(
        'Are you sure you want to quit the test? You still have enough time left!'
      )
    ) {
      this.router.navigate(['/gre']);
    }
  }

  // Redirects to gre page when the user clicks on Back to GRE
  goToGreHome() {
    this.router.navigate(['/gre']);
  }

  // Method to fill any unanswered question and set the answer to a default value that is -1
  fillUnansweredQuestions() {
    var flag = false;
    for (var i = 0; i < this.questions.length; i++) {
      flag = false;
      for (var j = 0; j < this.userAnswers.questionAnswers.length; j++) {
        if (
          this.questions[i].questionId ==
          this.userAnswers.questionAnswers[j].questionId
        ) {
          flag = true;
        }
      }
      if (!flag) {
        var questionAnswers = new Answers();
        questionAnswers.questionId = this.questions[i].questionId;
        questionAnswers.questionTitle = this.questions[i].title;
        questionAnswers.actualAnswers = [...this.questions[i].answer];
        questionAnswers.options = [...this.questions[i].options];
        questionAnswers.answers = [];
        questionAnswers.answers.push(-1);
        this.userAnswers.questionAnswers.push(questionAnswers);
      }
    }
  }
}
