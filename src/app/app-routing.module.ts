import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AttemptHistoryComponent } from './attempt-history/attempt-history.component';
import { GrePredictorComponent } from './gre-predictor/gre-predictor.component';
import { MastersHomeComponent } from './masters-home/masters-home.component';
import { SchoolRankingComponent } from './school-ranking/school-ranking.component';
import { MySchoolsComponent } from './my-schools/my-schools.component';
import { VerbalPracticeComponent } from './verbal-practice/verbal-practice.component';
import { QuantitativePracticeComponent } from './quantitative-practice/quantitative-practice.component';
import { WhyMastersComponent } from './why-masters/why-masters.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'masters', component: MastersHomeComponent},
  { path: 'ranking', component:SchoolRankingComponent},
  { path: 'mySchools', component:MySchoolsComponent},
  { path: 'verbal', component:VerbalPracticeComponent},
  { path: 'quant', component:QuantitativePracticeComponent},
  { path: 'whyMasters', component:WhyMastersComponent},
  { path: 'aboutUs', component:AboutUsComponent},
  { path: 'terms', component:TermsAndConditionComponent},
  { path: 'stories', component:SuccessStoriesComponent},
  { path: 'home', redirectTo: '' },
  { path: 'attemptHistory', component: AttemptHistoryComponent },
  { path: '***', redirectTo: '' },
  { path: 'gre-predictor', component: GrePredictorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
