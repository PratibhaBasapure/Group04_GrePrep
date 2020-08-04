// Authors - Padmesh Donthu, Pratibha Basapure, Abhinav Ramesh
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AttemptHistoryComponent } from './attempt-history/attempt-history.component';
import { GrePredictorComponent } from './gre-predictor/gre-predictor.component';
import { GreComponent } from './gre/gre.component';
import { MastersHomeComponent } from './masters-home/masters-home.component';
import { SchoolRankingComponent } from './school-ranking/school-ranking.component';
import { MySchoolsComponent } from './my-schools/my-schools.component';
import { VerbalPracticeComponent } from './verbal-practice/verbal-practice.component';
import { QuantitativePracticeComponent } from './quantitative-practice/quantitative-practice.component';
import { WhyMastersComponent } from './why-masters/why-masters.component';
import { AboutUSComponent } from '../app/static-pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from '../app/static-pages/terms-and-conditions/terms-and-conditions.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { QuizComponent } from './quiz/quiz.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { MockTestComponent } from './mock-test/mock-test.component';
import { TakeMockTestComponent } from './take-mock-test/take-mock-test.component';
import { ListOfSchoolsComponent } from './list-of-schools/list-of-schools.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TakeVerbalTestComponent } from './take-verbal-test/take-verbal-test.component';
import { TakeQuantTestComponent } from './take-quant-test/take-quant-test.component';
import { ViewAnswersComponent } from './view-answers/view-answers.component';
import { ContactUsComponent } from './static-pages/contact-us/contact-us.component';
import { PrivacyPoliciesComponent } from './static-pages/privacy-policies/privacy-policies.component';
import { FAQsComponent } from './static-pages/faqs/faqs.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'forgotPassward',
    component: ForgotPasswordComponent,
  },
  { path: 'masters', component: MastersHomeComponent },
  { path: 'masters/ranking', component: SchoolRankingComponent },
  {
    path: 'profile/mySchools',
    component: MySchoolsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/verbal',
    component: VerbalPracticeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/verbal/takeVerbalPracticeTest',
    component: TakeVerbalTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/quant',
    component: QuantitativePracticeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/quant/takeQuantPracticeTest',
    component: TakeQuantTestComponent,
    canActivate: [AuthGuard],
  },
  { path: 'masters/whyMasters', component: WhyMastersComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'masters/stories', component: SuccessStoriesComponent },
  {
    path: 'attemptHistory',
    component: AttemptHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attemptHistory/viewAnswers',
    component: ViewAnswersComponent,
    canActivate: [AuthGuard],
  },
  { path: '***', redirectTo: '' },
  {
    path: 'gre-predictor',
    component: GrePredictorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'gre', component: GreComponent, canActivate: [AuthGuard] },
  { path: 'gre/quiz', component: QuizComponent, canActivate: [AuthGuard] },
  {
    path: 'gre/quiz/takeQuiz',
    component: TakeQuizComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/mocktest',
    component: MockTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gre/mocktest/takeMockTest',
    component: TakeMockTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'masters/listOfSchools',
    component: ListOfSchoolsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/profileSettings',
    component: ProfileSettingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUSComponent },
  { path: 'privacyPolicies', component: PrivacyPoliciesComponent },
  { path: 'faqs', component: FAQsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
