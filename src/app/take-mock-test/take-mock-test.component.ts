import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Question } from '../question';
import { QuestionManagerService } from '../question-manager.service';
import { QuestionConfig } from '../question-config';
import { UserAnswers } from '../user-answers';
import { Answers } from '../answers';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-take-mock-test',
  templateUrl: './take-mock-test.component.html',
  styleUrls: ['./take-mock-test.component.css'],
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
    duration: 4500, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
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

  constructor(private questionService: QuestionManagerService, private userService: UserService) {}

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
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
  onSubmit() {
    this.mode = 'result';
    console.log(this.questions);
    this.questionService
      .saveUserAnswers(this.userAnswers)
      .subscribe((data: boolean) => {
        if (data) {
          this.calculateGreScore();
        }
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
    console.log(this.userAnswers);
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
}
