import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Question } from '../models/question';
import { QuestionManagerService } from '../services/question-manager.service';
import { QuestionConfig } from '../models/question-config';
import { UserAnswers } from '../models/user-answers';
import { Answers } from '../models/answers';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-mock-test',
  templateUrl: './take-mock-test.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './take-mock-test.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TakeMockTestComponent implements OnInit {
  questions: Question[];
  mode = 'quiz';
  loading = true;
  greScore = 0;
  userAnswers: UserAnswers = null;
  config: QuestionConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false, // if true, it will move to next question automatically when answered.
    duration: 7200, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    requiredAll: false, // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: 'none',
  };

  pager = {
    index: 0,
    size: 1,
    count: 1,
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(
    private questionService: QuestionManagerService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }
  loadQuestions() {
    this.questionService.getQuestions().subscribe((data: Question[]) => {
      this.questions = data;
      this.loading = false;
      this.pager.count = this.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return this.questions
      ? this.questions.slice(
          this.pager.index,
          this.pager.index + this.pager.size
        )
      : [];
  }

  onSelect(question: Question) {
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1, question);
    }
  }

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
  onSubmit() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    var confirmation = true;
    if (diff < this.config.duration) {
      if (
        this.userAnswers == null ||
        this.userAnswers.questionAnswers.length < this.questions.length
      ) {
        confirmation = confirm(
          'One or more questions are unanswered. Would you still wish to submit the test?'
        );
      } else {
        confirmation = confirm(
          'Are you sure you want to submit the test? You can review your answers before submitting!'
        );
      }
    }
    if (confirmation) {
      this.mode = 'result';
      this.questionService
        .saveUserAnswers(this.userAnswers)
        .subscribe((data: boolean) => {
          if (data) {
            this.calculateGreScore();
            this.saveUserGreScore();
          }
        });
    }
  }

  saveUserGreScore() {
    this.questionService
      .saveUserGreScore(this.userService.getUserEmail(), this.greScore)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  calculateGreScore() {
    var unitQuestionScore = (340 * 1.0) / this.questions.length;
    var totalScore = 0;
    var answers = this.userAnswers.questionAnswers;
    var questions = this.questions;
    for (var i = 0; i < answers.length; i++) {
      for (var j = 0; j < questions.length; j++) {
        if (answers[i].questionId == questions[i].questionId) {
          var numberAnswers = questions[i].answer.map(function (item) {
            return parseInt(item, 10);
          });
          if (
            numberAnswers.sort().join(',') ===
            answers[i].answers.sort().join(',')
          ) {
            totalScore += unitQuestionScore;
          } else {
            totalScore += 0;
          }
          break;
        }
      }
    }
    this.greScore = totalScore;
  }

  singleChoiceAnswer(value: number, question: Question) {
    var flag = false;
    var emailId = this.userService.getUserEmail();
    console.log(emailId);

    if (this.userAnswers == null) {
      this.userAnswers = new UserAnswers();
      this.userAnswers.userId = emailId;
      this.userAnswers.testType = 'MT';
      var questionAnswers = new Answers();
      this.userAnswers.questionAnswers = [];
      questionAnswers.questionId = question.questionId;
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
        questionAnswers.answers = [];
        questionAnswers.answers.push(value);
        this.userAnswers.questionAnswers.push(questionAnswers);
      }
    }
  }
  getStatus(value: Number, question: Question): Boolean {
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

  multiChoiceAnswer(value: number, question: Question, event: any) {
    var flag = false;
    var emailId = this.userService.getUserEmail();
    console.log(emailId);

    if (event.checked) {
      if (this.userAnswers == null) {
        this.userAnswers = new UserAnswers();
        this.userAnswers.userId = emailId;
        this.userAnswers.testType = 'MT';
        var questionAnswers = new Answers();
        this.userAnswers.questionAnswers = [];
        questionAnswers.questionId = question.questionId;
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

  quitTest() {
    if (
      confirm(
        'Are you sure you want to quit the test? You still have enough time left!'
      )
    ) {
      this.router.navigate(['/gre']);
    }
  }

  goToGreHome() {
    this.router.navigate(['/gre']);
  }
}
